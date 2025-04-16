import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './LandingPage.css';

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
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bikeImages.length);
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  const scrollToContact = () => {
    const section = document.getElementById("contact");
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ backgroundColor: "white", minHeight: "100vh" }}>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <img src="/assets/logo.png" alt="BikeAPI Logo" className="logo-img" />
        </div>
        <div className="nav-links">
          <span>Home</span>
          <span onClick={() => navigate("/explore")}>Explore APIs</span>
          <span>Sandbox</span>
          <span onClick={scrollToContact}>Contact Us</span>
          <span className="auth-links">
            <button className="auth-btn">Sign In</button>
            <button className="auth-btn">Sign Up</button>
          </span>
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

      {/* Contact Us Section */}
      <div id="contact" className="contact-section">
        <h2>Contact Us</h2>

        <div className="contact-container">
          {/* Reach Us */}
          <div className="contact-box">
            <h3>📞 Reach Us</h3>
            <p>
              📱 <a href="tel:+917219821111" className="contact-link">+91 7219821111</a>
              <span className="small-text"> (9 AM to 8 PM)</span>
            </p>
            <p>
              ✉️ <a href="mailto:customerservice@bajajauto.co.in" className="contact-link">
                customerservice@bajajauto.co.in
              </a>
            </p>
          </div>

          {/* Follow Us */}
          <div className="contact-box">
            <h3>🔗 Follow Us</h3>
            <div className="social-icons">
              <a href="https://www.facebook.com/BajajAutoLtdWFI/" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaFacebook />
              </a>
              <a href="https://www.instagram.com/bajaj_auto_ltd/?igshid=9mdtd6dprx16" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaInstagram />
              </a>
              <a href="https://www.linkedin.com/company/bajaj-auto-ltd/?originalSubdomain=in" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
