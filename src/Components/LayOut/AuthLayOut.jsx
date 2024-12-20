import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg";

export default function AuthLayOut() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary py-3">
        <div className="container">
          <NavLink className="navbar-brand">
            <img src={logo} alt="Store Logo" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 fw-bold text-center py-sm-3 py-md-0">
              <li className="nav-item px-2">
                <NavLink className="nav-link color" to={'/login'}>
                  <i className="fa-solid fa-right-from-bracket fa-lg mx-1 "></i>
                  Sign In
                </NavLink>
              </li>
              <li className="nav-item px-2">
                <NavLink className="nav-link color" to={'/register'}>
                  <i className="fa-solid fa-right-from-bracket fa-lg mx-1 "></i>
                  Sign up
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
}
