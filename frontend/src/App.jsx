import React, { useState, useEffect } from "react";
import "foundation-sites/dist/css/foundation.min.css";
import "foundation-sites/dist/js/foundation.min.js";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Headers from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Relevantes from "./components/Relevantes.jsx";
import Productos from "./components/Productos.jsx";
import Nosotros from "./components/Nosotros.jsx";
import Login from "./components/Login.jsx";
import Api from "./components/Api.jsx";
import Comprar from "./components/Comprar.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";
import NotFound from "./components/NotFound.jsx";
import Galeria from "./components/Galeria.jsx";
import Register from "./components/Register.jsx";
import Profile from "./components/Profile.jsx";
import Usuarios from "./components/Usuarios.jsx";
import Inventario from "./components/Inventario.jsx"; // <-- Importa el componente de inventario
import { useAuth } from "./context/AuthContext";

// Componente ProtectedRoute
const ProtectedRoute = ({ children }) => {
  const { auth, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (auth.user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Headers />
                <Relevantes />
              </>
            }
          />
          <Route path="/productos" element={<Productos />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/api" element={<Api />} />
          <Route path="/comprar/:id" element={<Comprar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />

          {/* Rutas protegidas para Admin */}
          <Route
            path="/admin/usuarios"
            element={
              <ProtectedRoute>
                <Usuarios />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/inventario"
            element={
              <ProtectedRoute>
                <Inventario />
              </ProtectedRoute>
            }
          />

          <Route path="/galeria" element={<Galeria />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
