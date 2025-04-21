import React, { useState } from 'react';
import Navbar from './Navbar';  
import './FaqPage.css';

const faqData = [
  {
    question: "What is an API and how does it work?",
    answer: "An API (Application Programming Interface) allows applications to communicate with each other. It exposes endpoints that developers can use to send or retrieve data."
  },
  {
    question: "How do I get an API key?",
    answer: "You can sign up or log in to your account on the developer portal and generate an API key from the dashboard."
  },
  {
    question: "Is there a rate limit for API usage?",
    answer: "Yes, our API allows up to 1000 requests per hour on the free plan. Higher limits are available on premium plans."
  },
  {
    question: "How do I authenticate my API requests?",
    answer: "Include your API key in the request header as 'Authorization: Bearer YOUR_API_KEY'."
  },
  {
    question: "What formats does the API support?",
    answer: "Our API returns responses in JSON format by default."
  },
  {
    question: "Can I use the API in a commercial project?",
    answer: "Yes, but you need to subscribe to a commercial or enterprise plan depending on your usage."
  },
  {
    question: "How do I handle errors from the API?",
    answer: "The API returns appropriate HTTP status codes (like 400, 401, 404, 500) with descriptive error messages."
  },
  {
    question: "Is there documentation for each endpoint?",
    answer: "Yes, each API endpoint is fully documented in the API reference section with example requests and responses."
  },
  {
    question: "Can I request a new feature or endpoint?",
    answer: "Absolutely! You can send feature requests through the support form or email us directly."
  },
  {
    question: "How do I contact support?",
    answer: "Use the 'Contact Us' page on the portal or email support@yourapi.com. Our team is available 24/7."
  }
];

const FaqPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div style={{ backgroundColor: "white", minHeight: "100vh" }}>
      <Navbar />

      <div className="faq-page">
        <div className="faq-image">
          <img src="/assets/FAQ1.jpg" alt="FAQ Banner" />
        </div>

        <h1 className="faq-title">Frequently Asked Questions</h1>

        <div className="faq-list">
          {faqData.map((item, index) => (
            <div key={index} className="faq-item">
              <div className="faq-question" onClick={() => toggle(index)}>
                {item.question}
                <span className="faq-toggle">{activeIndex === index ? '-' : '+'}</span>
              </div>
              {activeIndex === index && <div className="faq-answer">{item.answer}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
