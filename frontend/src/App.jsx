import React, { useState, useEffect } from "react";
import "foundation-sites/dist/css/foundation.min.css";
import "foundation-sites/dist/js/foundation.min.js";
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";

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
import Inventario from "./components/Inventario.jsx";
import IceCreamCustomizer from "./components/IceCreamCustomizer.jsx";
import RealizarPedido from "./components/RealizarPedido.jsx";

import { useAuth } from "./context/AuthContext";

// Ruta protegida para cualquier usuario autenticado
const PrivateRoute = ({ children }) => {
  const { auth, loading } = useAuth();

  if (loading) return <div>Cargando...</div>;

  if (!auth.isAuthenticated) return <Navigate to="/login" replace />;

  return children;
};

// Ruta protegida solo para administradores
const ProtectedRoute = ({ children }) => {
  const { auth, loading } = useAuth();

  if (loading) return <div>Cargando...</div>;

  if (!auth.isAuthenticated) return <Navigate to="/login" replace />;

  if (auth.user.role !== "admin") return <Navigate to="/" replace />;

  return children;
};

// Componente separado para permitir usar useLocation
function AppContent() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <LoadingScreen />;

  const hideFooterRoutes = ["/admin/inventario", "/admin/usuarios"];
  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <div>
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
        <Route path="/register" element={<Register />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/icecreamcustomizer" element={<IceCreamCustomizer />} />
        <Route path="/realizarPedido" element={<RealizarPedido />} />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

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

        <Route path="*" element={<NotFound />} />
      </Routes>
      {!shouldHideFooter && <Footer />}
    </div>
  );
}

// Exporta App con el BrowserRouter externo
export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
