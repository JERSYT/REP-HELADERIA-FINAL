// src/pages/Inventario.jsx
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import api from "../components/axios";
import "sweetalert2/dist/sweetalert2.min.css";
import "foundation-sites/dist/css/foundation.min.css";

const Inventario = () => {
  const [ingredientes, setIngredientes] = useState([]);
  const [cargando, setCargando] = useState(false);

  const fetchInventario = async () => {
    setCargando(true);
    try {
      const res = await api.get("/inventario");
      setIngredientes(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error al cargar inventario", error);
      Swal.fire("Error", "No se pudo cargar el inventario", "error");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    fetchInventario();
  }, []);

  const eliminarIngrediente = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: "¿Eliminar ingrediente?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
    });

    if (!isConfirmed) return;

    try {
      await api.delete(`/inventario/${id}`);
      Swal.fire("Eliminado", "Ingrediente eliminado", "success");
      fetchInventario();
    } catch (error) {
      console.error("Error al eliminar", error);
      Swal.fire("Error", "No se pudo eliminar el ingrediente", "error");
    }
  };

  const abrirFormulario = async (ingrediente = {}) => {
    const isEdit = Boolean(ingrediente._id);

    const { value: values } = await Swal.fire({
      title: isEdit ? "Editar Ingrediente" : "Agregar Ingrediente",
      html:
        `<input id="swal-ing" class="swal2-input" placeholder="Ingrediente" value="${
          ingrediente.ingrediente || ""
        }">` +
        `<input id="swal-cant" type="number" class="swal2-input" placeholder="Cantidad" value="${
          ingrediente.cantidad || ""
        }">` +
        `<input id="swal-unid" class="swal2-input" placeholder="Unidad (kg, l, etc.)" value="${
          ingrediente.unidad || ""
        }">`,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const ing = document.getElementById("swal-ing").value;
        const cant = parseFloat(document.getElementById("swal-cant").value);
        const unid = document.getElementById("swal-unid").value;
        if (!ing || !cant || !unid) {
          Swal.showValidationMessage("Todos los campos son obligatorios");
        }
        return { ingrediente: ing, cantidad: cant, unidad: unid };
      },
    });

    if (!values) return;

    try {
      if (isEdit) {
        await api.put(`/inventario/${ingrediente._id}`, values);
        Swal.fire("Actualizado", "Ingrediente actualizado", "success");
      } else {
        await api.post("/inventario", values);
        Swal.fire("Creado", "Ingrediente agregado", "success");
      }
      fetchInventario();
    } catch (error) {
      console.error("Error al guardar", error);
      Swal.fire("Error", "No se pudo guardar el ingrediente", "error");
    }
  };

  return (
    <div className="grid-container">
      <h3>Inventario de Ingredientes</h3>
      <button className="button success" onClick={() => abrirFormulario()}>
        Agregar Ingrediente
      </button>

      {cargando ? (
        <p>Cargando ingredientes...</p>
      ) : (
        <table className="hover stack">
          <thead>
            <tr>
              <th>Ingrediente</th>
              <th>Cantidad</th>
              <th>Unidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ingredientes.length > 0 ? (
              ingredientes.map((i) => (
                <tr key={i._id}>
                  <td>{i.ingrediente}</td>
                  <td>{i.cantidad}</td>
                  <td>{i.unidad}</td>
                  <td>
                    <button
                      className="button warning small"
                      onClick={() => abrirFormulario(i)}
                    >
                      Editar
                    </button>{" "}
                    <button
                      className="button alert small"
                      onClick={() => eliminarIngrediente(i._id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No hay ingredientes registrados</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Inventario;
