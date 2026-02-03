import React from "react";
import logo from "../images/logo.PNG";
import "../assets/header2.css";

const Header2 = ({
  isAdmin,
  userId,
  isLoggedIn,
  clearToken,
  isSubscribed,
}) => {

  return (
  <div className="header2-container container-fluid text-white px-2 py-2 d-flex align-items-center">


      {/* LEFT NAV */}
      <nav>
        <ul className="nav align-items-center">

          {/* LOGO */}
          <li className="nav-item">
            <img
              src={logo}
              alt="Elimufiti logo"
              style={{ width: 35, height: 35, borderRadius: "50%" }}
            />
          </li>

          {/* UNLOCK CBE RESOURCES – all screens */}
          <li className="nav-item">
            <a className="nav-link text-white" href="/subscription">
              Unlock  Resources
            </a>
          </li>

          {/* SOLUTIONS – desktop only */}
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

          {/* RESOURCES – all screens */}
          <li className="nav-item dropdown">
            <button
              className="nav-link dropdown-toggle btn btn-link text-white"
              data-bs-toggle="dropdown"
              type="button"
            >
              Hub
            </button>
            <ul className="dropdown-menu mt-2">
              <li>
                <a className="dropdown-item" href="/school/resources">
                  School Resources
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/careers">
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

          {/* ABOUT – desktop only */}
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

          {/* CONTACT – desktop only */}
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

          {/* SIGN IN – desktop only */}
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
      <div className="d-flex align-items-center gap-2 flex-nowrap">

  {/* SIGN IN – MOBILE ONLY */}
  {!isLoggedIn && (
    <a
      href="/signup"
      className="btn btn-sm d-block d-md-none text-light p-0"
      style={{
        border: "none",
        background: "transparent",
        whiteSpace: "nowrap"
      }}
    >
      Sign In
    </a>
  )}

  {/* LOGOUT – ALL SCREENS */}
  {isLoggedIn && (
    <button
      type="button"
      className="btn btn-sm d-block d-md-none text-light p-0"
      onClick={clearToken}
    >
      Logout
    </button>
  )}

  {/* SITE NAME – DESKTOP ONLY */}
  {!isLoggedIn && (
    <p className="qwitcher-grypen-bold mb-0 d-none d-md-block">
      elimufiti learning solutions
    </p>
  )}
</div>


    </div>
  );
};

export default Header2;
