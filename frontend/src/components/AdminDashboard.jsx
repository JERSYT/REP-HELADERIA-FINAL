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
          navigate("/");
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
    <div style={{ textAlign: "center", maxWidth: "400px" }}>
      <h1 style={{ fontWeight: "900", fontSize: "2rem" }}>Panel del Administrador</h1>
      
      <button
        onClick={() => navigate("/admin/inventario")}
        style={{
          backgroundColor: "#FA52A0",
          color: "#fff",
          border: "none",
          borderRadius: "12px",
          padding: "12px 24px",
          margin: "10px 0",
          fontSize: "1.1rem",
          fontWeight: "600",
          cursor: "pointer",
          width: "100%",
        }}
      >
        Control de Inventario
      </button>

      <button
        onClick={() => navigate("/admin/usuarios")}
        style={{
          backgroundColor: "#A180E1",
          color: "#fff",
          border: "none",
          borderRadius: "12px",
          padding: "12px 24px",
          margin: "10px 0",
          fontSize: "1.1rem",
          fontWeight: "600",
          cursor: "pointer",
          width: "100%",
        }}
      >
        Control de Usuarios
      </button>

      {/* 🔥 Nuevo botón para ir al inicio */}
      <button
        onClick={() => navigate("/")}
        style={{
          backgroundColor: "#4CAF50",
          color: "#fff",
          border: "none",
          borderRadius: "12px",
          padding: "12px 24px",
          marginTop: "20px",
          fontSize: "1.1rem",
          fontWeight: "600",
          cursor: "pointer",
          width: "100%",
        }}
      >
        Ir a la Página Principal
      </button>
    </div>
  );
}

export default AdminDashboard;
