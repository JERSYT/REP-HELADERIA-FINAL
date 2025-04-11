import "foundation-sites/dist/css/foundation.min.css";
import "foundation-sites/dist/js/foundation.min.js";
import { useEffect } from "react";
import $ from "jquery";
import "../styles/Relevantes.css";
import Vainilla from "../img/helado_vainilla.jpeg";
import Chocolate from "../img/helado_chocolate.jpeg";
import Fresa from "../img/helado_fresa.jpeg";
import Menta from "../img/helado_menta.jpeg";
import Caramelo from "../img/helado_caramelo.jpeg";
import Cafe from "../img/helado_cafe.jpeg";
import { useNavigate } from "react-router-dom";

const Relevantes = () => {
  const navigate = useNavigate();
  const handleBuy = (id) => {
    navigate(`/comprar/${id}`);
  };
  useEffect(() => {
    window.jQuery = $;
    window.$ = $;

    Foundation.addToJquery($);

    $(document).foundation();
  }, []);

  return (
    <div className="relevantes-container">
      <h1 className="titulo-relevantes">Relevantes</h1>
      <div
        className="ecommerce-product-slider orbit"
        role="region"
        aria-label="Favorite Space Pictures"
        data-orbit
      >
        <ul className="orbit-container">
          <button className="orbit-previous">
            <span className="show-for-sr">Previous Slide</span>&#9664;&#xFE0E;
          </button>
          <button className="orbit-next">
            <span className="show-for-sr">Next Slide</span>&#9654;&#xFE0E;
          </button>

          {/* Primer slide */}
          <li className="is-active orbit-slide">
            <div className="cards-container">
              {/* Carta 1 */}
              <div className="card">
                <div className="product-card-thumbnail">
                  <img
                    className="imagen-relevantes"
                    src={Vainilla}
                    alt="Helado de Vainilla"
                  />
                </div>
                <h2 className="product-card-title">Vainilla Clásica</h2>
                <span className="product-card-desc">
                  Helado cremoso de vainilla con auténtica vaina de vainilla,
                  perfecto para quienes disfrutan de los sabores.
                </span>
                <a href="" onClick={() => handleBuy(1)}>
                  <span className="product-card-price">$6.500</span>
                </a>
              </div>

              {/* Carta 2 */}
              <div className="card">
                <div className="product-card-thumbnail">
                  <img
                    className="imagen-relevantes"
                    src={Chocolate}
                    alt="Chocolate Oscuro"
                  />
                </div>
                <h2 className="product-card-title">Chocolate Oscuro</h2>
                <span className="product-card-desc">
                  Helado de chocolate intenso y rico, hecho con cacao oscuro
                  para un sabor profundo y decadente.
                </span>
                <a href="" onClick={() => handleBuy(2)}>
                  <span className="product-card-price">$6.500</span>
                </a>
              </div>

              {/* Carta 3 */}
              <div className="card">
                <div className="product-card-thumbnail">
                  <img
                    className="imagen-relevantes"
                    src={Fresa}
                    alt="Fresa Natural"
                  />
                </div>
                <h2 className="product-card-title">Fresa Natural</h2>
                <span className="product-card-desc">
                  Helado refrescante hecho con fresas frescas, ideal para los
                  amantes de los sabores frutales y naturales.
                </span>
                <a href="" onClick={() => handleBuy(3)}>
                  <span className="product-card-price">$6.500</span>
                </a>
              </div>
            </div>
          </li>

          {/* Segundo slide */}
          <li className="orbit-slide">
            <div className="cards-container">
              {/* Carta 4 */}
              <div className="card">
                <div className="product-card-thumbnail">
                  <img
                    className="imagen-relevantes"
                    src={Menta}
                    alt="Menta con Chips de Chocolate"
                  />
                </div>
                <h2 className="product-card-title">
                  Menta con Chips de Chocolate
                </h2>
                <span className="product-card-desc">
                  Helado de menta fresca con trozos de chocolate crujiente, una
                  combinación clásica y refrescante.
                </span>
                <a href="" onClick={() => handleBuy(4)}>
                  <span className="product-card-price">$8.500</span>
                </a>
              </div>

              {/* Carta 5 */}
              <div className="card">
                <div className="product-card-thumbnail">
                  <img
                    className="imagen-relevantes"
                    src={Caramelo}
                    alt="Caramelo Salado"
                  />
                </div>
                <h2 className="product-card-title">Caramelo Salado</h2>
                <span className="product-card-desc">
                  Helado cremoso con un toque de caramelo salado, que combina lo
                  dulce y lo salado en cada bocado.
                </span>
                <a href="">
                  <span
                    onClick={() => handleBuy(5)}
                    className="product-card-price"
                  >
                    $8.500
                  </span>
                </a>
              </div>

              {/* Carta 6 */}
              <div className="card">
                <div className="product-card-thumbnail">
                  <img
                    className="imagen-relevantes"
                    src={Cafe}
                    alt="Café Espresso"
                  />
                </div>
                <h2 className="product-card-title">Café Espresso</h2>
                <span className="product-card-desc">
                  Helado con un sabor intenso a café, perfecto para los amantes
                  del café que buscan un postre energético.
                </span>
                <a href="" onClick={() => handleBuy(6)}>
                  <span className="product-card-price">$8.500</span>
                </a>
              </div>
            </div>
          </li>
        </ul>
        <nav className="orbit-bullets">
          <button className="is-active" data-slide="0">
            <span className="show-for-sr">First slide details.</span>
            <span className="show-for-sr">Current Slide</span>
          </button>
          <button data-slide="1">
            <span className="show-for-sr">Second slide details.</span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Relevantes;
