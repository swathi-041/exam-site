// discussion.js
const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');
const router = express.Router();

const DISCUSSIONS_CSV = 'csv/discussions.csv';

const readDiscussions = () => {
  return new Promise((resolve, reject) => {
    const discussions = [];
    fs.createReadStream(DISCUSSIONS_CSV)
      .pipe(csv())
      .on('data', (row) => discussions.push(row))
      .on('end', () => resolve(discussions))
      .on('error', reject);
  });
};

router.post('/add', async (req, res) => {
  const { examTitle, username, message } = req.body;
  const discussions = await readDiscussions();
  
  discussions.push({ examTitle, username, message });
  const updatedDiscussionsCsv = Papa.unparse(discussions);
  fs.writeFileSync(DISCUSSIONS_CSV, updatedDiscussionsCsv);

  res.status(201).json({ message: 'Discussion added successfully' });
});

router.get('/:examTitle', async (req, res) => {
  const { examTitle } = req.params;
  const discussions = await readDiscussions();
  
  const examDiscussions = discussions.filter(discussion => discussion.examTitle === examTitle);
  res.json(examDiscussions);
});

module.exports = router;
