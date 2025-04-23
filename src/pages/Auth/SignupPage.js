import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import Navbar from '../Navbar/Navbar';

const SignupPage = () => {


  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/login');
  };
  return (
    <>
    <Navbar />
          
          <div 
            className="login-container"
            style={{
              background: 'url(https://wallpaperaccess.com/full/2127653.jpg) no-repeat center center/cover',
              height: 'calc(100vh - 60px)'
            }}
          >
            <div className="login-box">
              <img 
                src="/assets/logo.png" 
                alt="App Logo" 
                className="login-logo" 
              />
    
              
    <form className="login-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" placeholder="Enter your full name" />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" placeholder="Enter your email" />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" placeholder="Enter your phone number" />
              </div>

              <button type="submit" className="login-button">
                Sign Up
              </button>

              <div className="signup-prompt">
                Already have an account?{" "}
                <button onClick={handleClick} className="signup-link">
                  Sign In
                </button>
              </div>
            </form>

              
            </div>
          </div>
    </>

    
  );
}

export default SignupPage;