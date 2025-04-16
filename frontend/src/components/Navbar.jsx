// src/components/Navbar.jsx
import "foundation-sites/dist/css/foundation.min.css";
import "foundation-sites/dist/js/foundation.min.js";
import "../styles/Navbar.css";
import Logo from "../img/logo.png";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import $ from "jquery";

const Navbar = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    $(document).foundation();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirigir al login después de cerrar sesión
  };

  return (
    <div>
      <div
        className="title-bar"
        data-responsive-toggle="responsive-menu"
        data-hide-for="large"
      >
        <button
          className="menu-icon"
          type="button"
          data-toggle="responsive-menu"
        ></button>
        <div className="title-bar-title">Menu</div>
      </div>

      <div className="top-bar" id="responsive-menu">
        <div className="top-bar-left">
          <ul className="dropdown menu" data-dropdown-menu>
            <li className="menu-text">
              <a href="/">
                <img src={Logo} alt="Logo Heladería" />
              </a>
            </li>
            <li className="menu-left">
              <a className="link-12" href="/">
                INICIO
              </a>
            </li>
          </ul>
        </div>
        <div className="top-bar-right">
          <ul className="dropdown menu" data-dropdown-menu>
            <li>
              <a className="link-12" href="/productos">
                PRODUCTOS
              </a>
            </li>
            <li>
              <a className="link-12" href="/nosotros">
                NOSOTROS
              </a>
            </li>
            <li>
              <a className="link-12" href="/galeria">
                GALERIA
              </a>
            </li>
            <li>
              <a className="link-12" href="/api">
                API
              </a>
            </li>
            <li>
              {auth?.isAuthenticated ? (
                <div className="user-info">
                  {/* Usamos auth.user.username para mostrar el nombre correctamente */}
                  {auth.user?.username ? (
                    <span className="user-name">{auth.user.username}</span>
                  ) : (
                    <span className="user-name">Usuario</span>
                  )}
                  <button className="logout-btn" onClick={handleLogout}>
                    <FaSignOutAlt />
                  </button>
                </div>
              ) : (
                <a className="link-12" href="/login">
                  <FaUser />
                </a>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
