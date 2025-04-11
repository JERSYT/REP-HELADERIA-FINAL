import "foundation-sites/dist/css/foundation.min.css";
import "foundation-sites/dist/js/foundation.min.js";
import "../styles/Footer.css";
import $ from "jquery";
import { useEffect } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa'; // Iconos para contacto

const Footer = () => {
  useEffect(() => {
    // Inicializa Foundation una vez que el DOM esté cargado
    $(document).foundation();
  }, []);

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Primera columna: Logo */}
        <div className="footer-column footer-logo">
          <img src="https://i.ibb.co/YLhsHJn/DOLCE-NEVADE.png" alt="Heladería Logo" className="logo-image" />
          <div className="footer-social">
              <a href="#" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="social-icon" />
              </a>
              <a href="https://www.instagram.com/uscooficial/?hl=es" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="social-icon" />
              </a>
              <a href="https://web.facebook.com/USCOoficial" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="social-icon" />
              </a>
          </div>
        </div>

        {/* Segunda columna: Horario de atención */}
        <div className="footer-column">
          <h5>Horario de Atención</h5>
          <p>Lunes a viernes: 9:30 am a 5:45 pm</p>
          <p>Sábado: 10 am a 5 pm</p>
          <p>Domingo y festivos: 11 am a 5:45 pm</p>
        </div>

        {/* Tercera columna: Información de contacto */}
        <div className="footer-column">
          <h5>Información de Contacto</h5>
          <div className="footer-contact">
            <FaPhone /> <p>+57 3167924610</p>
          </div>
          <div className="footer-contact">
            <FaEnvelope /> <p>heladeria@gmail.com</p>
          </div>
          <div className="footer-contact">
            <FaMapMarkerAlt /> <p>Calle 23 #23-23</p>
          </div>
          
        </div>

        {/* Cuarta columna: Hipervínculos de navegación */}
        <div className="footer-column">
          <div className="footer-end-title"><h5>Navegación</h5></div>
          <ul className="footer-nav">
            <li><a href="/">INICIO</a></li>
            <li><a href="/productos">PRODUCTOS</a></li>
            <li><a href="/nosotros">NOSOTROS</a></li>
            <li><a href="/galeria">GALERÍA</a></li>
            <li><a href="/api">API</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
