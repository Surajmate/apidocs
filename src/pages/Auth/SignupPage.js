import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"; 
import Navbar from "../Navbar/Navbar";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isChecked) {
      const fullPhone = `+91${formData.phone}`;
      console.log("Form submitted:", {
        ...formData,
        phone: fullPhone,
      });
    
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="login-container"
        style={{
          background:
            "url(https://wallpaperaccess.com/full/2127653.jpg) no-repeat center center/cover",
          height: "calc(100vh - 60px)",
        }}
      >
        <div className="login-box">
          <img src="/assets/logo.png" alt="App Logo" className="login-logo" />

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                title="Enter a valid email address"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ paddingRight: "5px" }}>+91</span>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Enter 10-digit number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  pattern="\d{10}"
                  title="Phone number must be exactly 10 digits"
                />
              </div>
            </div>

            <div className="form-group">
              <span style={{ display: "flex", alignItems: "center" }}>
                <input
                  style={{ height: "15px", width: "15px", margin: "5px" }}
                  type="checkbox"
                  id="terms"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  required
                />
                <p style={{ margin: 0 }}>
                  I agree to the terms and conditions & privacy policy
                </p>
              </span>
            </div>

            <button
              type="submit"
              className="login-button"
              disabled={!isChecked}
              style={{
                backgroundColor: isChecked ? "#3aa7f6" : "#3aa7f663",
                cursor: isChecked ? "pointer" : "not-allowed",
              }}
            >
              Sign Up
            </button>

            <div className="signup-prompt">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="signup-link"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
