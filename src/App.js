import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ApiDescription from './pages/ApiDescription';
import './pages/App.css';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/api/:apiId" element={<ApiDescription />} /> */}
        <Route path="/explore" element={<ApiDescription />} />
      </Routes>
    </Router>
  );
};

export default App;
