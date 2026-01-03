import React, { useState } from "react";
import VerticalNav from "./VerticalNav";
import logo from "../images/logo.PNG";
import "../assets/header2.css";

const Header2 = ({
  onClick,
  isAdmin,
  userId,
  isLoggedIn,
  clearToken,
  isSubscribed,
}) => {
  const [verticalNavVisible, setVerticalNavVisible] = useState(false);

  const toggleClick = (e) => {
    e.preventDefault();
    setVerticalNavVisible((prev) => !prev);
    onClick?.(e);
  };

  return (
    <div className="header2-container container-fluid text-white p-2 d-flex justify-content-between align-items-center">
      
      {/* LEFT NAV */}
      <nav>
        <ul className="nav align-items-center">
          <li className="nav-item">
            <img
              src={logo}
              alt="Elimufiti logo"
              style={{ width: 35, height: 35, borderRadius: "50%" }}
            />
          </li>

          <li className="nav-item d-none d-md-block">
            <a className="nav-link text-white" href="/#howitworks">
              How it works
            </a>
          </li>

          {/* SOLUTIONS */}
          <li className="nav-item dropdown d-none d-md-block">
            <button
              className="nav-link dropdown-toggle btn btn-link text-white"
              data-bs-toggle="dropdown"
              type="button"
            >
              Solutions
            </button>
            <ul className="dropdown-menu mt-2">
              <li><a className="dropdown-item" href="#solution1">Solution 1</a></li>
              <li><a className="dropdown-item" href="#solution2">Solution 2</a></li>
              <li><a className="dropdown-item" href="#solution3">Solution 3</a></li>
            </ul>
          </li>

          {/* RESOURCES */}
          <li className="nav-item dropdown d-none d-md-block">
            <button
              className="nav-link dropdown-toggle btn btn-link text-white"
              data-bs-toggle="dropdown"
              type="button"
            >
              Resources
            </button>
            <ul className="dropdown-menu mt-2">
              <li>
                <a className="dropdown-item" href="/school/resources">
                  School Resources
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#jobs">
                  Job Opportunities
                </a>
              </li>
              <li>
                <a className="dropdown-item" href={isAdmin ? "/support" : "/"}>
                  Support
                </a>
              </li>
            </ul>
          </li>

          {/* ABOUT */}
          <li className="nav-item dropdown d-none d-md-block">
            <button
              className="nav-link dropdown-toggle btn btn-link text-white"
              data-bs-toggle="dropdown"
              type="button"
            >
              About
            </button>
            <ul className="dropdown-menu mt-2">
              <li><a className="dropdown-item" href="#team">Our Team</a></li>
              <li><a className="dropdown-item" href="#mission">Our Mission</a></li>
              <li><a className="dropdown-item" href="#values">Our Values</a></li>
            </ul>
          </li>

          {/* CONTACT */}
          <li className="nav-item dropdown d-none d-md-block">
            <button
              className="nav-link dropdown-toggle btn btn-link text-white"
              data-bs-toggle="dropdown"
              type="button"
            >
              Contact us
            </button>
            <ul className="dropdown-menu mt-2">
              <li className="dropdown-item">Tel: 0716 880 637</li>
              <li className="dropdown-item">Email: info@elimufiti.co.ke</li>
            </ul>
          </li>

          {!isLoggedIn && (
            <li className="nav-item d-none d-md-block">
              <a className="nav-link text-white" href="/signup">
                Sign In
              </a>
            </li>
          )}
        </ul>
      </nav>

      {/* RIGHT SIDE */}
      <div className="d-none d-md-block">
        {isLoggedIn ? (
          <button
            type="button"
            className="btn btn-outline-light btn-sm"
            onClick={clearToken}
          >
            Logout
          </button>
        ) : (
          <p className="qwitcher-grypen-bold mb-0">
            elimufiti learning solutions
          </p>
        )}
      </div>

      {/* MOBILE TOGGLE */}
      <button
        type="button"
        className="toggle-Box d-block d-sm-none"
        onClick={toggleClick}
        aria-label="Toggle navigation menu"
      >
        <span className="icon-container">
          <span className="middle"></span>
        </span>
      </button>

      {/* MOBILE NAV */}
      {verticalNavVisible && (
        <VerticalNav
          isSubscribed={isSubscribed}
          isLoggedIn={isLoggedIn}
          userId={userId}
          clearToken={clearToken}
        />
      )}
    </div>
  );
};

export default Header2;
