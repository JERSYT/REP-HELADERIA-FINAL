import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import $ from "jquery";
import "foundation-sites/dist/css/foundation.min.css";
import "foundation-sites/dist/js/foundation.min.js";
import products from "../js/productos";
import "../styles/Comprar.css";
import NotFoundComprar from "../components/NotFoundComprar.jsx";

const Comprar = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id)); // Encuentra el producto por ID

  useEffect(() => {
    $(document).foundation();
    window.scrollTo(0, 0);
  }, []);

  if (!product) return <NotFoundComprar/>;

  return (
    <div>
      {/* Sección de Producto */}
      <div className="row">
        <div className="medium-6 columns">
          {/* Imagen Principal */}
          <img
            className="thumbnail large-image"
            src={product.imagen_grande}
            alt={product.titulo}
          />

          {/* Miniaturas */}
          <div className="row small-up-4 small-thumbnails">
            {[
              product.imagen_pequeña1,
              product.imagen_pequeña2,
              product.imagen_pequeña3,
              product.imagen_pequeña4,
            ].map((img, index) => (
              <div className="column" key={index}>
                <img
                  className="thumbnail small-image"
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="medium-6 large-5 columns">
          <h3 className="titulo-compra">{product.titulo}</h3>
          <p className="descripcion-compra">{product.descripcion}</p>
          <p className="precio-comprar">
            <strong>Precio: {product.precio}</strong>
          </p>
          <div className="row">
            <div className="small-3 columns">
              <label htmlFor="middle-label" className="middle">
                Cantidad: 
              </label>
            </div>
            <div className="small-9 columns">
              <input
                type="number"
                id="middle-label"
                placeholder="Total"
                min="1"
                defaultValue="0"
                max="100"
              />
            </div>
          </div>
          <button className="button large expanded">Comprar Ahora</button>
        </div>
      </div>
    </div>
  );
};

export default Comprar;
