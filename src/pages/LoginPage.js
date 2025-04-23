import React, { useState } from "react";
import "./LoginPage.css";
import Navbar from './Navbar/Navbar';

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false); 

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <>
      <Navbar />

      <div className="login-container">
        <div className="login-box">
          <img 
            src="/assets/logo.png" 
            alt="App Logo" 
            className="login-logo" 
          />

        
          {isSignUp ? (
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
                <button onClick={toggleForm} className="signup-link">
                  Sign In
                </button>
              </div>
            </form>
          ) : (
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
                <button onClick={toggleForm} className="signup-link">
                  Sign Up
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginPage;
