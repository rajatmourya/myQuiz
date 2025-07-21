import React, { useState } from "react";
import Header from "../components/Header";
import "./SignIn.css";

const SignIn = ({ setUser, setIsSignIn }) => {
  const [formData, setFormData] = useState({
    rollNo: "",
    dob: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value.trim(),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const user = await response.json();
        console.log("Sign-in successful:", user);
        setUser(user);
        setIsSignIn(true);
      } else {
        alert("❌ Invalid Roll No or Date of Birth");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      alert("⚠️ Error connecting to the server.");
    }
  };

  return (
    <div>
      <Header />
      <div className="signin-container">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="rollNo">Roll No:</label>
          <input
            type="text"
            id="rollNo"
            name="rollNo"
            value={formData.rollNo}
            onChange={handleChange}
            required
          />

          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />

          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
