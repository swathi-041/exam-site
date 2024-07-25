// src/components/UploadExam.js
import React, { useState } from 'react';

function UploadExam() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({ question: '', a: '', b: '', c: '', d: '', correct: '' });
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleAddQuestion = () => {
    if (newQuestion.question && newQuestion.a && newQuestion.b && newQuestion.c && newQuestion.d && newQuestion.correct) {
      setQuestions([...questions, newQuestion]);
      setNewQuestion({ question: '', a: '', b: '', c: '', d: '', correct: '' });
    } else {
      alert('Please fill in all fields for the question.');
    }
  };

  const handleUploadExam = () => {
    const examData = questions.map(q => ({
      question: q.question,
      a: q.a,
      b: q.b,
      c: q.c,
      d: q.d,
      correct: q.correct
    }));

    // Exam metadata
    const examMetadata = {
      title,
      description,
      date: new Date().toISOString().split('T')[0],
      questions: examData
    };

    // Send data to backend
    fetch('http://localhost:5000/upload-exam', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(examMetadata)
    })
    .then(response => response.text())
    .then(message => {
      console.log(message);
      setUploadStatus('Exam uploaded successfully');
      // Optionally reset form or give user feedback
      setTitle('');
      setDescription('');
      setQuestions([]);
    })
    .catch(error => {
      console.error('Error uploading exam:', error);
      setUploadStatus('Failed to upload exam');
    });
  };

  return (
    <div>
      <h1>Upload Exam</h1>
      {uploadStatus && <p>{uploadStatus}</p>}
      <form onSubmit={(e) => { e.preventDefault(); handleUploadExam(); }}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <h2>Add Questions</h2>
          <div>
            <label>Question:</label>
            <input type="text" value={newQuestion.question} onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })} required />
          </div>
          <div>
            <label>Option A:</label>
            <input type="text" value={newQuestion.a} onChange={(e) => setNewQuestion({ ...newQuestion, a: e.target.value })} required />
          </div>
          <div>
            <label>Option B:</label>
            <input type="text" value={newQuestion.b} onChange={(e) => setNewQuestion({ ...newQuestion, b: e.target.value })} required />
          </div>
          <div>
            <label>Option C:</label>
            <input type="text" value={newQuestion.c} onChange={(e) => setNewQuestion({ ...newQuestion, c: e.target.value })} required />
          </div>
          <div>
            <label>Option D:</label>
            <input type="text" value={newQuestion.d} onChange={(e) => setNewQuestion({ ...newQuestion, d: e.target.value })} required />
          </div>
          <div>
            <label>Correct Option:</label>
            <input type="text" value={newQuestion.correct} onChange={(e) => setNewQuestion({ ...newQuestion, correct: e.target.value })} required />
          </div>
          <button type="button" onClick={handleAddQuestion}>Add Question</button>
        </div>
        <button type="submit">Upload Exam</button>
      </form>
    </div>
  );
}

export default UploadExam;
