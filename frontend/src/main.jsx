// index.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { AuthProvider } from "./context/AuthContext.jsx";
import { CarritoProvider } from "./context/CarritoContext.jsx"; // 👈 Importa el contexto del carrito

const rootElement = document.getElementById("root");

createRoot(rootElement).render(
  <StrictMode>
    <AuthProvider>
      <CarritoProvider>
        <App />
      </CarritoProvider>
    </AuthProvider>
  </StrictMode>
);
