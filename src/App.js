import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import Discussions from './components/Discussion';
import TakeExams from './components/TakeExams';
import UploadExam from './components/UploadExam';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/discussions" element={<Discussions />} />
        <Route path="/take-exams" element={<TakeExams />} />
        <Route path="/upload-exam" element={<UploadExam />} />
      </Routes>
    </Router>
  );
}

export default App;
