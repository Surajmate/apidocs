import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './LandingPage.css';

const LandingPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

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
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bikeImages.length);
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  const isHomePage = location.pathname === "/";

  return (
    <div style={{ backgroundColor: "white", minHeight: "100vh" }}>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <img src="/assets/logo.png" alt="BikeAPI Logo" className="logo-img" />
        </div>
        <div className="nav-links">
          {!isHomePage && <span onClick={() => navigate("/")}>Home</span>}
          <span onClick={() => navigate("/explore")}>Explore APIs</span>
          <span onClick={() => navigate("/contact")}>Contact Us</span>
          <span className="nav-login" onClick={() => setShowModal(true)}>Login</span>
        </div>
      </nav>

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

      {/* Login/Signup Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close-btn" onClick={() => setShowModal(false)}>&times;</span>
            <h2>{isSignup ? "Create Account" : "Login"}</h2>
            <form className="modal-form">
              {isSignup && <input type="text" placeholder="Name" required />}
              <input type="email" placeholder="Email" required />
              <input type="password" placeholder="Password" required />
              {isSignup && <input type="password" placeholder="Confirm Password" required />}
              <button type="submit" className="submit-btn">{isSignup ? "Sign Up" : "Login"}</button>
            </form>
            <p className="toggle-text">
              {isSignup ? "Already have an account?" : "Don't have an account?"}
              <span onClick={() => setIsSignup(!isSignup)}>
                {isSignup ? " Login" : " Sign Up"}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
