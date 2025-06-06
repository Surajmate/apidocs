import React, { useEffect, useState } from "react";
 import { useNavigate } from "react-router-dom";
import "./landingpage.css"
import Navbar from "../Navbar/Navbar";
import { Link } from 'react-router-dom';

import Cards from "../card/Cards";
import favouriteIndianLogo from "../../data/favourite-indian.png";

const LandingPage = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const images = [
    {
      initial: "/assets/main-img-banner.png",
      hover:
        "https://truckcdn.cardekho.com/in/bajaj/compact-4s/bajaj-compact-4s-48935.jpg?impolicy=resize&imwidth=480",
      text: "3 WHEELERS ",
    },
    {
      initial: "/assets/main-img-banner.png",
      hover:
        "https://cdn.bikedekho.com/processedimages/bajaj/bajaj-pulsar-200-ns/source/bajaj-pulsar-200-ns65df4e8f1a6e0.jpg",
      text: "MOTORCYCLES",
    },
    {
      initial: "/assets/main-img-banner.png",
      hover: "https://truckcdn.cardekho.com/in/bajaj/qute/bajaj-qute-29389.jpg",
      text: "QUTE",
    },
    {
      initial: "/assets/main-img-banner.png",
      hover:
        "https://cdn.bikedekho.com/processedimages/source/66da7273c6ef6.jpg",
      text: "CHETAK",
    },
  ];

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
      <div className="specially-for-scroll">
        <div className="container-fluid landingPage">
          <div className="banner">
            <div className="banner-content">
              <h1 style={{ fontSize: "30px" }}>
                Welcome to 
              </h1>
              <h1>
                Bajaj API Developer Portal <br />
              </h1>
              <p>
                — your one-stop destination for accessing, integrating, and
                managing powerful APIs that drive seamless digital experiences.
                Whether you're building customer journeys, or partner
                integrations, our APIs offer secure, scalable, and easy-to-use
                solutions to accelerate your development.
              </p>
              <button onClick={() => navigate("/signup")}>SignUp</button>
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
                  {hoveredIndex !== null && (
                    <h2>{images[hoveredIndex].text}</h2>
                  )}
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
              Onboard your developers effortlessly. Discover how easy it is to
              integrate Bajaj APIs in just a few simple steps.
            </div>
            <div className="row text-center py-4">
              <div className="col-xs-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 col-12 my-3">
                <img
                  className="text-center"
                  alt=""
                  height={100}
                  width={100}
                  src="\assets\vecteezy_user-3d-graphic-illustration_42156821_dsbnyu.png"
                />
                <p className="">
                  <b>
                    Sign up for Bajaj <br /> Developer Account.
                  </b>
                </p>
              </div>
              <div className="col-xs-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 col-12 my-3">
                <img
                  className="text-center"
                  alt=""
                  height={100}
                  width={100}
                  src="/assets/vecteezy_elegant-abstract-cloud-computing-distributed-network_56743178_xkwlg6.png"
                />
                <p className="">
                  <b>Select API</b>
                </p>
              </div>
              <div className="col-xs-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 col-12 my-3">
                <img
                  className="text-center"
                  alt=""
                  height={100}
                  width={100}
                  src="/assets/vecteezy_note-checklist-delivery-3d-illustration_23257669_nztffw.png"
                />
                <p className="">
                  <b>Test it Out</b>
                </p>
              </div>
            </div>
          </div>
          <div className="Journey-to-go-Live">
            <div className="Journey-to-go-Live-one">
              <span>
                <div className="GO-Live">GO Live</div>
                <h1 className="f-style">With Us</h1>
              </span>
            </div>

            <div className="row text-center py-4">
              <div className="col-xs-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 col-12 my-2">
                <img
                  className="text-center"
                  alt=""
                  height={100}
                  width={100}
                  src="https://res.cloudinary.com/dlwpgtmcn/image/upload/v1744959380/tools_wrench_icon-1320087277641665992_bpwhq1.png"
                />
                <p className="golive-steps">
                  <b>DEV</b>
                </p>
              </div>
              <div className="col-xs-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 col-12 my-2">
                <img
                  className="text-center"
                  alt=""
                  height={100}
                  width={100}
                  src="https://res.cloudinary.com/dlwpgtmcn/image/upload/v1744959633/computer-131994967732477480_k3n3pg.png"
                />
                <p className="golive-steps">
                  <b>UAT</b>
                </p>
              </div>
              <div className="col-xs-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 col-12 my-2">
                <img
                  className="text-center"
                  alt=""
                  height={100}
                  width={100}
                  src="https://res.cloudinary.com/dlwpgtmcn/image/upload/v1744960132/cloud_cloud_computing_comment_communication_connection-1320086425914902674_0px_wg3xcw.svg"
                />
                <p className="golive-steps">
                  <b>PRODUCTION</b>
                </p>
              </div>
            </div>
            <div className="Journey-to-go-Live-three">
              <p>
                Sign up for the Bajaj API Developer Portal Sandbox to kickstart
                your development journey. Once your NDA is in place, upgrade to
                the UAT environment for comprehensive end-to-end testing. When
                you're ready, go live with full integration into the production
                environment.
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
        <div className="pg-footer">
          <footer className="footer">
            <div className="footer-content">
              <div className="footer-content-column">
                <div className="footer-logo">
                  <a className="footer-logo-link" href="/">
                    <img
                      alt="logo"
                      style={{
                        height: "90px",
                        width: "100%",
                        marginLeft: "-12px",
                      }}
                      src={favouriteIndianLogo}
                    ></img>
                  </a>
                </div>
                <div className="footer-menu">
                  <h2 className="footer-menu-name"> Get Started</h2>
                  <ul id="menu-get-started" className="footer-menu-list">
                    <li className="menu-item menu-item-type-post_type menu-item-object-product">
                      <a href="/">FAQ</a>
                    </li>
                    <li className="menu-item menu-item-type-post_type menu-item-object-product">
                      <a href="/">Documentation</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="footer-content-column">
                <div className="footer-menu">
                  <h2 class="footer-menu-name"> Company</h2>
                  <ul id="menu-company" class="footer-menu-list">
                    <li className="menu-item menu-item-type-post_type menu-item-object-page">
                      <a href="/">Contact</a>
                    </li>
                  </ul>
                </div>
                <div className="footer-menu">
                  <h2 className="footer-menu-name"> Legal</h2>
                  <ul id="menu-legal" class="footer-menu-list">
                    <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-privacy-policy menu-item-170434">
                      <a href="/">Privacy Notice</a>
                    </li>
                    <li className="menu-item menu-item-type-post_type menu-item-object-page">
                      <a href="/">Terms of Use</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="footer-content-column">
                <div className="footer-menu">
                  <h2 className="footer-menu-name"> Quick Links</h2>
                  <ul id="menu-quick-links" className="footer-menu-list">
                    <li className="menu-item menu-item-type-custom menu-item-object-custom">
                      <a target="_blank" rel="noopener noreferrer" href="/">
                        Support Center
                      </a>
                    </li>
                    <li className="menu-item menu-item-type-custom menu-item-object-custom">
                      <a target="_blank" rel="noopener noreferrer" href="/">
                        Service Status
                      </a>
                    </li>
                    <li className="menu-item menu-item-type-post_type menu-item-object-page">
                      <a href="/">Security</a>
                    </li>
                    <li className="menu-item menu-item-type-post_type menu-item-object-page">
                      <a href="/">Blog</a>
                    </li>
                    <li className="menu-item menu-item-type-post_type_archive menu-item-object-customer">
                      <a href="/">Customers</a>
                    </li>
                    <li className="menu-item menu-item-type-post_type menu-item-object-page">
                      <a href="/">Reviews</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="footer-content-column">
                <div className="footer-call-to-action">
                  <h2 className="footer-call-to-action-title"> Let's Chat</h2>
                  <p className="footer-call-to-action-description">
                    Have a support question?
                  </p>
                  <a
                    className="footer-call-to-action-button button"
                    href="/"
                    target="_self"
                  >
                    Get in Touch
                  </a>
                </div>
              </div>
            </div>
            <div className="footer-copyright">
              <div className="footer-copyright-wrapper">
                <p className="footer-copyright-text">
                  <span
                    className="footer-copyright-link"
                    href="/"
                    target="_self"
                  >
                    ©2025. | All rights reserved.
                  </span>
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
