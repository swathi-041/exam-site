const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const Papa = require('papaparse');
const authRouter = require('./auth');
const discussionRouter = require('./discussion'); // Import discussion routes

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.static('csv'));

// Use the authentication and discussion routes
app.use('/auth', authRouter);
app.use('/discussions', discussionRouter);

// Your existing routes (upload, get exams, etc.)
app.post('/upload-exam', (req, res) => {
  // Implementation from previous code
});

app.get('/exams', (req, res) => {
  // Implementation from previous code
});

app.get('/exam-questions/:title', (req, res) => {
  // Implementation from previous code
});

app.post('/evaluate-exam', (req, res) => {
  // Implementation from previous code
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
