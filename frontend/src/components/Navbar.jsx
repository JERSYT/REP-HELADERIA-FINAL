import "foundation-sites/dist/css/foundation.min.css";
import "foundation-sites/dist/js/foundation.min.js";
import "../styles/Navbar.css";
import Logo from "../img/logo.png";
import $ from "jquery";
import { useEffect } from "react";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  useEffect(() => {
    $(document).foundation();

    // Añadir el script de Google Translate si no está ya añadido
    if (!window.googleTranslateScriptAdded) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);
      window.googleTranslateScriptAdded = true;
    }

    // Inicializar Google Translate
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "es",
          includedLanguages: "es,en,pt,fr",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
    };

    // Función para reemplazar el texto "G_Traducir" por el icono
    const replaceGTranslateTextWithIcon = () => {
      const translateFonts = document.querySelectorAll("font");

      translateFonts.forEach((font) => {
        if (font.textContent.includes("g_traducir")) {
          font.innerHTML =
            '<span class="material-symbols-outlined" style="color: #fa52a0 !important; ">g_translate</span>';
        }
      });
    };

    // Observador de mutaciones para detectar cambios en el DOM generados por el traductor
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        replaceGTranslateTextWithIcon(); // Reemplaza cada vez que hay un cambio
      });
    });

    // Monitorea el documento completo para detectar cambios
    observer.observe(document.body, { childList: true, subtree: true });

    // Cleanup para detener el observador cuando el componente se desmonte
    return () => {
      observer.disconnect();
    };
  }, []);

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
            <div className="menu-left">
              <div
                id="google_translate_element"
                className="custom-google-translate-wrapper"
                onClick={() => {
                  const translateFrame = document.querySelector(
                    ".goog-te-gadget-simple"
                  );
                  if (translateFrame) {
                    translateFrame.click();
                  }
                }}
              >
                <span className="link-12 material-symbols-outlined">
                  g_translate
                </span>
              </div>
            </div>
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
              <a className="link-12" href="/login">
                <FaUser />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
