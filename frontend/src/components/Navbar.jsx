import "foundation-sites/dist/css/foundation.min.css";
import "foundation-sites/dist/js/foundation.min.js";
import "../styles/Navbar.css";
import Logo from "../img/logo.png";
import $ from "jquery";
import { useEffect, useState, useContext } from "react";
import { FaUser  } from "react-icons/fa";
import { BsCart2, BsTrash3 } from "react-icons/bs";
import { useAuth } from "../context/AuthContext";
import { CarritoContext } from "../context/CarritoContext";
import { Link } from "react-router-dom";
import { formatearDinero } from "../funciones";

const Navbar = () => {
  const { auth } = useAuth();
  const { carrito, vaciarCarrito, setCarrito } = useContext(CarritoContext);
  const [carritoVisible, setCarritoVisible] = useState(false);

  const toggleCarrito = () => setCarritoVisible(!carritoVisible);

  const calcularTotal = () =>
    carrito.reduce((acc, item) => acc + item.Subtotal, 0);

  const eliminarProducto = (index) => {
    const nuevo = carrito.filter((_, i) => i !== index);
    setCarrito(nuevo);
  };

  const manejarCambioCantidad = (index, nuevaCantidad) => {
    if (nuevaCantidad < 1) return eliminarProducto(index);
    const nuevo = carrito.map((item, i) => {
      const cantidadValida = !isNaN(nuevaCantidad) && nuevaCantidad > 0;
      return i === index
        ? {
            ...item,
            Cantidad: cantidadValida ? nuevaCantidad : item.Cantidad,
            Subtotal: cantidadValida ? nuevaCantidad * item.Precio : item.Subtotal,
          }
        : item;
    });
    setCarrito(nuevo);
  };

  useEffect(() => {
    $(document).foundation();

    if (!window.googleTranslateScriptAdded) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);
      window.googleTranslateScriptAdded = true;
    }

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

    const replaceGTranslateTextWithIcon = () => {
      const translateFonts = document.querySelectorAll("font");
      translateFonts.forEach((font) => {
        if (font.textContent.includes("g_traducir")) {
          font.innerHTML =
            '<span class="material-symbols-outlined" style="color: #fa52a0 !important;">g_translate</span>';
        }
      });
    };

    const observer = new MutationObserver(() => {
      replaceGTranslateTextWithIcon();
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
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
                UBICACIÓN
              </a>
            </li>
            <li>
              <a className="link-12" href="/icecreamcustomizer">
                CREA
              </a>
            </li>

            {/* CARRITO */}
            <li className="carrito-item" style={{ position: "relative" }}>
              <a href="#" onClick={toggleCarrito}>
                <BsCart2 /> ({carrito.length})
              </a>
              {carritoVisible && (
                <div className="carrito-dropdown">
                  {carrito.length === 0 ? (
                    <p className="text-center">Carrito vacío</p>
                  ) : (
                    <table>
                      <tbody>
                        {carrito.map((p, i) => (
                          <tr key={p.id ?? `${p.Personalizado ? "personalizado" : p.Producto}-${i}`}>
                            <td>
                              <img src={p.Imagen} width="40" alt={p.Personalizado ? "Helado personalizado" : p.Producto} />
                            </td>
                            <td>
                              {p.Personalizado ? "Helado personalizado" : p.Producto} x {p.Tamaño || ""}
                              <br />
                              <small>{formatearDinero(p.Precio)}</small>
                            </td>
                            <td>
                              <button
                                onClick={() =>
                                  manejarCambioCantidad(i, p.Cantidad - 1)
                                }
                              >
                                -
                              </button>
                              {p.Cantidad}
                              <button
                                onClick={() =>
                                  manejarCambioCantidad(i, p.Cantidad + 1)
                                }
                              >
                                +
                              </button>
                            </td>
                            <td>{formatearDinero(p.Subtotal)}</td>
                            <td>
                              <button onClick={() => eliminarProducto(i)}>
                                <BsTrash3 />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                  {carrito.length > 0 && (
                    <>
                      <div className="carrito-total">
                        <strong>Total:</strong>{" "}
                        {formatearDinero(calcularTotal())}
                      </div>
                      <div className="carrito-botones">
                        <button onClick={vaciarCarrito}>Vaciar</button>
                        <Link to="/realizarPedido">Comprar</Link>
                      </div>
                    </>
                  )}
                </div>
              )}
            </li>

            {/* LOGIN */}
            {auth.isAuthenticated ? (
              <li>
                <a
                  href="/profile"
                  className="link-12"
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <FaUser />
                  {auth.user?.username || "Usuario"}
                </a>
              </li>
            ) : (
              <li>
                <a className="link-12" href="/login">
                  <FaUser /> Iniciar sesión
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
