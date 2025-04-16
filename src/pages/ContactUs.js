import React from 'react';
import './ContactUs.css';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

const ContactUs = () => {
  return (
    <div className="contact-page">
      <h1>Contact Us</h1>

      <form className="contact-form">
        <div className="input-group">
          <label>Name</label>
          <input type="text" placeholder="Your Name" required />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input type="email" placeholder="Your Email" required />
        </div>

        <div className="input-group">
          <label>Phone</label>
          <input type="tel" placeholder="Your Phone Number" required />
        </div>

        <div className="input-group">
          <label>Message</label>
          <textarea rows="4" placeholder="Write your message..." required></textarea>
        </div>

        <button type="submit" className="submit-btn">Submit</button>
      </form>

      {/* Social Icons */}
      <div className="social-icons">
        <a href="https://www.facebook.com/BajajAutoLtdWFI/" target="_blank" rel="noopener noreferrer">
          <FaFacebook />
        </a>
        <a href="https://www.instagram.com/bajaj_auto_ltd/?igshid=9mdtd6dprx16" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
        <a href="https://www.linkedin.com/company/bajaj-auto-ltd/?originalSubdomain=in" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a>
      </div>

      {/* Placeholder for About Us */}
      <div className="about-us-section">
        <h2>About Us</h2>
        <p> {/* You'll send the content here. I'll insert it once you give it. */} </p>
      </div>
    </div>
  );
};

export default ContactUs;
