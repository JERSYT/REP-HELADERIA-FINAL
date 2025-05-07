import { useState, useEffect } from "react";
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminLayout = () => {
  const { auth } = useAuth();
  const [showSidebar, setShowSidebar] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Redirigir a /admin/usuarios si se está en /admin
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
            style={{ marginBottom: "1rem" }}
          >
            Inventario
          </NavLink>
          <NavLink to="/admin/usuarios" className="button warning expanded">
            Usuarios
          </NavLink>
        </aside>
      )}

      <main
        className={`cell ${showSidebar ? "medium-9" : "small-12"}`}
        style={{ padding: "2rem" }}
      >
        {!showSidebar && (
          <button
            className="button primary small"
            onClick={() => setShowSidebar(true)}
            style={{ marginBottom: "1rem" }}
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
