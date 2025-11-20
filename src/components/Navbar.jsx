import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/navbar.css";

const Navbar = () => {
  const { setIsCartOpen, getTotalItems } = useCart();

  return (
    <nav className="navbar navbar-custom navbar-expand-lg">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand navbar-brand-custom">
          <img src="/logo.png" alt="KBT Store Logo" /> KBT Store
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link nav-link-custom">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/catalog" className="nav-link nav-link-custom">
                Catálogo
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link nav-link-custom">
                Contacto
              </Link>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-link nav-link nav-link-custom cart-icon-custom"
                onClick={() => setIsCartOpen(true)}
                style={{
                  position: "relative",
                  border: "none",
                  background: "none",
                }}
              >
                🛒
                {getTotalItems() > 0 && (
                  <span className="cart-badge">{getTotalItems()}</span>
                )}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
