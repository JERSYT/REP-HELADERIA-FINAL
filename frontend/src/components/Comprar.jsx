// src/components/Comprar.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import $ from "jquery";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "foundation-sites/dist/css/foundation.min.css";
import "foundation-sites/dist/js/foundation.min.js";
import products from "../js/productos";
import "../styles/Comprar.css";
import NotFoundComprar from "../components/NotFoundComprar.jsx";
import { CarritoContext } from "../context/CarritoContext";

const Comprar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { agregarProducto } = useContext(CarritoContext);
  const product = products.find((p) => p.id === parseInt(id, 10));

  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    $(document).foundation();
    window.scrollTo(0, 0);
  }, []);

  if (!product) return <NotFoundComprar />;

  // Convierte el precio de string ("6.500") a número (6500)
  const precioNumero = Number(product.precio.replace(/\./g, ""));

  const handleAgregarAlCarrito = () => {
    agregarProducto({
      Producto: product.titulo,
      Imagen: product.imagen_grande, // Asegúrate de que esta propiedad sea la correcta
      Complemento: "",
      Tamaño: "Estándar",
      Unidad: "unidad",
      Precio: precioNumero,
      Cantidad: cantidad,
    });
    Swal.fire("Agregado", "Producto agregado al carrito", "success");
    // Opcional: redirigir al carrito
    // navigate("/realizarPedido");
  };

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
              <label htmlFor="cantidad-input" className="middle">
                Cantidad:
              </label>
            </div>
            <div className="small-9 columns">
              <input
                type="number"
                id="cantidad-input"
                min="1"
                max="100"
                value={cantidad}
                onChange={(e) =>
                  setCantidad(Math.max(1, parseInt(e.target.value, 10) || 1))
                }
              />
            </div>
          </div>
          <button
            className="button large expanded"
            onClick={handleAgregarAlCarrito}
          >
            Comprar Ahora
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comprar;
