import React, { useEffect, useState } from "react";
import "./StudentResult.css"; // Optional for styling
import Header from "../../components/Header"; // ✅ Fixed import path

function StudentResult({ user }) {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [result, setResult] = useState([]);
  const [score, setScore] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    fetchResult();
  }, []);

  const fetchResult = async () => {
    try {
      const questionsRes = await fetch("http://localhost:8000/questions");
      const questionsData = await questionsRes.json();
      setQuestions(questionsData);

      const answersRes = await fetch("http://localhost:8000/userAnswers");
      const answersData = await answersRes.json();

      const latestSubmission = answersData
        .filter((a) => a.userId === user.id)
        .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

      if (!latestSubmission) {
        console.log("No submission found for user");
        return;
      }

      const resultList = [];
      let total = 0;
      let correct = 0;

      latestSubmission.answers.forEach((answer) => {
        if (answer === null) return;

        const question = questionsData.find((q) => q.id === answer.questionId);
        const isCorrect = question && answer.selectedOption === question.correctOption;

        if (question) {
          total += question.points;
          if (isCorrect) {
            correct += question.points;
          }

          resultList.push({
            id: question.id,
            question: question.question,
            options: question.options,
            correctOption: question.correctOption,
            selectedOption: answer.selectedOption,
            isCorrect,
            points: question.points,
          });
        }
      });

      setScore(correct);
      setTotalPoints(total);
      setResult(resultList);
    } catch (error) {
      console.log("Error fetching result:", error);
    }
  };

  return (
    <div>
      <Header user={user} />
      <div className="result-container">
        <h2>Quiz Result</h2>
        <h4>
          Total Score: {score} / {totalPoints} (
          {totalPoints > 0 ? ((score / totalPoints) * 100).toFixed(2) : 0}%)
        </h4>

        <div className="question-list">
          {result.map((q, idx) => (
            <div key={idx} className={`question-box ${q.isCorrect ? "correct" : "wrong"}`}>
              <h4>
                Q{q.id}. {q.question}
              </h4>
              <ul>
                {q.options.map((opt, i) => (
                  <li
                    key={i}
                    className={
                      i === q.correctOption
                        ? "correct-option"
                        : i === q.selectedOption
                        ? "selected-option"
                        : ""
                    }
                  >
                    {i === q.correctOption && "✅ "}
                    {i === q.selectedOption && i !== q.correctOption && "❌ "}
                    {opt}
                  </li>
                ))}
              </ul>
              <p>
                <b>Status:</b>{" "}
                {q.isCorrect ? (
                  <span style={{ color: "green" }}>Correct ✅</span>
                ) : (
                  <span style={{ color: "red" }}>Wrong ❌</span>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudentResult;
