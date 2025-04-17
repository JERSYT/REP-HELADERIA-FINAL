import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/admin.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = Router();

router.get("/admin/users", authRequired, isAdmin, getAllUsers);
router.get("/admin/users/:id", authRequired, isAdmin, getUserById);
router.put("/admin/users/:id", authRequired, isAdmin, updateUser);
router.delete("/admin/users/:id", authRequired, isAdmin, deleteUser);

export default router;
