import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ContactUs from './pages/ContactUs'; 
import ApiDescription from './pages/ApiDescription';
import './pages/App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/explore" element={<ApiDescription />} />
        <Route path="/contact" element={<ContactUs />} /> 
      </Routes>
    </Router>
  );
};

export default App;
