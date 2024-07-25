// src/components/Discussions.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Discussions() {
  const [examTitle, setExamTitle] = useState('');
  const [discussions, setDiscussions] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (examTitle) {
      axios.get(`http://localhost:5000/discussions/${examTitle}`)
        .then(response => setDiscussions(response.data))
        .catch(error => console.error(error));
    }
  }, [examTitle]);

  const handleSubmit = () => {
    axios.post('http://localhost:5000/discussions/add', {
      examTitle,
      username: 'username', // Replace with actual username from user state
      message
    })
    .then(() => {
      setMessage('');
      // Optionally refresh discussions
    })
    .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Discussions</h1>
      <input 
        type="text" 
        placeholder="Enter exam title" 
        value={examTitle} 
        onChange={(e) => setExamTitle(e.target.value)} 
      />
      <ul>
        {discussions.map((discussion, index) => (
          <li key={index}>
            <p><strong>{discussion.username}:</strong> {discussion.message}</p>
          </li>
        ))}
      </ul>
      <textarea 
        placeholder="Add a comment" 
        value={message} 
        onChange={(e) => setMessage(e.target.value)} 
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Discussions;
