import React, { useState } from "react";
import "../styles/IceCreamCustomizer.css";
import Hchocolate from "../img/Personalizado/chocolate.webp";
import Hvainilla from "../img/Personalizado/vainilla.webp";
import Hfresa from "../img/Personalizado/fresa.webp";
import Harequipe from "../img/Personalizado/arequipe.webp";
import Gomitas from "../img/Personalizado/gomitas.webp";
import Chipschoc from "../img/Personalizado/chipsChocolate.webp";
import Brownies from "../img/Personalizado/brownies.webp";
import Fresas from "../img/Personalizado/fresas.webp";
import Marshmellow from "../img/Personalizado/marshmellow.webp";
import Gusanitos from "../img/Personalizado/gusanitos.webp";
import Almendras from "../img/Personalizado/almendras.webp";
import Arandanos from "../img/Personalizado/arandanos.webp";
import Galleta from "../img/Personalizado/vasogalleta.webp";
import Vaso from "../img/Personalizado/vaso.webp";

const IceCreamCustomizer = () => {
  const Sabores = [
    { id: 1, nombre: "Chocolate", imagen: Hchocolate, precio: 2000 },
    { id: 2, nombre: "Vainilla", imagen: Hvainilla, precio: 2000 },
    { id: 3, nombre: "Fresa", imagen: Hfresa, precio: 2000 },
    { id: 4, nombre: "Arequipe", imagen: Harequipe, precio: 2000 },
  ];

  const Toppings = [
    { id: 1, nombre: "Chispas de Chocolate", imagen: Chipschoc, precio: 1000 },
    { id: 2, nombre: "Gomitas", imagen: Gomitas, precio: 1000 },
    { id: 3, nombre: "Brownies", imagen: Brownies, precio: 1000 },
    { id: 4, nombre: "Fresas", imagen: Fresas, precio: 1000 },
    { id: 5, nombre: "Marshmellow", imagen: Marshmellow, precio: 1000 },
    { id: 6, nombre: "Gusanitos", imagen: Gusanitos, precio: 1000 },
    { id: 7, nombre: "Almendras", imagen: Almendras, precio: 1000 },
    { id: 8, nombre: "Arandanos", imagen: Arandanos, precio: 1500 },
  ];

  const Presentaciones = [
    { id: 1, nombre: "Cono", imagen: Galleta },
    { id: 2, nombre: "Vaso", imagen: Vaso },
  ];

  // Estados
  const [saborSeleccionado, setSaboresSeleccionados] = useState([]);
  const [toppingSeleccionados, setToppingSeleccionados] = useState([]);
  const [presentacionSeleccionada, setPresentacionSeleccionada] = useState(
    Presentaciones[0]
  );
  const [maxSaboresAlcanzado, setMaxSaboresAlcanzado] = useState(false);
  const [maxToppingsAlcanzado, setMaxToppingsAlcanzado] = useState(false);

  // Calcular precio total
  const calcularTotal = () => {
    const precioSabores = saborSeleccionado.reduce(
      (sum, sabor) => sum + sabor.precio,
      0
    );
    const precioToppings = toppingSeleccionados.reduce(
      (sum, topping) => sum + topping.precio,
      0
    );
    return precioSabores + precioToppings;
  };

  // Lógica interactiva
  const toggleSabor = (sabor) => {
    if (saborSeleccionado.some((f) => f.id === sabor.id)) {
      // Si ya está seleccionado, lo quitamos
      setSaboresSeleccionados(
        saborSeleccionado.filter((f) => f.id !== sabor.id)
      );
      setMaxSaboresAlcanzado(false);
    } else if (saborSeleccionado.length < 3) {
      // Si no está seleccionado y no hemos alcanzado el límite, lo añadimos
      setSaboresSeleccionados([...saborSeleccionado, sabor]);
      setMaxSaboresAlcanzado(saborSeleccionado.length + 1 >= 3);
    }
  };

  const toggleTopping = (topping) => {
    if (toppingSeleccionados.some((t) => t.id === topping.id)) {
      // Si ya está seleccionado, lo quitamos
      setToppingSeleccionados(
        toppingSeleccionados.filter((t) => t.id !== topping.id)
      );
      setMaxToppingsAlcanzado(false);
    } else if (toppingSeleccionados.length < 5) {
      // Si no está seleccionado y no hemos alcanzado el límite, lo añadimos
      setToppingSeleccionados([...toppingSeleccionados, topping]);
      setMaxToppingsAlcanzado(toppingSeleccionados.length + 1 >= 5);
    }
  };

  const resetSeleccion = () => {
    setSaboresSeleccionados([]);
    setToppingSeleccionados([]);
    setMaxSaboresAlcanzado(false);
    setMaxToppingsAlcanzado(false);
  };

  return (
    <div className="ice-cream-customizer">
      <div className="customizer-header">
        <h1 className="main-titulo">🍦 PERSONALIZA TU HELADO</h1>
        <p className="subtitulo">Crea tu combinación perfecta</p>
      </div>

      <div className="customizer-grid">
        {/* Opciones de personalización */}
        <div className="panel-seleccion">
          {/* Selector de Sabores */}
          <div
            className={`grupo-selector ${
              maxSaboresAlcanzado ? "max-limit-alert" : ""
            }`}
          >
            <h3 className="seleccion-titulo">
              <span className="numero-paso"> 1 </span> Selecciona el sabor{" "}
              <span className="max-indicador"> (Máx. 3)</span>
            </h3>

            <div className="items-grid">
              {Sabores.map((sabor) => (
                <div
                  key={sabor.id}
                  onClick={() => toggleSabor(sabor)}
                  className={`seleccion-item ${
                    saborSeleccionado.some((f) => f.id === sabor.id)
                      ? "selected"
                      : ""
                  }`}
                >
                  <img src={sabor.imagen} alt={sabor.nombre} />
                  <span className="item-nombre">{sabor.nombre}</span>
                  <span className="item-precio">${sabor.precio}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Selector de Toppings */}
          <div
            className={`grupo-selector ${
              maxToppingsAlcanzado ? "max-limit-alert" : ""
            }`}
          >
            <h3 className="seleccion-titulo">
              <span className="numero-paso"> 2 </span> Selecciona toppings{" "}
              <span className="max-indicador"> (Máx. 5)</span>
            </h3>

            <div className="items-grid">
              {Toppings.map((topping) => (
                <div
                  key={topping.id}
                  onClick={() => toggleTopping(topping)}
                  className={`seleccion-item ${
                    toppingSeleccionados.some((f) => f.id === topping.id)
                      ? "selected"
                      : ""
                  }`}
                >
                  <img src={topping.imagen} alt={topping.nombre} />
                  <span className="item-nombre">{topping.nombre}</span>
                  <span className="item-precio">${topping.precio}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Selector de Presentación */}
          <div className="grupo-selector">
            <h3 className="seleccion-titulo">
              <span className="numero-paso"> 3 </span> Selecciona la
              presentación
            </h3>

            <div className="presentaciones-opciones">
              {Presentaciones.map((presentacion) => (
                <div
                  key={presentacion.id}
                  onClick={() => setPresentacionSeleccionada(presentacion)}
                  className={`presentacion-item ${
                    presentacionSeleccionada.id === presentacion.id
                      ? "selected"
                      : ""
                  }`}
                >
                  <img src={presentacion.imagen} alt={presentacion.nombre} />
                  <span className="item-nombre">{presentacion.nombre}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vista previa en tiempo real */}
        <div className="previa-panel">
          <div className="previa-header">
            <h3>Vista previa de tu helado</h3>
            <div className="seleccion-cuenta">
              <span>{saborSeleccionado.length}/3 sabores</span>
              <span>{toppingSeleccionados.length}/5 toppings</span>
            </div>
          </div>
          {/* Presentación (Cono o Vaso) */}
          <div className="ice-cream-previa">
            <div className="ice-cream-base">
              <img
                src={presentacionSeleccionada.imagen}
                alt="presentacion"
                className="presentacion-imagen"
              />

              {/* Capas de sabores - organizacion proporcional*/}
              <div className="sabores-stack">
                {saborSeleccionado.map((sabor, index) => (
                  <div
                    key={index}
                    className="sabor-layer"
                    style={{
                      backgroundImage: `url(${sabor.imagen})`,
                      zIndex: index,
                      height: `${105 / saborSeleccionado.length}%`,
                      bottom: `${(index * 100) / saborSeleccionado.length}%`,
                      borderRadius: "100%",
                    }}
                  />
                ))}
              </div>
              {/* distribución de toppings*/}
              <div className="toppings-layer">
                {toppingSeleccionados.map((topping, index) => {
                  const angulo = (index * 360) / toppingSeleccionados.length;
                  const radio = toppingSeleccionados.length > 3 ? 40 : 30;
                  const altura =
                    toppingSeleccionados.length > 3 ? "30%" : "40%";
                  return (
                    <img
                      key={index}
                      src={topping.imagen}
                      alt={topping.nombre}
                      className={`topping-item ${
                        toppingSeleccionados.length >= 5 ? "max-limit" : ""
                      }`}
                      style={{
                        position: "absolute",
                        top: altura,
                        left: "50%",
                        transform: `
                                                translate(-50%, -50%)
                                                rotate(${angulo}deg)
                                                translate(0, -${radio}px)
                                                rotate(${-angulo}deg)
                                                `,
                        width:
                          toppingSeleccionados.length > 3 ? "30px" : "35px",
                        height:
                          toppingSeleccionados.length > 3 ? "30px" : "35px",
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="previa-footer">
            <button onClick={resetSeleccion} className="accion-btn reset-btn">
              Reiniciar
            </button>
            <button className="accion-btn guardar-btn">Guardar Helado</button>

            <div className="total-container">
              <span className="total-label">Total:</span>
              <span className="total-precio">
                ${calcularTotal().toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default IceCreamCustomizer;
