import React, { useState } from "react";
import Header from "../components/Header";
import "./SignUP.css";

const Signup = ({ setIsSignUP, setUser }) => {
  const [formData, setFormData] = useState({
    rollNo: "",
    name: "",
    class: "",
    section: "",
    dob: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newUser = await response.json();
        console.log("Signup successful:", newUser);
        setUser(newUser);
        setIsSignUP(false); // Go to SignIn or next screen after signup
        setFormData({
          rollNo: "",
          name: "",
          class: "",
          section: "",
          dob: "",
        });
      } else {
        console.error("Signup failed");
        alert("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred. Please check your server or connection.");
    }
  };

  return (
    <div>
      <Header />
      <div className="form-container">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="rollno">
              Roll No:
              <input
                type="text"
                id="rollno"
                name="rollNo"
                value={formData.rollNo}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div>
            <label htmlFor="name">
              Name:
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div>
            <label htmlFor="class">
              Class:
              <input
                type="text"
                id="class"
                name="class"
                value={formData.class}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div>
            <label htmlFor="section">
              Section:
              <input
                type="text"
                id="section"
                name="section"
                value={formData.section}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div>
            <label htmlFor="dob">
              Date of Birth (DOB):
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
