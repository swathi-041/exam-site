// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    axios.post('http://localhost:5000/auth/register', { username, password })
      .then(response => {
        // Handle successful registration (e.g., redirect to login)
        alert(response.data.message);
      })
      .catch(error => {
        // Handle registration error
        alert('Error registering user');
      });
  };

  return (
    <div>
      <h1>Register</h1>
      <input 
        type="text" 
        placeholder="Username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
