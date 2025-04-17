// index.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// ✅ Importa el AuthProvider correctamente
import { AuthProvider } from "./context/AuthContext.jsx";

const rootElement = document.getElementById("root");

createRoot(rootElement).render(
  <StrictMode>
    {/* ✅ Envolvemos la app en el proveedor de autenticación */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
