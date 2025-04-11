import "foundation-sites/dist/css/foundation.min.css";
import "foundation-sites/dist/js/foundation.min.js";
import "../styles/Login.css";
import $ from "jquery";
import { useEffect } from "react";
import Logo from "../img/heladeria.png";

const Login = () => {
  useEffect(() => {
    $(document).foundation();
  }, []);

  return (
    <div className="login-container">
      <form>
        <div className="sign-in-form">
          <h4 className="text-center">Iniciar sesion</h4>
          <div className="logo-container-login">
            <img 
              src={Logo} // Asegúrate de usar la ruta correcta a tu imagen
              alt="Logo Heladería"
              className="logo-img"
            />
          </div>
          <label htmlFor="sign-in-form-username">Usuario</label>
          <input type="text" className="sign-in-form-username" id="sign-in-form-username" />
          <label htmlFor="sign-in-form-password">Contraseña</label>
          <input type="password" className="sign-in-form-password" id="sign-in-form-password" />
          <button type="submit" className="sign-in-form-button">
            Ingresar
          </button>
          <div className="login-registrarse">
            Si no tiene una cuenta puedes resgistrarse   <a className="link" href="/register">
                aquí
              </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
