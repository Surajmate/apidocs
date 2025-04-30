import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import Navbar from "../Navbar/Navbar";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Login submitted:", { email, password });
      
    }
  };

  return (
    <>
      <div style={{ width: "100%" }}>
        <Navbar />
      </div>
      <div
        className="login-container"
        style={{
          objectFit: "cover",
          background:
            "url(https://wallpaperaccess.com/full/2127653.jpg) no-repeat center center/cover",
          height: "calc(100vh - 60px)",
        }}
      >
        <div className="screen">
          <img src="/assets/logo.png" alt="App Logo" className="login-logo" />
          <div className="screen__content">
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <p className="error">{errors.password}</p>}
              </div>

              <button type="submit" className="login-button">
                Sign In
              </button>

              <div className="signup-prompt">
                Don’t have an account?{" "}
                <button
                  onClick={() => navigate("/signup")}
                  className="signup-link"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;



