import { Router } from "express";
import { login, register, logout, profile } from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../schema/auth.schema.js";

const router = Router();

// Ruta de registro (publica)
router.post("/register", validateSchema(registerSchema), register);

// Ruta de login (publica)
router.post("/login", validateSchema(loginSchema), login);

// Ruta de logout (pública)
router.post("/logout", logout);

// Ruta de perfil (protegida)
router.get("/profile", authRequired, profile);

export default router;
