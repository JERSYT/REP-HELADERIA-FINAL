import { Router } from "express";
import User from "../models/user.model.js"; // Importa el modelo de usuario
import { authRequired } from "../middlewares/validateToken.js"; // Middleware para verificar el token

const router = Router();

// Ruta para obtener el perfil del usuario
router.get("/profile", authRequired, async (req, res) => {
  try {
    // Buscar el usuario en la base de datos utilizando el ID de req.user.id
    const user = await User.findById(req.user.id); // Suponiendo que el token contiene el ID del usuario

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Responder con los datos del perfil
    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    console.error("Error al obtener el perfil:", error);
    res.status(500).json({ message: "Error al obtener el perfil" });
  }
});

// Ruta para actualizar el perfil del usuario
router.put("/profile", authRequired, async (req, res) => {
  const { username, email, password } = req.body;
  const userId = req.user.id; // Obtener el ID del usuario desde el token

  try {
    // Buscar el usuario en la base de datos
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Actualizar los campos del usuario
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) {
      // Asegúrate de encriptar la contraseña si se modifica
      user.password = password; // Puedes usar bcrypt aquí si es necesario
    }

    // Guardar los cambios en la base de datos
    await user.save();

    // Responder con los datos actualizados
    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    console.error("Error al actualizar el perfil:", error);
    res.status(500).json({ message: "Error al actualizar el perfil" });
  }
});

export default router;
