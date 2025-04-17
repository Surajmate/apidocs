import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import Navbar from './Navbar';

const LandingPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const navigate = useNavigate();

  const bikeImages = [
    "/assets/Avenger.webp",
    "/assets/00-Pulsar.webp",
    "/assets/03.webp",
    "/assets/bike-card.webp",
    "/assets/ns400z-bike.png",
    "/assets/TV_Blue.webp"
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bikeImages?.length);
    }, 2000);
    return () => clearInterval(intervalId);
  }, [bikeImages?.length]);

  return (
    <div style={{ backgroundColor: "white", minHeight: "100vh" }}>
      
      <Navbar />

      {/* Image Slider */}
      <div className="image-slider">
        <img src={bikeImages[currentImageIndex]} alt="Bike" className="slider-img" />
      </div>

      {/* CTA Button */}
      <div className="image-slider">
        <button className="btn btn-outline-light" onClick={() => navigate("/explore")}>
          View API Catalogue
        </button>
      </div>

      
    </div>
  );
};

export default LandingPage;
