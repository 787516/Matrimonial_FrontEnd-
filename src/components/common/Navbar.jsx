import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg fixed-top glass-navbar justify-content-center">
      <div className="navbarDiv d-flex align-items-center justify-content-between">

        {/* LEFT LOGO */}
        <Link className="navbar-brand" to="/">SnehaBandh.</Link>

        {/* MOBILE TOGGLER */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* LINKS + BUTTONS */}
        <div className="collapse navbar-collapse" id="navMenu">

          {/* CENTER MENU */}
          <ul className="navbar-nav mx-auto align-items-center gap-lg-3 gap-2">

            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            {/* About Us Dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                data-bs-toggle="dropdown"
              >
                About Us
              </a>

              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/terms">Terms & Conditions</Link></li>
                <li><Link className="dropdown-item" to="/privacy">Privacy Policy</Link></li>
                <li><Link className="dropdown-item" to="/faq">FAQ</Link></li>

                <li><hr className="dropdown-divider" /></li>

                <li><Link className="dropdown-item" to="/disclaimer">Disclaimer</Link></li>
                <li><Link className="dropdown-item" to="/report-misuse">Report Misuse</Link></li>
                <li><Link className="dropdown-item" to="/contact">Contact Us</Link></li>
              </ul>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/membership">Membership Plan</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/matches">Your Matches</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">Profile Dashboard</Link>
            </li>
          </ul>

          {/* RIGHT SIDE BUTTONS + BELL */}
          <div className="right-nav d-flex align-items-center gap-3 ms-auto">

            {/* Notifications */}
            <div className="notif-container position-relative d-none d-lg-block">
              <FaBell
                className="notif-bell"
                onClick={() => setNotifOpen(!notifOpen)}
              />
              <span className="notif-dot"></span>

              {/* NOTIFICATION BOX */}
              <div
                className="notif-box"
                style={{ display: notifOpen ? "block" : "none" }}
              >
                <div className="notif-item">New profile matched your preferences</div>
                <div className="notif-item">Someone liked your profile</div>
                <div className="text-center mt-2">
                  <Link to="/notifications" className="fw-bold" style={{ color: "#D31027" }}>
                    View All
                  </Link>
                </div>
              </div>
            </div>

            {/* Login + Register Buttons */}
            <div className="auth-buttons d-flex gap-2">
              <Link to="/login">
                <button className="btn-gradient">Log In</button>
              </Link>
              <Link to="/register">
                <button className="btn-gradient">Register</button>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



// import { Link } from 'react-router-dom';
// import './Navbar.css';
// import React from 'react'

// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <div className="navbar-container">
//         <Link to="/" className="navbar-logo">
//           💒 Matrimonial
//         </Link>
//         <ul className="navbar-menu">
//           <li><Link to="/">Home</Link></li>
//           <li><Link to="/login">Login</Link></li>
//           <li><Link to="/register">Register</Link></li>
//           <li><Link to="/about">About</Link></li>
//           <li><Link to="/contact">Contact</Link></li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
