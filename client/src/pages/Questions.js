import React, { useEffect, useState } from "react";
import Header from "../components/Header.js";
import "./Question.css";
import Sidebar from "./Sidebar";
import StudentResult from "./Result/StudentResult";

function Questions({ user }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answered, setAnswered] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      setCurrentQuestion(questions[currentIndex]);
      const answeredQuestion = userAnswers[currentIndex];
      setSelectedOption(answeredQuestion?.selectedOption ?? null);
    }
  }, [currentIndex, questions, userAnswers]);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:8000/questions");
      const data = await res.json();
      setQuestions(data);
      setAnswered(new Array(data.length).fill(false));
    } catch (err) {
      console.error("Error fetching questions:", err);
    }
  };

  const handleOptionChange = (index) => {
    setSelectedOption(index);
  };

  const next = () => {
    if (selectedOption !== null) {
      updateUserAnswer(currentIndex, selectedOption);
    }

    setCurrentIndex((prev) =>
      prev < questions.length - 1 ? prev + 1 : 0
    );
  };

  const previous = () => {
    setCurrentIndex((prev) =>
      prev > 0 ? prev - 1 : questions.length - 1
    );
  };

  const updateUserAnswer = (index, selectedOption) => {
    const updatedAnswered = [...answered];
    updatedAnswered[index] = true;
    setAnswered(updatedAnswered);

    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[index] = {
      questionId: questions[index]?.id,
      selectedOption,
    };
    setUserAnswers(updatedUserAnswers);
  };

  const handleSubmit = async () => {
    if (selectedOption !== null) {
      updateUserAnswer(currentIndex, selectedOption);
    }

    // Optional: Ensure all questions are answered
    if (userAnswers.length < questions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }

    setIsLoading(true);

    const formattedDate = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const submissionData = {
      userId: user.id,
      date: formattedDate,
      answers: userAnswers,
    };

    try {
      const response = await fetch("http://localhost:8000/userAnswers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        console.log("✅ Answers submitted successfully");
        setShowResult(true);
      } else {
        const errorText = await response.text();
        console.error("❌ Failed to submit answers:", errorText);
        alert("Error submitting answers. Check backend logs.");
      }
    } catch (error) {
      console.error("❌ Network error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (showResult) {
    return <StudentResult user={user} />;
  }

  if (!currentQuestion) {
    return <div>Loading questions...</div>;
  }

  return (
    <div>
      <Header user={user} />
      <div className="grid-container">
        <div className="div1">
          <h3>
            Question no. {currentIndex + 1}: {currentQuestion.question}
          </h3>

          {currentQuestion.options.map((option, index) => (
            <div key={index}>
              <label>
                <input
                  type="radio"
                  name="option"
                  value={index}
                  checked={selectedOption === index}
                  onChange={() => handleOptionChange(index)}
                />
                {option}
              </label>
            </div>
          ))}

          <div className="btn">
            <button className="pbtn" onClick={previous} disabled={isLoading}>
              <b>Previous</b>
            </button>
            <button className="nbtn" onClick={next} disabled={isLoading}>
              <b>Next</b>
            </button>
          </div>
        </div>

        <div className="div2">
          <Sidebar
            count={questions.length}
            setCurrentIndex={setCurrentIndex}
            answered={answered}
          />
          <button className="nbtn" onClick={handleSubmit} disabled={isLoading}>
            <b>{isLoading ? "Submitting..." : "Submit"}</b>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Questions;
