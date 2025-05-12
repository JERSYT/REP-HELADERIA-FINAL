import { useNavigate } from 'react-router-dom';
import '../styles/Gracias.css'; // Asegúrate de que este archivo exista o créalo

const Gracias = () => {
  const navigate = useNavigate();

  return (
    <div className="gracias-container">
      <h1>¡Gracias por tu compra!</h1>
      <button className="btn-inicio" onClick={() => navigate('/')}>
        Volver al inicio
      </button>
    </div>
  );
};

export default Gracias;
