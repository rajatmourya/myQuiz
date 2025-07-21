const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 8000;

// ========== MIDDLEWARE ==========
app.use(cors());
app.use(bodyParser.json());

// ========== MYSQL CONNECTION ==========
const db = mysql.createConnection({
  host: "localhost",
  user: "root",         // Your MySQL username
  password: "admin",    // Your MySQL password
  database: "mock_test" // Your MySQL database
});

db.connect((err) => {
  if (err) throw err;
  console.log("✅ MySQL connected...");
});

// ========== ROUTES ==========

// GET: All Questions
app.get("/questions", (req, res) => {
  const query = "SELECT * FROM questions";
  db.query(query, (err, result) => {
    if (err) {
      console.error("❌ Error fetching questions:", err);
      return res.status(500).send("Server Error");
    }
    res.json(result);
  });
});

// POST: Submit User Answers
app.post("/userAnswers", (req, res) => {
  const { userId, date, answers } = req.body;

  const query = `
    INSERT INTO user_answers (userId, date, answers)
    VALUES (?, ?, ?)
  `;
  db.query(query, [userId, date, JSON.stringify(answers)], (err, result) => {
    if (err) {
      console.error("❌ Error saving answers:", err);
      return res.status(500).send("Server Error");
    }
    res.send({ message: "✅ Answers submitted successfully" });
  });
});

// POST: User Sign-In
app.post("/login", (req, res) => {
  const { rollNo, dob } = req.body;
  const query = "SELECT * FROM users WHERE rollNo = ? AND dob = ?";
  
  db.query(query, [rollNo, dob], (err, result) => {
    if (err) {
      console.error("❌ Login error:", err);
      return res.status(500).send("Server Error");
    }
    if (result.length > 0) {
      res.json(result[0]); // Return the user
    } else {
      res.status(404).send({ message: "❌ User not found" });
    }
  });
});

// POST: User Sign-Up (Registration)
app.post("/users", (req, res) => {
  const { rollNo, name, class: userClass, section, dob } = req.body;

  if (!rollNo || !name || !userClass || !dob) {
    return res.status(400).send("⚠️ Please provide all required fields.");
  }

  const query = `
    INSERT INTO users (rollNo, name, class, section, dob)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [rollNo, name, userClass, section, dob], (err, result) => {
    if (err) {
      console.error("❌ Error saving user:", err);
      return res.status(500).send("Server Error");
    }
    res.status(201).json({
      message: "✅ User registered successfully",
      userId: result.insertId,
    });
  });
});

// ========== START SERVER ==========
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
