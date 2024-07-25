// auth.js
const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const router = express.Router();

const USERS_CSV = 'csv/users.csv';

const readUsers = () => {
  return new Promise((resolve, reject) => {
    const users = [];
    fs.createReadStream(USERS_CSV)
      .pipe(csv())
      .on('data', (row) => users.push(row))
      .on('end', () => resolve(users))
      .on('error', reject);
  });
};

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const users = await readUsers();
  
  if (users.find(user => user.username === username)) {
    return res.status(400).json({ message: 'User already exists' });
  }

  fs.appendFileSync(USERS_CSV, `${username},${password}\n`);
  res.status(201).json({ message: 'User registered successfully' });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const users = await readUsers();

  const user = users.find(user => user.username === username && user.password === password);
  
  if (user) {
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
