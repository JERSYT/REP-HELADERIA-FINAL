import "foundation-sites/dist/css/foundation.min.css";
import "foundation-sites/dist/js/foundation.min.js";
import "../styles/Login.css";
import $ from "jquery";
import { useEffect, useState } from "react";
import Logo from "../img/heladeria.png";
import api from "./axios"; // Asegúrate que la ruta esté bien
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    $(document).foundation();
  }, []);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!usernameRegex.test(form.username)) {
      newErrors.username =
        "El usuario debe tener entre 3 y 16 caracteres, solo letras, números y guiones bajos.";
    }
    if (!emailRegex.test(form.email)) {
      newErrors.email = "Ingrese un correo electrónico válido.";
    }
    if (!passwordRegex.test(form.password)) {
      newErrors.password =
        "La contraseña debe tener al menos 8 caracteres y contener al menos una letra y un número.";
    }
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    if (validateForm()) {
      try {
        await api.post(
          "/register",
          {
            username: form.username,
            email: form.email,
            password: form.password,
          },
          { withCredentials: true }
        );

        navigate("/login"); // Redirige al login después del registro
      } catch (err) {
        setServerError(err.response?.data?.message || "Error al registrarse");
      }
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="sign-in-form">
        <h4 className="text-center">Registro</h4>
        <div className="logo-container-login">
          <img src={Logo} alt="Logo Heladería" className="logo-img" />
        </div>

        {serverError && (
          <p className="error-message callout alert">{serverError}</p>
        )}

        <label htmlFor="register-form-username">Usuario</label>
        <input
          type="text"
          className={`sign-in-form-username ${
            errors.username ? "is-invalid" : ""
          }`}
          id="register-form-username"
          name="username"
          value={form.username}
          onChange={handleInputChange}
          required
        />
        {errors.username && (
          <p className="error-message callout alert">{errors.username}</p>
        )}

        <label htmlFor="register-form-email">Correo</label>
        <input
          type="email"
          className={`sign-in-form-username ${
            errors.email ? "is-invalid" : ""
          }`}
          id="register-form-email"
          name="email"
          value={form.email}
          onChange={handleInputChange}
          required
        />
        {errors.email && (
          <p className="error-message callout alert">{errors.email}</p>
        )}

        <label htmlFor="register-form-password">Contraseña</label>
        <input
          type="password"
          className={`sign-in-form-password ${
            errors.password ? "is-invalid" : ""
          }`}
          id="register-form-password"
          name="password"
          value={form.password}
          onChange={handleInputChange}
          required
        />
        {errors.password && (
          <p className="error-message callout alert">{errors.password}</p>
        )}

        <label htmlFor="register-form-confirm-password">
          Confirmar Contraseña
        </label>
        <input
          type="password"
          className={`sign-in-form-password ${
            errors.confirmPassword ? "is-invalid" : ""
          }`}
          id="register-form-confirm-password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleInputChange}
          required
        />
        {errors.confirmPassword && (
          <p className="error-message callout alert">
            {errors.confirmPassword}
          </p>
        )}

        <button type="submit" className="sign-in-form-button">
          Registrarse
        </button>
        <div className="login-registrarse">
          ¿Ya tienes una cuenta?{" "}
          <a className="link" href="/login">
            Inicia sesión aquí
          </a>
        </div>
      </form>
    </div>
  );
};

export default Register;
