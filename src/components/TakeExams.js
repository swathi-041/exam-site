import React, { useState, useEffect } from 'react';
import TakeExam from './TakeExam';

function TakeExams() {
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/exams')
      .then(response => response.json())
      .then(files => setExams(files.map(file => file.replace('.csv', ''))));
  }, []);

  const handleTakeExam = (examTitle) => {
    setSelectedExam(examTitle);
  };

  if (selectedExam) {
    return <TakeExam examTitle={selectedExam} onExamComplete={() => setSelectedExam(null)} />;
  }

  return (
    <div>
      <h1>Available Exams</h1>
      <ul>
        {exams.map((exam, index) => (
          <li key={index}>
            <h2>{exam}</h2>
            <button onClick={() => handleTakeExam(exam)}>Take Exam</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TakeExams;
