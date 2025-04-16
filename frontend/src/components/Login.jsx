import "foundation-sites/dist/css/foundation.min.css";
import "foundation-sites/dist/js/foundation.min.js";
import "../styles/Login.css";
import $ from "jquery";
import { useEffect, useState } from "react";
import Logo from "../img/heladeria.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// ✅ Importar el hook de contexto
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ Obtener la función login desde el contexto

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    $(document).foundation();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/login", // Asegúrate de que la URL sea la correcta
        { email, password },
        { withCredentials: true } // Si estás usando cookies, con esto se incluyen
      );

      console.log("Login correcto:", res.data);

      // ✅ Guardar el usuario y el token en el contexto global
      login(res.data); // Usamos la función login del contexto

      navigate("/"); // Redirigir al home o dashboard
    } catch (err) {
      console.error("Error en login:", err);
      setError(err.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div className="sign-in-form">
          <h4 className="text-center">Iniciar sesión</h4>

          <div className="logo-container-login">
            <img src={Logo} alt="Logo Heladería" className="logo-img" />
          </div>

          {error && (
            <div className="callout alert" data-closable>
              {error}
              <button
                className="close-button"
                aria-label="Dismiss alert"
                type="button"
                data-close
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          )}

          <label htmlFor="sign-in-form-email">Correo</label>
          <input
            type="email"
            className={`sign-in-form-username ${error ? "is-invalid-input" : ""}`}
            id="sign-in-form-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="sign-in-form-password">Contraseña</label>
          <input
            type="password"
            className={`sign-in-form-password ${error ? "is-invalid-input" : ""}`}
            id="sign-in-form-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="button expanded">
            Ingresar
          </button>

          <div className="login-registrarse text-center">
            ¿No tienes una cuenta?{" "}
            <a className="link" href="/register">
              Regístrate aquí
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
