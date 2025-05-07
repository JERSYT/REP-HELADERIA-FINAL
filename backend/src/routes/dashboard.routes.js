// routes/dashboard.routes.js
import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { adminDashboard } from "../controllers/dashboard.controller.js";

const router = Router();

// Ruta protegida: solo admins pueden acceder
router.get("/admin", authRequired, isAdmin, adminDashboard);

export default router;
