import React, { useEffect, useState } from "react";
import logo from "../images/logo.png";
import "../assets/header2.css";
import { jwtDecode } from "jwt-decode";

const Header2 = ({ isAdmin, isLoggedIn, clearToken }) => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);

      const name =
        decoded?.name ||
        decoded?.userName ||
        decoded?.payload?.[2] ||
        "";

      setUserName(name);
    } catch (err) {
      console.error("JWT decode error:", err);
    }
  }, []);

  return (
    <div className="header2-container container-fluid text-white px-2 py-2 d-flex align-items-center justify-content-between">

      {/* LEFT NAV */}
      <nav>
        <ul className="nav align-items-center">

          {/* LOGO */}
          <li className="nav-item">
            <img
              src={logo}
              alt="Elimufiti logo"
              style={{ width: 60, height: 60, borderRadius: "50%" }}
            />
          </li>

          <li className="nav-item">
            <a className="nav-link text-white" href="/subscription">
              Unlock Resources
            </a>
          </li>

          {/* SOLUTIONS */}
          <li className="nav-item dropdown d-none d-md-block">
            <button
              className="nav-link dropdown-toggle btn btn-link text-white"
              data-bs-toggle="dropdown"
            >
              Solutions
            </button>

            <ul className="dropdown-menu mt-2">
              <li><a className="dropdown-item" href="#solution1">Solution 1</a></li>
              <li><a className="dropdown-item" href="#solution2">Solution 2</a></li>
              <li><a className="dropdown-item" href="#solution3">Solution 3</a></li>
            </ul>
          </li>

          {/* HUB */}
          <li className="nav-item dropdown">
            <button
              className="nav-link dropdown-toggle btn btn-link text-white"
              data-bs-toggle="dropdown"
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

          {/* ABOUT */}
          <li className="nav-item dropdown d-none d-md-block">
            <button
              className="nav-link dropdown-toggle btn btn-link text-white"
              data-bs-toggle="dropdown"
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
            >
              Contact us
            </button>

            <ul className="dropdown-menu mt-2">
              <li className="dropdown-item">Tel: 0716 880 637</li>
              <li className="dropdown-item">Email: info@elimufiti.co.ke</li>
            </ul>
          </li>

        </ul>
      </nav>

      {/* RIGHT SIDE */}
      <div className="d-flex align-items-center gap-2">

        {!isLoggedIn && (
          <>
            <p className="qwitcher-grypen-bold mb-0 d-none d-md-block">
              elimufiti learning solutions
            </p>

            <a
              href="/signup"
              className="btn btn-sm text-light p-0"
              style={{ border: "none", background: "transparent" }}
            >
              Sign In
            </a>
          </>
        )}

        {isLoggedIn && (
          <>
            <span>{userName}</span>

            <button
              className="btn btn-sm text-light p-0"
              onClick={clearToken}
            >
              <i class="bi bi-power text-danger fs-5"></i>
            </button>
          </>
        )}

      </div>

    </div>
  );
};

export default Header2;