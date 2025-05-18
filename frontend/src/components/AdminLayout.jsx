import { useState, useEffect } from "react";
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminLayout = () => {
  const { auth } = useAuth();
  const [showSidebar, setShowSidebar] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/admin") {
      navigate("/admin/usuarios", { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <div className="grid-x">
      {showSidebar && (
        <aside
  className="cell small-12 medium-3"
  style={{
    padding: "1rem",
    background: "#f3f3f3",
    minHeight: "100vh",
    borderRight: "1px solid #ccc",
    textAlign: "center"
  }}
>
  <button
    className="button alert small"
    onClick={() => setShowSidebar(false)}
    style={{ marginBottom: "1rem" }}
  >
    Ocultar menú
  </button>

  <h4 style={{ color: "black" }}>Admin</h4>
  <p style={{ color: "black" }}>{auth.user?.username}</p>

  <NavLink
    to="/admin/inventario"
    className="button expanded"
    style={{
      backgroundColor: "#FA52A0",
      color: "white",
      fontWeight: "600",
      borderRadius: "12px",
      marginBottom: "1rem",
      padding: "12px 0",
      textAlign: "center"
    }}
  >
    Inventario
  </NavLink>

  <NavLink
    to="/admin/usuarios"
    className="button expanded"
    style={{
      backgroundColor: "#A180E1",
      color: "white",
      fontWeight: "600",
      borderRadius: "12px",
      marginBottom: "1rem",
      padding: "12px 0",
      textAlign: "center"
    }}
  >
    Usuarios
  </NavLink>

  {/* ✅ Nuevo botón visible siempre */}
  <NavLink
    to="/"
    className="button success expanded"
    style={{
      backgroundColor: "#4CAF50",
      color: "white",
      fontWeight: "600",
      borderRadius: "12px",
      marginTop: "1rem",
      padding: "12px 0",
      textAlign: "center"
    }}
  >
    Ir a Inicio
  </NavLink>
</aside>

      )}

      

      <main
  className={`cell ${showSidebar ? "medium-9" : "small-12"}`}
  style={{
    padding: "2rem",
    ...(location.pathname === "/admin" && {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
    }),
  }}
>
        {!showSidebar && (
          <button
            onClick={() => setShowSidebar(true)}
            style={{
              position: "absolute",
              top: "1rem",
              left: "1rem",
              backgroundColor: "#FA52A0",
              color: "#fff",
              border: "none",
              padding: "0.6rem 1rem",
              fontSize: "1rem",
              borderRadius: "12px",
              fontWeight: "bold",
              cursor: "pointer",
              zIndex: 1000,
            }}
          >
            Mostrar menú
          </button>
        )}

        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
