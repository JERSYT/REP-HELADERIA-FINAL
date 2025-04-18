// routes/inventario.routes.js
import { Router } from "express";
import {
  crearIngrediente,
  obtenerInventario,
  obtenerIngredientePorId,
  actualizarIngrediente,
  eliminarIngrediente,
} from "../controllers/inventario.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { inventarioSchema } from "../schema/inventario.schema.js";
import { authRequired } from "../middlewares/validateToken.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = Router();

// Obtener todos los ingredientes
router.get("/inventario", authRequired, isAdmin, obtenerInventario);

// Obtener un ingrediente por ID
router.get("/inventario/:id", authRequired, isAdmin, obtenerIngredientePorId);

// Crear un nuevo ingrediente
router.post(
  "/inventario",
  authRequired,
  isAdmin,
  validateSchema(inventarioSchema),
  crearIngrediente
);

// Actualizar un ingrediente existente
router.put(
  "/inventario/:id",
  authRequired,
  isAdmin,
  validateSchema(inventarioSchema),
  actualizarIngrediente
);

// Eliminar un ingrediente
router.delete("/inventario/:id", authRequired, isAdmin, eliminarIngrediente);

export default router;
