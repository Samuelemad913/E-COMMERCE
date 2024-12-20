import React, { useContext } from "react";
import logo from "../../assets/images/freshcart-logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { TokenContext } from "../../Context/Token";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {

  let {numOfCartItems , wishCount} = useContext(CartContext)

  let Navigate = useNavigate();
  let {  setToken } = useContext(TokenContext);
  function logOut() {
    localStorage.removeItem("token");
    setToken(null);
    Navigate("/login");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary py-3 fixed-top">
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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-center fw-bold">
              <li className="nav-item">
                <NavLink className="nav-link" to={"home"}>
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={"products"}>
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={"Categories"}>
                  Categories
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={"brands"}>
                  Brands
                </NavLink>
              </li>
            </ul>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 fw-bold text-center py-sm-3 py-md-0">
              <li className="nav-item px-sm-0 px-1 ps-3 ps-sm-0 mx-1 py-sm-2 py-md-0">
                <NavLink className="nav-link position-relative" to={"wishlist"}>
                  <i className="fa-solid fa-heart fa-xl"></i>
                  <span className="position-absolute top-0 start-70 translate-middle badge rounded-pill bg-main">
                    {wishCount ? wishCount :0}
                  </span>
                </NavLink>
              </li>
              <li className="nav-item px-sm-0 px-1 ps-3 ps-sm-0 mx-1 py-sm-2 py-md-0">
                <NavLink className="nav-link position-relative" to={"cart"}>
                  <i className="fa-solid fa-cart-shopping fa-xl"></i>
                  <span className="position-absolute top-0 start-70 translate-middle badge rounded-pill bg-main">
                  {numOfCartItems? numOfCartItems : 0}
                  </span>
                </NavLink>
              </li>
              <li className="nav-item px-2">
                <button onClick={logOut} className="nav-link color">
                  <i className="fa-solid fa-right-from-bracket fa-lg mx-1 "></i>
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
