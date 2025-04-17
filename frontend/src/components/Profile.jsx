import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../components/axios";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";


const Profile = () => {
  const [profile, setProfile] = useState(null);
  const { logout } = useAuth(); // Traemos la función logout del contexto
  const navigate = useNavigate(); // Usamos el hook para redirigir

  // Fetch del perfil
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/profile");
        console.log(response.data); // Para depurar la respuesta
        setProfile(response.data); // Guardamos los datos del perfil
      } catch (error) {
        console.error("Error al obtener el perfil:", error);
      }
    };

    fetchProfile();
  }, []);

  // Cargar cuando no hay perfil
  if (!profile) return <div>Cargando...</div>;

  // Función para cerrar sesión
  const handleLogout = () => {
    logout(); // Llamamos a logout del contexto
    navigate("/login"); // Redirigimos a la página de login
  };

  return (
    <div>
      <h1>Perfil de Usuario</h1>
      <p><strong>Username:</strong> {profile.username}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>ID:</strong> {profile.id}</p>
      <p><strong>Fecha de Creación:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>
      <p><strong>Fecha de Actualización:</strong> {new Date(profile.updatedAt).toLocaleDateString()}</p>
      {/* Agrega más campos si es necesario */}
      
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default Profile;
