// src/components/Usuarios.jsx
import React, { useEffect, useState } from "react";
import api from "../components/axios"; // tu instancia de Axios
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "foundation-sites/dist/css/foundation.min.css";

const Usuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    setCargando(true);
    try {
      const res = await api.get("/admin/users");
      setUsuarios(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error al obtener usuarios", err);
      Swal.fire("Error", "No se pudieron cargar los usuarios", "error");
      setUsuarios([]);
    } finally {
      setCargando(false);
    }
  };

  const eliminarUsuario = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (!isConfirmed) return;

    try {
      await api.delete(`/admin/users/${id}`);
      fetchUsuarios();
      Swal.fire("Eliminado", "Usuario eliminado correctamente", "success");
    } catch (err) {
      console.error("Error al eliminar usuario", err);
      Swal.fire("Error", "No se pudo eliminar el usuario", "error");
    }
  };

  const abrirFormulario = async (usuario = {}) => {
    const isEdit = Boolean(usuario._id);

    const { value: formValues } = await Swal.fire({
      title: isEdit ? "Editar Usuario" : "Crear Usuario",
      html:
        `<input id="swal-username" class="swal2-input" placeholder="Usuario" value="${
          usuario.username || ""
        }">` +
        `<input id="swal-email" class="swal2-input" placeholder="Correo" value="${
          usuario.email || ""
        }">` +
        (!isEdit
          ? `<input id="swal-password" type="password" class="swal2-input" placeholder="Contraseña">`
          : "") +
        `<select id="swal-role" class="swal2-input">
           <option value="usuario"${
             usuario.role === "usuario" ? " selected" : ""
           }>Usuario</option>
           <option value="admin"${
             usuario.role === "admin" ? " selected" : ""
           }>Admin</option>
         </select>`,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const username = document.getElementById("swal-username").value.trim();
        const email = document.getElementById("swal-email").value.trim();
        const role = document.getElementById("swal-role").value;
        const password = !isEdit
          ? document.getElementById("swal-password").value
          : undefined;
        if (!username || !email || (!isEdit && !password)) {
          Swal.showValidationMessage(
            "Usuario, correo y contraseña son obligatorios"
          );
        }
        return { username, email, role, password };
      },
    });

    if (!formValues) return; // cancelado

    try {
      if (isEdit) {
        await api.put(`/admin/users/${usuario._id}`, formValues);
        Swal.fire("Éxito", "Usuario actualizado correctamente", "success");
      } else {
        await api.post("/admin/users", formValues);
        Swal.fire("Éxito", "Usuario creado correctamente", "success");
      }
      fetchUsuarios();
    } catch (err) {
      console.error("Error al guardar usuario", err);
      Swal.fire("Error", "No se pudo guardar el usuario", "error");
    }
  };

  return (
    <div className="grid-container">
      <h3>Administración de Usuarios</h3>

      <button className="button success" onClick={() => abrirFormulario()}>
        Crear Nuevo Usuario
      </button>

      {cargando ? (
        <p>Cargando usuarios...</p>
      ) : (
        <table className="hover stack">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length > 0 ? (
              usuarios.map((u) => (
                <tr key={u._id}>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>
                    <button
                      className="button warning small"
                      onClick={() => abrirFormulario(u)}
                    >
                      Editar
                    </button>{" "}
                    <button
                      className="button alert small"
                      onClick={() => eliminarUsuario(u._id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No hay usuarios disponibles</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Usuario;
