import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../components/axios";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    username: "",
    email: "",
    password: ""
  });

  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/profile");
        setProfile(response.data);
        setEditedProfile({
          username: response.data.username,
          email: response.data.email,
          password: "", // Dejamos la contraseña vacía inicialmente
        });
      } catch (error) {
        console.error("Error al obtener el perfil:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleEditChange = (e) => {
    setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    console.log("Guardando perfil...");
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
    // Validación de email
    if (!emailRegex.test(editedProfile.email)) {
      alert("Por favor, ingrese un correo electrónico válido.");
      return;
    }
  
    // Validación de contraseña si se ha ingresado
    if (editedProfile.password && !passwordRegex.test(editedProfile.password)) {
      alert("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.");
      return;
    }
  
    try {
      const updatedProfile = { ...editedProfile };
  
      // Si no se cambió la contraseña, la eliminamos
      if (!updatedProfile.password) {
        delete updatedProfile.password;
      }
  
      const response = await api.put("/profile", updatedProfile);
      console.log("Respuesta del servidor:", response);
  
      setProfile({ ...profile, ...updatedProfile });
      console.log("Perfil actualizado:", { ...profile, ...updatedProfile });
  
      setIsEditing(false);
      window.location.reload();
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
    }
  };
  

  if (!profile) return <div>Cargando...</div>;

  return (
    <div className="profile-container">
      <h1>Perfil de Usuario</h1>

      {isEditing ? (
        <>
          <label>Username:</label>
          <input
            name="username"
            value={editedProfile.username}
            onChange={handleEditChange}
          />
          <label>Email:</label>
          <input
            name="email"
            value={editedProfile.email}
            onChange={handleEditChange}
          />
          <label>Contraseña:</label>
          <input
            name="password"
            type="password"
            value={editedProfile.password}
            onChange={handleEditChange}
            placeholder="Ingrese nueva contraseña (dejar vacío para no cambiar)"
          />
          <div className="button-group">
            <button onClick={handleSave}>Guardar</button>
            <button onClick={() => setIsEditing(false)}>Cancelar</button>
          </div>
        </>
      ) : (
        <>
          <p><strong>Username:</strong> {profile.username}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <button onClick={() => setIsEditing(true)}>Editar perfil</button>
        </>
      )}

      <p><strong>ID:</strong> {profile.id}</p>
      <p><strong>Fecha de Creación:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>
      <p><strong>Fecha de Actualización:</strong> {new Date(profile.updatedAt).toLocaleDateString()}</p>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default Profile;
