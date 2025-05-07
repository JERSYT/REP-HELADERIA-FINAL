import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import "../styles/IceCreamCustomizer.css";
import { CarritoContext } from "../context/CarritoContext";
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
  const { agregarProducto } = useContext(CarritoContext);

  const Sabores = [
    { id: 1, nombre: "Chocolate", imagen: Hchocolate, precio: 2000, color: "#5C2D0D", layerHeight: 60 },
    { id: 2, nombre: "Vainilla", imagen: Hvainilla, precio: 2000, color: "#F3E5AB", layerHeight: 60 },
    { id: 3, nombre: "Fresa", imagen: Hfresa, precio: 2000, color: "#FC5A8D", layerHeight: 60 },
    { id: 4, nombre: "Arequipe", imagen: Harequipe, precio: 2000, color: "#C08A53", layerHeight: 60 },
  ];

  const Toppings = [
    { id: 1, nombre: "Chispas de Chocolate", imagen: Chipschoc, precio: 1000, position: { angle: 0, radius: 30 } },
    { id: 2, nombre: "Gomitas", imagen: Gomitas, precio: 1000, position: { angle: 180, radius: 30 } },
    { id: 3, nombre: "Brownies", imagen: Brownies, precio: 1000, position: { angle: 90, radius: 30 } },
    { id: 4, nombre: "Fresas", imagen: Fresas, precio: 1000, position: { angle: 270, radius: 30 } },
    { id: 5, nombre: "Marshmellow", imagen: Marshmellow, precio: 1000, position: { angle: 45, radius: 40 } },
    { id: 6, nombre: "Gusanitos", imagen: Gusanitos, precio: 1000, position: { angle: 135, radius: 40 } },
    { id: 7, nombre: "Almendras", imagen: Almendras, precio: 1000, position: { angle: 225, radius: 40 } },
    { id: 8, nombre: "Arandanos", imagen: Arandanos, precio: 1500, position: { angle: 315, radius: 40 } },
  ];

  const Presentaciones = [
    { id: 1, nombre: "Canasta", imagen: Galleta },
  ];

  // Estados
  const [saborSeleccionado, setSaboresSeleccionados] = useState([]);
  const [toppingSeleccionados, setToppingSeleccionados] = useState([]);
  const [presentacionSeleccionada, setPresentacionSeleccionada] = useState(
    Presentaciones[0]
  );
  const [saboresCompletos, setSaboresCompletos] = useState(false);
  const [toppingsCompletos, setToppingsCompletos] = useState(false);

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
      setSaboresCompletos(false);
    } else if (saborSeleccionado.length < 3) {
      // Si no está seleccionado y no hemos alcanzado el límite, lo añadimos
      const nuevosSabores = [...saborSeleccionado, sabor];
      setSaboresSeleccionados(nuevosSabores);
      setSaboresCompletos(nuevosSabores.length === 3);
    }
  };

  const toggleTopping = (topping) => {
    if (toppingSeleccionados.some((t) => t.id === topping.id)) {
      // Si ya está seleccionado, lo quitamos
      setToppingSeleccionados(
        toppingSeleccionados.filter((t) => t.id !== topping.id)
      );
      setToppingsCompletos(false);
    } else if (toppingSeleccionados.length < 3) {
      // Si no está seleccionado y no hemos alcanzado el límite, lo añadimos
      const nuevosToppings = [...toppingSeleccionados, topping];
      setToppingSeleccionados(nuevosToppings);
      setToppingsCompletos(nuevosToppings.length === 3);
    }
  };

  const resetSeleccion = () => {
    setSaboresSeleccionados([]);
    setToppingSeleccionados([]);
    setSaboresCompletos(false);
    setToppingsCompletos(false);
  };

  // Función para agregar helado personalizado al carrito con IDs únicos
  const handleGuardar = () => {
    if (saboresCompletos && toppingsCompletos) {
      const productoPersonalizado = {
        Personalizado: true,
        Sabores: saborSeleccionado.map((s, index) => ({ ...s, id: index + 1000, nombre: s.nombre })),
        Toppings: toppingSeleccionados.map((t, index) => ({ ...t, id: index + 2000, nombre: t.nombre })),
        Cantidad: 1,
        Precio: calcularTotal(),
        Presentacion: presentacionSeleccionada.nombre,
        Imagen: Galleta, // Imagen fija para el carrito
        // Generar un id para el producto personalizado mismo, puede ser combinación o único
        id: Date.now(), // id único basado en timestamp para evitar colisiones
      };
      agregarProducto(productoPersonalizado);
      resetSeleccion();
    }
  };

  // Renderizado visual del helado

  const renderHeladoVisual = () => {
    return (
      <div className="helado-visual-container">
        {/* Presentación (cono o vaso) */}
        <img
          src={presentacionSeleccionada.imagen}
          alt="presentacion"
          className="presentacion-imagen"
        />

        {/* Contenedor de sabores en pirámide */}
        <div className="sabores-piramide">
          {/* Grupo Bola Inferior + Toppings */}
          {saborSeleccionado[0] && (
            <div className="bola-container" style={{ zIndex: 3 }}>
              <motion.div
                className="sabor-bola bola-inferior"
                style={{
                  backgroundImage: `url(${saborSeleccionado[0].imagen})`,
                  backgroundColor: saborSeleccionado[0].color
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
              {/* Toppings para esta bola */}
              {toppingSeleccionados[0] && (
                <motion.img
                  src={toppingSeleccionados[0].imagen}
                  alt={toppingSeleccionados[0].nombre}
                  className="topping-item topping-inferior"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                />
              )}
            </div>
          )}

          {/* Grupo Bola Superior Izquierda + Toppings */}
          {saborSeleccionado[1] && (
            <div className="bola-container" style={{ zIndex: 2 }}>
              <motion.div
                className="sabor-bola bola-superior-izquierda"
                style={{
                  backgroundImage: `url(${saborSeleccionado[1].imagen})`,
                  backgroundColor: saborSeleccionado[1].color
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              />
              {/* Toppings para esta bola */}
              {toppingSeleccionados[1] && (
                <motion.img
                  src={toppingSeleccionados[1].imagen}
                  alt={toppingSeleccionados[1].nombre}
                  className="topping-item topping-izquierda"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                />
              )}
            </div>
          )}

          {/* Grupo Bola Superior Derecha + Toppings */}
          {saborSeleccionado[2] && (
            <div className="bola-container" style={{ zIndex: 1 }}>
              <motion.div
                className="sabor-bola bola-superior-derecha"
                style={{
                  backgroundImage: `url(${saborSeleccionado[2].imagen})`,
                  backgroundColor: saborSeleccionado[2].color
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              />
              {/* Toppings para esta bola */}
              {toppingSeleccionados[2] && (
                <motion.img
                  src={toppingSeleccionados[2].imagen}
                  alt={toppingSeleccionados[2].nombre}
                  className="topping-item topping-derecha"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                />
              )}
            </div>
          )}
        </div>
      </div>
    );
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
              !saboresCompletos && saborSeleccionado.length > 0 ? "incompleto" : ""
            }`}
          >
            <h3 className="seleccion-titulo">
              <span className="numero-paso"> 1 </span> Selecciona el sabor{" "}
              <span className="max-indicador"> (3 Sabores*)</span>
            </h3>

            {/* Mensaje de validación */}
            {!saboresCompletos && (
              <div className="mensaje-validacion">
                {saborSeleccionado.length < 3 
                  ? `Selecciona ${3 - saborSeleccionado.length} más`
                  : "¡Perfecto! 3 sabores seleccionados"}
              </div>
            )}

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
              !toppingsCompletos && toppingSeleccionados.length > 0 ? "incompleto" : ""
            }`}
          >
            <h3 className="seleccion-titulo">
              <span className="numero-paso"> 2 </span> Selecciona toppings{" "}
              <span className="max-indicador"> (3 Toppings*)</span>
            </h3>

            {/* Mensaje de validación */}
            {!toppingsCompletos && (
              <div className="mensaje-validacion">
                {toppingSeleccionados.length < 2 
                  ? `Selecciona ${2 - toppingSeleccionados.length} más`
                  : "¡Perfecto! 2 toppings seleccionados"}
              </div>
            )}

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
              <span className="numero-paso"> 3 </span> 
              Presentación
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
              <span>{toppingSeleccionados.length}/3 toppings</span>
            </div>
          </div>
          {/* Presentación (Cono o Vaso) */}
          <div className="ice-cream-previa">
            {renderHeladoVisual()}
          </div>
            
          <div className="previa-footer">
          <button onClick={resetSeleccion} className="accion-btn reset-btn">
            Reiniciar
          </button>
          <button 
            onClick={handleGuardar}
            className={`accion-btn guardar-btn ${
              !(saboresCompletos && toppingsCompletos) ? "disabled" : ""
            }`}
            disabled={!(saboresCompletos && toppingsCompletos)}
          >
            Agregar al carrito
          </button>

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

