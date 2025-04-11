import React, { useState, useEffect } from "react";
import "foundation-sites/dist/css/foundation.min.css";
import "foundation-sites/dist/js/foundation.min.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Headers from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Relevantes from "./components/Relevantes.jsx";
import Productos from "./components/Productos.jsx";
import Nosotros from "./components/Nosotros.jsx";
import Login from "./components/Login.jsx"
import Api from "./components/Api.jsx";
import Comprar from "./components/Comprar.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";
import NotFound from "./components/NotFound.jsx";
import Galeria from "./components/Galeria.jsx";
import Register from "./components/Register.jsx";

function App() {
  const [isLoading, setIsLoading] = useState(true); // Estado para la pantalla de carga

  useEffect(() => {
    // Simula un tiempo de carga o la carga de datos reales
    const timer = setTimeout(() => {
      setIsLoading(false); // Desactiva la pantalla de carga después de 2 segundos (ajustable)
    }, 1500);

    return () => clearTimeout(timer); // Limpia el temporizador
  }, []);

  if (isLoading) {
    // Si isLoading es verdadero, mostramos la pantalla de carga
    return <LoadingScreen />;
  }

  // Si isLoading es falso, cargamos la aplicación normal
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Headers />
                <Relevantes />
              </>
            }
          />
          <Route path="/productos" element={<Productos />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/api" element={<Api />} />
          <Route path="/comprar/:id" element={<Comprar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/galeria" element={<Galeria />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
