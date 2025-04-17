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

  // 🔄 Verifica si hay sesión activa al montar el componente
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/profile"); // Intenta obtener el perfil
        setAuth({
          isAuthenticated: true,
          user: res.data,
          token: null, // no necesitas guardarlo aquí si usas cookies
        });
      } catch (error) {
        setAuth({
          isAuthenticated: false,
          user: null,
          token: null,
        });
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
