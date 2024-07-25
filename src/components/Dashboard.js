// Discussion.jsx
import React, { useState, useEffect } from 'react';

const Discussion = ({ examId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/discussions/${examId}`)
      .then(response => response.json())
      .then(data => setComments(data));
  }, [examId]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    fetch(`http://localhost:5000/discussions/${examId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newComment }),
    })
    .then(response => response.json())
    .then(data => {
      setComments([...comments, data]);
      setNewComment('');
    });
  };

  return (
    <div>
      <h2>Discussion</h2>
      <div>
        {comments.map((comment, index) => (
          <p key={index}>{comment.text}</p>
        ))}
      </div>
      <textarea value={newComment} onChange={handleCommentChange} />
      <button onClick={handleCommentSubmit}>Post Comment</button>
    </div>
  );
};

export default Discussion;
