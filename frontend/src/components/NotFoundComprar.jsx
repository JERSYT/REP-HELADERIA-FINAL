import "../styles/NotFound.css";
import { Link } from "react-router-dom";

const NotFoundComprar = () => {
  return (
    <div>
      <div className="not-found-container">
        <h1 className="error-pagina">404</h1>
        <p className="error-pagina">
          Lo sentimos, el producto que estás buscando no existe.
        </p>
        <Link to="/">Volver al inicio</Link>
      </div>
    </div>
  );
};

export default NotFoundComprar;
