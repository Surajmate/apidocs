import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import "./landingpage.css"
import Navbar from "../Navbar/Navbar";
import Cards from "../card/Cards";
import favouriteIndianLogo from "../../data/favourite-indian.png";

const LandingPage = () => {
  // const navigate = useNavigate();

  const images = [
    {
      initial: "https://pngimg.com/uploads/car_wheel/car_wheel_PNG23301.png",
      hover:
        "https://truckcdn.cardekho.com/in/bajaj/compact-4s/bajaj-compact-4s-48935.jpg?impolicy=resize&imwidth=480",
      text: "3 WHEELERS ",
    },
    {
      initial: "https://pngimg.com/uploads/car_wheel/car_wheel_PNG23301.png",
      hover:
        "https://cdn.bikedekho.com/processedimages/bajaj/bajaj-pulsar-200-ns/source/bajaj-pulsar-200-ns65df4e8f1a6e0.jpg",
      text: "MOTORCYCLES",
    },
    {
      initial: "https://pngimg.com/uploads/car_wheel/car_wheel_PNG23301.png",
      hover: "https://truckcdn.cardekho.com/in/bajaj/qute/bajaj-qute-29389.jpg",
      text: "QUTE",
    },
    {
      initial: "https://pngimg.com/uploads/car_wheel/car_wheel_PNG23301.png",
      hover:
        "https://cdn.bikedekho.com/processedimages/source/66da7273c6ef6.jpg",
      text: "CHETAK",
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Preload hover images
  useEffect(() => {
    const interval = setInterval(() => {
      // setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change every 3 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      <Navbar />
      <div className="container-fluid landingPage">
        <div className="banner">
          <div className="banner-content">
            <h1>
              Bajaj API Developer Portal <br />
            </h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <button>SignUp</button>
          </div>
          <div className="image-container">
            <div className="gallery">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={hoveredIndex === index ? img.hover : img.initial}
                  alt={`dataImg ${index + 1}`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              ))}
              <div className="text-img">
                {hoveredIndex !== null && <h2>{images[hoveredIndex].text}</h2>}
              </div>
            </div>
          </div>
        </div>
        <div className="how-it-work">
          <div className="how-it-work-div-one">
            <span>
              <div className="how-it">How it </div>
              <h1 className="f-style">Works?</h1>
            </span>
            Get your developers onboard, very quickly. Learn how to incorporate
            our Bajaj APIs in just few easy steps.
          </div>
          <div className="how-it-work-div-two">
            <div>
              <img alt="" src="https://preview.cruip.com/solid/dist/images/feature-icon-01.svg"></img>
              <p>
                1.Sign up for an Bajaj <br></br>Developer Account.
              </p>
            </div>
            <div>
              <img alt="" src="https://preview.cruip.com/solid/dist/images/feature-icon-02.svg"></img>
              <p>2.Select API</p>
            </div>
            <div>
              <img alt="" src="https://preview.cruip.com/solid/dist/images/feature-icon-03.svg"></img>
              <p>3.Test it Out</p>
            </div>
          </div>
        </div>
        <div className="Journey-to-go-Live">
          <div className="Journey-to-go-Live-one">
            <div className="GO-Live">GO Live</div>
            <h1 className="f-style">With Us</h1>
          </div>
          <div className="Journey-to-go-Live-two">
            <div>
              <img alt="" src="https://res.cloudinary.com/dlwpgtmcn/image/upload/v1744959380/tools_wrench_icon-1320087277641665992_bpwhq1.png"></img>
              <p>&nbsp; &nbsp; &nbsp;DEV</p>
            </div>
            <div>
              <img alt="" src="https://res.cloudinary.com/dlwpgtmcn/image/upload/v1744959633/computer-131994967732477480_k3n3pg.png"></img>
              <p>&nbsp; &nbsp; &nbsp; &nbsp; UAT</p>
            </div>
            <div>
              <img alt="" src="https://res.cloudinary.com/dlwpgtmcn/image/upload/v1744960132/cloud_cloud_computing_comment_communication_connection-1320086425914902674_0px_wg3xcw.svg"></img>
              <p>PRODUCTION</p>
            </div>
          </div>
          <div className="Journey-to-go-Live-three">
            <p>
              Signup to Bajaj API Developer Portal Sandbox environment to start
              your journey. Upgrade to UAT environment for end to end real time
              testing , post your NDA with us. Go-live with integration to
              production environment.
            </p>
          </div>
        </div>
        <div className="Available-APIs">
          <div className="Available-APIs-one">
            <div className="GO-Live">Available </div>
            <h1 className="f-style">API</h1>
          </div>
          <div className="Available-APIs-two">
            <Cards />
          </div>
        </div>
      </div>
      <div class="pg-footer">
        <footer class="footer">
          <div class="footer-content">
            <div class="footer-content-column">
              <div class="footer-logo">
                <a class="footer-logo-link" href="/">
                  <img alt=""
                    style={{ height: "90px", width: "100%", marginLeft: "-12px" }}
                    src={favouriteIndianLogo}
                  ></img>
                </a>
              </div>
              <div class="footer-menu">
                <h2 class="footer-menu-name"> Get Started</h2>
                <ul id="menu-get-started" class="footer-menu-list">
                  <li class="menu-item menu-item-type-post_type menu-item-object-product">
                    <a href="/">Start</a>
                  </li>
                  <li class="menu-item menu-item-type-post_type menu-item-object-product">
                    <a href="/">Documentation</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="footer-content-column">
              <div class="footer-menu">
                <h2 class="footer-menu-name"> Company</h2>
                <ul id="menu-company" class="footer-menu-list">
                  <li class="menu-item menu-item-type-post_type menu-item-object-page">
                    <a href="/">Contact</a>
                  </li>
                  <li class="menu-item menu-item-type-taxonomy menu-item-object-category">
                    <a href="/">News</a>
                  </li>
                </ul>
              </div>
              <div class="footer-menu">
                <h2 class="footer-menu-name"> Legal</h2>
                <ul id="menu-legal" class="footer-menu-list">
                  <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-privacy-policy menu-item-170434">
                    <a href="/">Privacy Notice</a>
                  </li>
                  <li class="menu-item menu-item-type-post_type menu-item-object-page">
                    <a href="/">Terms of Use</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="footer-content-column">
              <div class="footer-menu">
                <h2 class="footer-menu-name"> Quick Links</h2>
                <ul id="menu-quick-links" class="footer-menu-list">
                  <li class="menu-item menu-item-type-custom menu-item-object-custom">
                    <a target="_blank" rel="noopener noreferrer" href="/">
                      Support Center
                    </a>
                  </li>
                  <li class="menu-item menu-item-type-custom menu-item-object-custom">
                    <a target="_blank" rel="noopener noreferrer" href="/">
                      Service Status
                    </a>
                  </li>
                  <li class="menu-item menu-item-type-post_type menu-item-object-page">
                    <a href="/">Security</a>
                  </li>
                  <li class="menu-item menu-item-type-post_type menu-item-object-page">
                    <a href="/">Blog</a>
                  </li>
                  <li class="menu-item menu-item-type-post_type_archive menu-item-object-customer">
                    <a href="/">Customers</a>
                  </li>
                  <li class="menu-item menu-item-type-post_type menu-item-object-page">
                    <a href="/">Reviews</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="footer-content-column">
              <div class="footer-call-to-action">
                <h2 class="footer-call-to-action-title"> Let's Chat</h2>
                <p class="footer-call-to-action-description">
                  {" "}
                  Have a support question?
                </p>
                <a
                  class="footer-call-to-action-button button"
                  href="/"
                  target="_self"
                >
                  {" "}
                  Get in Touch{" "}
                </a>
              </div>
            </div>
          </div>
          <div class="footer-copyright">
            <div class="footer-copyright-wrapper">
              <p class="footer-copyright-text">
                <a class="footer-copyright-link" href="/" target="_self">
                  ©2025. | All rights reserved.
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
