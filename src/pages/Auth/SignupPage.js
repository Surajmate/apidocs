import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import Navbar from "../Navbar/Navbar";








// const submit = () => {
//   console.log("Form submitted with email:", email, "and password:", password);
// }

const SignupPage = () => {

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };
  const navigate = useNavigate();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [name, setName] = useState("");
  // const [number, setNumber] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <>
      <Navbar />
      <div className="login-container"
        style={{ background: "url(https://wallpaperaccess.com/full/2127653.jpg) no-repeat center center/cover", height: "calc(100vh - 60px)" }}>
        <div className="login-box">
          <img src="/assets/logo.png" alt="App Logo" className="login-logo" />

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
              <input
                type="tel"
                id="phone"
                placeholder="Enter your phone number"
              />
            </div>

            {/* <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Enter your password"/>
              </div>

              <div className="form-group">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input type="password" id="confirm-password" placeholder="Confirm your password"/>
              </div> */}

<div className="form-group">
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <input
          style={{ height: '15px', width: '15px', margin: '5px' }}
          type="checkbox"
          id="terms"
          onChange={handleCheckboxChange}
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
          backgroundColor: isChecked ? '#007bff' : '#007bff43',
          cursor: isChecked ? 'pointer' : 'not-allowed',
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
