import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  // const [apiList, setApiList] = useState([]);
  // const [groupedByCategory, setGroupedByCategory] = useState({});
  // const [expandedCategory, setExpandedCategory] = useState(null);
  // const [viewAll, setViewAll] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const bikeImages = [
    "/assets/Avenger.webp",
    "/assets/Pulsar BIke 2.webp",
    "/assets/Pulsar Bike.webp",
    "/assets/bikespage-p_n_160.webp"
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bikeImages.length);
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{ backgroundColor: "black", height: "100vh" }}>
      <nav className="navbar">
        <div className="logo">
          <img src="/assets/logo.png" alt="BikeAPI Logo" className="logo-img" />
        </div>
        <div className="nav-links">
          <span>Home</span>
          <span onClick={() => navigate("/explore")}>Explore APIs</span>
          <span>Sandbox</span>
          <span className="auth-links">
            <button className="auth-btn">Sign In</button>
            <button className="auth-btn">Sign Up</button>
          </span>
        </div>
      </nav>

      <div className="image-slider">
        <img src={bikeImages[currentImageIndex]} alt="Bike" className="slider-img" />
      </div>

      <div className="image-slider">
        <button className="btn btn-outline-light" onClick={() => navigate("/explore")}>View API Catalogue</button>
      </div>

    </div>
  );
};

export default LandingPage;
