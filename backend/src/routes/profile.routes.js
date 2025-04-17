import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js"; // Verifica que el token esté presente

const router = Router();

// Ruta para obtener el perfil del usuario
router.get("/profile", authRequired, (req, res) => {
  // Aquí puedes acceder a req.user, que es el usuario autenticado y tiene los datos en el token
  const user = req.user; // Este es el usuario que está autenticado y que tiene el token válido
  res.json({
    id: user.id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });
});

export default router;
