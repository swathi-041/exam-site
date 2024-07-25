import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import Discussions from './components/Discussions';
import TakeExams from './components/TakeExams';
import UploadExam from './components/UploadExam';
import Navigate from './components/Navigate';

function App() {
  return (
    <Router>
      <div>
        <Navigate />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/discussions" element={<Discussions />} />
          <Route path="/take-exams" element={<TakeExams />} />
          <Route path="/upload-exam" element={<UploadExam />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
