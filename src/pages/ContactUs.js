import React, { useState } from 'react';
import './ContactUs.css';
import Navbar from './Navbar/Navbar';

const ContactUs = () => {
  const [phone, setPhone] = useState("");

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setPhone(value);
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url(/assets/4-contact.png)",
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div style={{ minHeight: "100vh" }}>
        <Navbar />

        <div className="contact-page">
          <h1 className="headProp">GET IN TOUCH</h1>

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
              <input
                type="tel"
                placeholder="Your Phone Number"
                value={phone}
                onChange={handlePhoneChange}
                pattern="\d{10}"
                title="Phone number must be exactly 10 digits"
                required
              />
            </div>

            <div className="input-group">
              <label>Message</label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
