import express from "express";
import morgan from "morgan";
import { connectDB } from "./db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/tasks.routes.js";
import pedidosRoutes from "./routes/pedidos.routes.js";
import inventarioRoutes from "./routes/inventario.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import adminRoutes from "./routes/admin.routes.js";

import cors from "cors";

const app = express();

// Middleware de CORS: configuración adecuada para permitir cookies y acceder desde el frontend
app.use(
  cors({
    origin: "http://localhost:5173", // Cambia según tu puerto del frontend
    credentials: true, // Asegura que las cookies sean enviadas junto con las solicitudes
  })
);

// Middleware para registrar las peticiones (morgan), para depuración
app.use(morgan("dev"));

// Middleware para procesar el cuerpo de las solicitudes (express.json) y manejar cookies (cookie-parser)
app.use(express.json());
app.use(cookieParser());

// Rutas
app.use("/api", authRoutes); // Ruta de autenticación
app.use("/api", taskRoutes); // Ruta de tareas
app.use("/api", pedidosRoutes); // Ruta de pedidos
app.use("/api", inventarioRoutes); // Ruta de inventario
app.use("/api", profileRoutes); // Ruta de inventario
app.use("/api", adminRoutes);

// Conexión a la base de datos
connectDB();

// Inicia el servidor en el puerto 5000
app.listen(5000, () => {
  console.log("Servidor corriendo en http://localhost:5000");
});
