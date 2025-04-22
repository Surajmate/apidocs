import React, { useState } from 'react';
import './Navbar.css';
import { useNavigate, useLocation } from 'react-router-dom';
// import { Modal, Button } from 'react-bootstrap';

const Navbar = () => {
    const [isSignup, setIsSignup] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [showModal, setShowModal] = useState(false);

    const isHomePage = location.pathname === "/";

    const handleLogoClick = () => {
        navigate("/");
    };

  return (
        <>
        <nav className="navbar">
        <div className="logo">
          <img src="/assets/logo.png" alt="BikeAPI Logo" className="logo-img" onClick={() => handleLogoClick()}/>
        </div>
        <div className="nav-links f15">
          {!isHomePage && <span onClick={() => navigate("/")}>HOME</span>}
          <span onClick={() => navigate("/explore")}>EXPLORE APIS</span>
          {/* <span onClick={() => navigate("/contact")}>CONTACT US</span> */}
          <span onClick={() => navigate("/faq")}>FAQ</span>
          {/* <span className="nav-login" onClick={() => setShowModal(true)}>LOGIN</span> */}
        </div>
      </nav>

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
        </>
    );
};

export default Navbar;