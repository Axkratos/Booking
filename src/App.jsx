import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './login';
import Success from './success';
import EducationForm from './education';
import TeacherDashboard from './teacher';
import StudentDashboard from './student';
import Location from './location.jsx'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/success" element={<Success />} />
        <Route path="/education" element={<EducationForm />}/>
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/location" element={<Location />} />
      </Routes>
    </Router>
  );
};

export default App;


