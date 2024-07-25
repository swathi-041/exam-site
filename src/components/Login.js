// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    axios.post('http://localhost:5000/auth/login', { username, password })
      .then(response => {
        // Handle successful login (e.g., redirect or save token)
        alert(response.data.message);
      })
      .catch(error => {
        // Handle login error
        alert('Invalid credentials');
      });
  };

  return (
    <div>
      <h1>Login</h1>
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
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
