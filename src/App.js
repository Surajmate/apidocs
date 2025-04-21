import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ContactUs from './pages/ContactUs'; 
import FaqPage from './pages/FaqPage';
import ApiDescription from './pages/ApiDescription';
import './pages/App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/explore" element={<ApiDescription />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/contact" element={<ContactUs />} /> 
      </Routes>
    </Router>
  );
};

export default App;
