// LoadingScreen.jsx
import React from "react";
import "../styles/LoadingScreen.css"; // opcional para estilos personalizados

const LoadingScreen = () => {
  return (
    <div>
      <div className="page-wrapper">
        <div className="loader">
          <div className="jelly">
            <div className="body"></div>
            <div className="stick"></div>
            <div className="eye"></div>
            <div className="eye"></div>
            <div className="mouth"></div>
          </div>
          <div className="shadow"></div>
        </div>
        <div className="loader-container">
          <div className="loading-text">
            Cargando<span className="dots"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
