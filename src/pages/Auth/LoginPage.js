import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import Navbar from "../Navbar/Navbar";

const LoginPage = () => {


  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/signup');
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
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" placeholder="Enter your email" />
                  </div>
    
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Enter your password" />
                  </div>
    
                  <button type="submit" className="login-button">
                    Sign In
                  </button>
    
                  <div className="signup-prompt">
                    Don’t have an account?{" "}
                    <button onClick={handleClick} className="signup-link">
                      Sign Up
                    </button>
                  </div>
                </form>
              
            </div>
          </div>
    </>

    
  );
}

export default LoginPage;