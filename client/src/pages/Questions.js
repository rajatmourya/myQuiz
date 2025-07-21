import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "./Question.css";
import Sidebar from "./Sidebar";

function Questions({ user }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answered, setAnswered] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Loading state for submission

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      setCurrentQuestion(questions[currentIndex]);
      setSelectedOption(null); // Reset selected option when switching questions
    }
  }, [currentIndex, questions]);

  // Handler to go to the next question
  const next = () => {
    if (selectedOption !== null) {
      const updatedAnswered = [...answered];
      updatedAnswered[currentIndex] = true; // Mark current question as answered
      setAnswered(updatedAnswered);

      // Update the user answers
      const updatedUserAnswers = [...userAnswers];
      updatedUserAnswers[currentIndex] = {
        questionId: currentQuestion?.id,
        selectedOption: selectedOption,
      };
      setUserAnswers(updatedUserAnswers);
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back to first question if at the last question
    }
  };

  // Handler to go to the previous question
  const previous = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(questions.length - 1); // Loop back to last question if at the first question
    }
  };

  // Fetch data function
  async function fetchData() {
    try {
      const res = await fetch("http://localhost:8000/questions");
      const data = await res.json();
      setQuestions(data); // Access the questions array
      setAnswered(new Array(data.length).fill(false)); // Initialize answered array
    } catch (err) {
      console.log(err); // Handle errors
    }
  }

  // Handler to update selected option
  const handleOptionChange = (index) => {
    setSelectedOption(index); // Update selected option
  };

  // Handler for submitting answers
  const handleSubmit = async () => {
    console.log(user,user.id);
    setIsLoading(true); // Set loading state to true
    const submissionData = {
      userId: user.id, // Assuming user object has an 'id' property
      date: new Date().toISOString(), // Current date in ISO format
      answers: userAnswers, // User answers
    };

    try {
      const response = await fetch("http://localhost:8000/userAnswers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData), // Send user answers to the backend
      });

      if (response.ok) {
        console.log("Answers submitted successfully");
        // Reset selection and user answers if needed
        setUserAnswers([]); 
        setAnswered(new Array(questions.length).fill(false));
        setCurrentIndex(0); // Reset to first question
      } else {
        console.log("Failed to submit answers");
      }
    } catch (error) {
      console.log("Error submitting answers:", error);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  // Render loading message if questions data is not yet loaded
  if (!currentQuestion) {
    return <div>Loading questions...</div>;
  }

  return (
    <div>
      <Header user={user} />
      <div className="grid-container">
        <div className="div1">
          <h3></h3>
          <h3>
            Question no.{currentQuestion?.id}: {currentQuestion?.question}
          </h3>

          {/* Display options */}
          {currentQuestion?.options?.map((option, index) => (
            <div key={index}>
              <label>
                <input
                  type="radio"
                  name="option"
                  value={index}
                  checked={selectedOption === index} // Check if the option is selected
                  onChange={() => handleOptionChange(index)} // Handle option change
                />
                {option}
              </label>
            </div>
          ))}

          <div className="btn">
            <button 
            className="pbtn" 
            onClick={previous} 
            disabled={isLoading}>
              <b>Previous</b>
            </button>
            <button 
            className="nbtn" 
            onClick={next} 
            disabled={isLoading}>
              <b>Next</b>
            </button>
          </div>
        </div>
        <div className="div2">
          <div>
            <Sidebar
              count={questions.length}
              setCurrentIndex={setCurrentIndex}
              answered={answered} // Pass answered state to Sidebar
            />
            <button className="nbtn" onClick={handleSubmit} disabled={isLoading}>
              <b>{isLoading ? "Submitting..." : "Submit"}</b>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Questions;
