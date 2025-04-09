import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import apis from './Mulesoft.postman_collection.json';
import ApiDetails from "./pages/ApiDetails";
import ApiListDetails from "./pages/ApiListDetails";
import apiData from './apiData';
import './App.css';
function App() {
  useEffect(() => {
    let data = apis.item.map((item) => {
      item.id = crypto.randomUUID();
      return item;
    });
    if (!localStorage.getItem("apiData")) {
      localStorage.setItem("apiData", JSON.stringify(data));
    }
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/api-details" element={<ApiDetails apiData={apiData} />} />
        <Route path="/api-list/:id" element={<ApiListDetails />} />

      </Routes>
    </Router>
  );
}

export default App;
