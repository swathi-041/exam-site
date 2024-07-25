import React, { useState, useEffect } from 'react';

function TakeExam({ examTitle, onExamComplete }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/exam-questions/${examTitle}`)
      .then(response => response.json())
      .then(data => setQuestions(data));
  }, [examTitle]);

  const handleChange = (index, answer) => {
    setAnswers(prev => ({ ...prev, [index]: answer }));
  };

  const handleSubmit = () => {
    fetch('http://localhost:5000/evaluate-exam', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ examTitle, answers })
    })
    .then(response => response.json())
    .then(data => setResult(data));
  };

  if (result) {
    return (
      <div>
        <h1>Exam Result</h1>
        <p>Score: {result.score}/{result.totalQuestions}</p>
        <p>Percentage: {result.percentage.toFixed(2)}%</p>
        <button onClick={() => onExamComplete()}>Back to Exams</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Take Exam: {examTitle}</h1>
      {questions.map((question, index) => (
        <div key={index}>
          <h3>{question.question}</h3>
          {['a', 'b', 'c', 'd'].map(option => (
            <label key={option}>
              <input
                type="radio"
                name={`question-${index}`}
                value={option}
                onChange={() => handleChange(index, option)}
              />
              {question[option]}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit Exam</button>
    </div>
  );
}

export default TakeExam;
