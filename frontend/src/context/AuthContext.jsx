// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import api from "../components/axios"; // Asegúrate de que esta ruta sea correcta

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    token: null,
  });
  const [loading, setLoading] = useState(true); // <-- Nuevo estado

  const login = (data) => {
    setAuth({
      isAuthenticated: true,
      user: data.user,
      token: data.token,
    });
  };

  const logout = () => {
    setAuth({
      isAuthenticated: false,
      user: null,
      token: null,
    });
  };

  // Verifica si hay sesión activa al montar el componente
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/profile"); // Intenta obtener el perfil
        setAuth({
          isAuthenticated: true,
          user: res.data, // res.data debe incluir { role, username, etc. }
          token: null, // no necesitas guardarlo aquí si usas cookies
        });
      } catch (error) {
        setAuth({
          isAuthenticated: false,
          user: null,
          token: null,
        });
      } finally {
        setLoading(false); // <-- Marcamos que ya terminó la verificación
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
