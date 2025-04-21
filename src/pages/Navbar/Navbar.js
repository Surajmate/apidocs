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
            {/* <nav className="navbar">
        <div className="logo">
            <img src="/assets/logo.png" alt="Bajaj Logo" className="logo-img"  onClick={() => handleLogoClick()}/>
        </div>
        <div className="nav-links">
            <span onClick={() => navigate("/")}>Home</span>
            <span onClick={() => navigate("/explore")}>Explore APIs</span>
            <span onClick={() => navigate("/contact")}>Contact Us</span>
            <span onClick={() => navigate("/login")}>Login</span>
        </div>
        </nav> */}
        {/* <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>API Details: {api.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>Request</h3>
          <h6 className="green-color pt-2 pb-2">Header Parameters</h6>
          <div className="row header-parameter">
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12 ">
              {api?.request?.header.map((header, index) => (
                <p className="mb-1" key={index}>{header.key}</p>
              ))}
            </div>
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12 ">
              {api?.request?.header.map((header, index) => (
                <p className="mb-1 property-type" key={index}>{typeof header.value}</p>
              ))}
            </div>
          </div>

          <h6 className="green-color mt-3">Body</h6>
          {api?.request?.body && <ExpandComponent obj={JSON.parse(api?.request?.body?.raw || '{}')} />}
          
          <h6 className="green-color mt-3">Response</h6>
          {sampleresponse.body && <ExpandComponent obj={JSON.parse(sampleresponse.body || '{}')} />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false); */}
        <nav className="navbar">
        <div className="logo">
          <img src="/assets/logo.png" alt="BikeAPI Logo" className="logo-img" onClick={() => handleLogoClick()}/>
        </div>
        <div className="nav-links">
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