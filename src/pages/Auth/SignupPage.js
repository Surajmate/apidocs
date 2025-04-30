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

  const [formErrors, setFormErrors] = useState({});
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

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Full name is required.";
    }

    if (!formData.email) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format.";
    }

    if (!formData.phone) {
      errors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = "Phone number must be 10 digits.";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm() && isChecked) {
      const fullPhone = `+91${formData.phone}`;
      console.log("Form submitted:", {
        ...formData,
        phone: fullPhone,
      });

   
    }
  };

  return (
    <>
      <div style={{ width: "100%" }}>
        <Navbar />
      </div>
      <div
        className="login-container"
        style={{objectFit:"cover" ,
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
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {formErrors.name && (
                  <small className="error-text">{formErrors.name}</small>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {formErrors.email && (
                  <small className="error-text">{formErrors.email}</small>
                )}
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
                  />
                </div>
                {formErrors.phone && (
                  <small className="error-text">{formErrors.phone}</small>
                )}
              </div>

              <div className="form-group">
                <span style={{ display: "flex", alignItems: "center" }}>
                  <input
                    style={{ height: "15px", width: "15px", margin: "5px" }}
                    type="checkbox"
                    id="terms"
                    onChange={handleCheckboxChange}
                  />
                  <p style={{ margin: 0 ,fontSize:"12px" }}>
                    I agree to the terms and conditions & privacy policy
                  </p>
                </span>
              </div>

              <button
                type="submit"
                className="login-button"
                disabled={!isChecked}
                style={{
                  backgroundColor: isChecked ? "#007bff" : "#007bff43",
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
      </div>
    </>
  );
};

export default SignupPage;
