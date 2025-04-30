import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const handleLogoClick = () => {
    navigate("/");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (event) => {
      const dropdown = document.querySelector(".dropdown");
      const hamburgerMenu = document.querySelector(".hamburger-menu");

      if (
        isDropdownOpen &&
        dropdown &&
        !dropdown.contains(event.target) &&
        !hamburgerMenu.contains(event.target)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isDropdownOpen]);

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <img
            src="/assets/logo.png"
            alt="BikeAPI Logo"
            className="logo-img"
            onClick={handleLogoClick}
          />
          <h1
            className="Bajaj-Api-Developer-Portal"
           
          >
            Bajaj Api Developer Portal
          </h1>
        </div>
        <div className="hamburger-menu" onClick={toggleDropdown}>
          <img
            src="https://res.cloudinary.com/dlwpgtmcn/image/upload/v1745997086/sdafs-removebg-preview_iu5tjt.png"
            alt="Menu"
          />
        </div>
        <div
          className={`nav-links ${isDropdownOpen ? "dropdown-open" : ""}`}
        >
          {!isHomePage && <span onClick={() => navigate("/")}>Home</span>}
          <span onClick={() => navigate("/explore")}>Explore APIS</span>
          <span onClick={() => navigate("/faq")}>FAQ</span>
          <span className="nav-login" onClick={() => navigate("/login")}>
            Login
          </span>
        </div>
      </nav>
      {isDropdownOpen && (
        <div className="dropdown">
          {!isHomePage && <span onClick={() => navigate("/")}>Home</span>}
          <span onClick={() => navigate("/explore")}>Explore APIS</span>
          <span onClick={() => navigate("/faq")}>FAQ</span>
          <span className="nav-login" onClick={() => navigate("/login")}>
            Login
          </span>
        </div>
      )}
    </>
  );
};

export default Navbar;
