import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/profile", {
          credentials: "include",
        });
        const data = await res.json();
        if (data.role === "admin") {
          setIsAdmin(true);
        } else {
          navigate("/"); // Redirige si no es admin
        }
      } catch (error) {
        console.error("Error:", error);
        navigate("/");
      }
    };

    checkAdmin();
  }, []);

  if (!isAdmin) return <p>Cargando...</p>;

  return (
    <div>
      <h1>Panel del Administrador</h1>
      <button onClick={() => navigate("/admin/inventario")}>
        Control de Inventario
      </button>
      <button onClick={() => navigate("/admin/usuarios")}>
        Control de Usuarios
      </button>
    </div>
  );
}

export default AdminDashboard;
