import React, { useEffect, useState } from "react";
import logo from "../images/logo.png";
import everestLogo from "../images/everest.png";
import { jwtDecode } from "jwt-decode";
import "../assets/header2.css";

const Header2 = ({
  isAdmin,
  isLoggedIn,
  clearToken
}) => {

  const [userName, setUserName] =
    useState("");

  useEffect(() => {

    const token =
      localStorage.getItem(
        "accessToken"
      );

    if (!token) return;

    try {

      const decoded =
        jwtDecode(token);

      const name =
        decoded?.name ||
        decoded?.userName ||
        decoded?.payload?.[2] ||
        "";

      setUserName(name);

    }
    catch (err) {

      console.error(
        "JWT Decode Error:",
        err
      );

    }

  }, []);

  return (

    <header className="header2 shadow-sm">

      <nav
        className="
        navbar
        navbar-expand-lg
        navbar-dark
        "
      >

        <div
          className="
          container-fluid
          px-lg-3
          "
        >

          {/* ======================
              LEFT LOGO
          ====================== */}

          <a
            className="
            navbar-brand
            d-flex
            align-items-center
            "
            href="/"
          >

            <img
              src={logo}
              alt="logo"
              className="brand-logo"
            />

            <div className="ms-2">

              <h4 className="brand-name">
                ELIMUFITI
              </h4>

              <span className="brand-sub">
                Learning Solutions
              </span>

            </div>

          </a>


          {/* ======================
              MOBILE TOGGLE
          ====================== */}

          <button
            className="
            navbar-toggler
            border-0
            "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
          >

            <span className="navbar-toggler-icon"></span>

          </button>


          <div
            className="
            collapse
            navbar-collapse
            "
            id="mainNav"
          >

            {/* ======================
                NAV LINKS
            ====================== */}

            <ul
              className="
              navbar-nav
              mx-auto
              align-items-lg-center
              "
            >

              {/* Unlock */}

              <li className="nav-item">

                <a
                  href="/subscription"
                  className="nav-link"
                >

                  Unlock Resources

                </a>

              </li>


              {/* Solutions */}

              <li
                className="
                nav-item
                dropdown
                "
              >

                <a
                  className="
                  nav-link
                  dropdown-toggle
                  "
                  data-bs-toggle="dropdown"
                  href="/"
                >

                  Solutions

                </a>

                <ul className="dropdown-menu">

                  <li>

                    <a
                      className="dropdown-item"
                      href="#solution1"
                    >

                      Solution 1

                    </a>

                  </li>

                  <li>

                    <a
                      className="dropdown-item"
                      href="#solution2"
                    >

                      Solution 2

                    </a>

                  </li>

                  <li>

                    <a
                      className="dropdown-item"
                      href="#solution3"
                    >

                      Solution 3

                    </a>

                  </li>

                </ul>

              </li>


              {/* Hub */}

              <li
                className="
                nav-item
                dropdown
                "
              >

                <a
                  className="
                  nav-link
                  dropdown-toggle
                  "
                  data-bs-toggle="dropdown"
                  href="/"
                >

                  Hub

                </a>

                <ul className="dropdown-menu">

                  <li>

                    <a
                      className="dropdown-item"
                      href="/school/resources"
                    >

                      School Resources

                    </a>

                  </li>

                  <li>

                    <a
                      className="dropdown-item"
                      href="/careers"
                    >

                      Job Opportunities

                    </a>

                  </li>

                  <li>

                    <a
                      className="dropdown-item"
                      href={
                        isAdmin
                        ? "/support"
                        : "/"
                      }
                    >

                      Support

                    </a>

                  </li>

                </ul>

              </li>


              {/* About */}

              <li
                className="
                nav-item
                dropdown
                "
              >

                <a
                  className="
                  nav-link
                  dropdown-toggle
                  "
                  data-bs-toggle="dropdown"
                  href="/"
                >

                  About

                </a>

                <ul className="dropdown-menu">

                  <li>

                    <a
                      className="dropdown-item"
                      href="#team"
                    >

                      Our Team

                    </a>

                  </li>

                  <li>

                    <a
                      className="dropdown-item"
                      href="#mission"
                    >

                      Our Mission

                    </a>

                  </li>

                  <li>

                    <a
                      className="dropdown-item"
                      href="#values"
                    >

                      Our Values

                    </a>

                  </li>

                </ul>

              </li>


              {/* Contact */}

              <li
                className="
                nav-item
                dropdown
                "
              >

                <a
                  className="
                  nav-link
                  dropdown-toggle
                  "
                  data-bs-toggle="dropdown"
                  href="/"
                >

                  Contact us

                </a>

                <ul className="dropdown-menu">

                  <li className="dropdown-item">

                    Tel:
                    0716 880 637

                  </li>

                  <li className="dropdown-item">

                    Email:
                    info@elimufiti.co.ke

                  </li>

                </ul>

              </li>

            </ul>


            {/* ======================
                RIGHT SIDE
            ====================== */}

            <div
              className="
              d-flex
              align-items-center
              gap-3
              "
            >

              {!isLoggedIn ? (

                <>

                  <div
                    className="
                    partner-pill
                    "
                  >

                    <span
                      className="
                      partner-text
                      "
                    >

                      Partnered with

                    </span>

                    <img
                      src={everestLogo}
                      alt="Everest"
                      className="
                      everest-logo
                      "
                    />

                  </div>

                  <a
                    href="/signup"
                    className="
                    signin-btn
                    "
                  >

                    Sign In

                  </a>

                </>

              ) : (

                <>

                  <span
                    className="
                    username
                    "
                  >

                    {userName}

                  </span>

                  <button
                    onClick={clearToken}
                    className="
                    power-btn
                    "
                  >

                    <i className="bi bi-power"></i>

                  </button>

                </>

              )}

            </div>

          </div>

        </div>

      </nav>

    </header>

  );

};

export default Header2;