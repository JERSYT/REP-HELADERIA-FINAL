import { useState, useEffect, useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { BsArrowLeftCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { formatearDinero } from "../funciones";
import "../styles/RealizarPedidos.css";

const RealizarPedido = () => {
  const navigate = useNavigate();
  const { carrito, vaciarCarrito } = useContext(CarritoContext);

  const [datosFormulario, setDatosFormulario] = useState({
    cedula: "",
    nombreCompleto: "",
    direccion: "",
    celular: "",
    correoElectronico: "",
    datosAdicionales: "",
    notas: "",
  });

  const [errores, setErrores] = useState({});

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const calcularTotal = () => {
    return carrito.reduce(
      (acumulador, producto) =>
        acumulador + producto.Precio * producto.Cantidad,
      0
    );
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setDatosFormulario({ ...datosFormulario, [name]: value });
  };

  const validarFormulario = () => {
    let nuevosErrores = {};

    if (!datosFormulario.cedula || datosFormulario.cedula.length < 5) {
      nuevosErrores.cedula = "La cédula o NIT debe tener al menos 5 dígitos.";
    }

    if (!datosFormulario.nombreCompleto.trim()) {
      nuevosErrores.nombreCompleto = "Por favor, ingresa tu nombre completo.";
    }

    if (!datosFormulario.direccion.trim()) {
      nuevosErrores.direccion = "Por favor, ingresa una dirección válida.";
    }

    if (
      !datosFormulario.celular ||
      datosFormulario.celular.length < 7 ||
      datosFormulario.celular.length > 10
    ) {
      nuevosErrores.celular =
        "El número de celular debe tener entre 7 y 10 dígitos.";
    }

    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      !datosFormulario.correoElectronico ||
      !correoRegex.test(datosFormulario.correoElectronico)
    ) {
      nuevosErrores.correoElectronico =
        "Por favor, ingresa un correo electrónico válido.";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      Swal.fire(
        "Pedido realizado",
        "Tu pedido ha sido enviado exitosamente.",
        "success"
      );
      vaciarCarrito();
      navigate("/gracias");
    }
  };

  return (
    <div className="realizarPedido">
        <div className="mural-conos"></div>
      <div className="realizarPedido-contenedor">
        <div className="realizarPedido-contenedor1">
          <div className="realizarPedido-contenedor_titulo">
            <BsArrowLeftCircle
              className="realizarPedido-contenedor_titulo_iconoVolver"
              onClick={() => navigate(-1)}
            />
            <h2>Detalles de compra</h2>
          </div>
          <form
            className="realizarPedido-contenedor_formulario"
            onSubmit={manejarEnvio}
          >
            <div>
              <label>Cédula o NIT sin dígito de verificación</label>
              <input
                type="number"
                name="cedula"
                placeholder="Cédula o NIT sin dígito de verificación"
                min="0"
                className="formulario-input"
                value={datosFormulario.cedula}
                onChange={manejarCambio}
              />
              {errores.cedula && <p className="error">{errores.cedula}</p>}
            </div>
            <div>
              <label>Nombres y Apellidos completos</label>
              <input
                name="nombreCompleto"
                placeholder="Ingrese su Nombre(s) y Apellido(s) completos"
                value={datosFormulario.nombreCompleto}
                onChange={manejarCambio}
              />
              {errores.nombreCompleto && (
                <p className="error">{errores.nombreCompleto}</p>
              )}
            </div>
            <div>
              <label>Dirección</label>
              <input
                name="direccion"
                placeholder="Ingrese su Dirección con nomenclatura completa"
                value={datosFormulario.direccion}
                onChange={manejarCambio}
              />
              {errores.direccion && (
                <p className="error">{errores.direccion}</p>
              )}
            </div>
            <div>
              <label>No. Celular</label>
              <input
                type="number"
                name="celular"
                placeholder="Ingresa tu Número de Celular"
                min="0"
                value={datosFormulario.celular}
                onChange={manejarCambio}
              />
              {errores.celular && <p className="error">{errores.celular}</p>}
            </div>
            <div>
              <label>Dirección de correo electrónico</label>
              <input
                name="correoElectronico"
                placeholder="Ingrese su Dirección de Correo electrónico"
                type="email"
                value={datosFormulario.correoElectronico}
                onChange={manejarCambio}
              />
              {errores.correoElectronico && (
                <p className="error">{errores.correoElectronico}</p>
              )}
            </div>
            <div>
              <label>Datos adicionales de tu dirección (opcional)</label>
              <input
                name="datosAdicionales"
                placeholder="Habitación, referencias, etc. (Opcional)"
                value={datosFormulario.datosAdicionales}
                onChange={manejarCambio}
              />
            </div>
            <div>
              <label>Notas del pedido (opcional)</label>
              <textarea
                name="notas"
                placeholder="Notas sobre tu pedido, por ejemplo, notas especiales para la entrega"
                value={datosFormulario.notas}
                onChange={manejarCambio}
              />
            </div>
            <button type="submit">Realizar compra</button>
          </form>
        </div>

        <div className="realizarPedido-carritoContenedor">
          <h2 className="realizarPedido-carritoTitulo">Resumen de tu pedido</h2>
          <div className="realizarPedido-carritoContenido">
            <table>
              <tbody className="realizarPedido-carritoTbody">
                <tr className="navegacion-carritoEncabezado">
                  <td className="primera-colCarrito" colSpan="2">
                    Producto
                  </td>
                  <td className="cantidad">Cantidad</td>
                  <td className="subtotal">Subtotal</td>
                </tr>
                {carrito.length > 0 ? (
                  carrito.map((producto, index) => {
                    const {
                      Producto,
                      Imagen,
                      Sabores,
                      Toppings,
                      Precio,
                      Cantidad,
                    } = producto;
                    return (
                      <tr className="navegacion-carritoProducto" key={index}>
                        <td>
                          <img src={Imagen} alt={Producto} width="60" />
                        </td>
                        <td>
                          <p>
                            {Producto} {Sabores ? `(${Sabores})` : ""}{" "}
                            {Toppings ? `+ ${Toppings}` : ""}
                          </p>
                          <p>{formatearDinero(Precio, "COP")}</p>
                        </td>
                        <td className="realizarPedido-cantidad">{Cantidad}</td>
                        <td className="subtotal">
                          {formatearDinero(Precio * Cantidad, "COP")}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="4">No hay productos en el carrito</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {carrito.length > 0 && (
            <div className="realizarPedido-carritoTotal">
              <p className="totalLabel">Total A Pagar:</p>
              <p className="totalLabel">{formatearDinero(calcularTotal(), "COP")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RealizarPedido;
