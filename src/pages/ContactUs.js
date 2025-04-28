import React, { useState } from 'react';
import './ContactUs.css';
import Navbar from './Navbar/Navbar';
import { sendEmail } from '../Client/ApiService';
import Swal from 'sweetalert2'

const ContactUs = () => {
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState(""); 
  const [message, setMessage] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [name, setName] = useState(""); 

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setPhone(value);
    }
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value); 
  };
  const handleMessageChange = (e) => {
    setMessage(e.target.value); 
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }
  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleSendEmail = async (e) => {
    e.preventDefault(); 
    try {
      const json = {
        subject: subject || "No Subject", 
        body: "Name: " + name || '' + ", Phone: " + phone || '' + ", Email: " + email || '' + ", Message: " + message || '',
        toRecepients: ["csaxena@bajajext.co.in","smate1@bajajauto.co.in"], 
      }
      const result = await sendEmail(json);
      if(result.status == 200){
        Swal.fire({
          title: "Success",
          text: result.message,
          icon: "success"
        });
        setPhone('');
        setSubject('');
        setMessage(null);
        setEmail(null);
        setName(null);
      }
      console.log('response', result)

    } catch (error) {
      console.error('Error sending email:', error);
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

          <form className="contact-form" onSubmit={handleSendEmail}>
            <div className="input-group">
              <label>Name</label>
              <input type="text" 
                onChange={handleNameChange}
                placeholder="Your Name" required />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input type="email" 
                onChange={handleEmailChange} placeholder="Your Email" required />
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
              <label>Subject</label>
              <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={handleSubjectChange}
                maxLength={50}
                required
              />
            </div>

            <div className="input-group">
              <label>Message</label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                onChange={handleMessageChange}
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
