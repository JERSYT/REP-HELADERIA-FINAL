import React, { useState } from "react";
import "../styles/IceCreamCustomizer.css";
import Hchocolate from "../img/Personalizado/chocolate.webp";
import Hvainilla from "../img/Personalizado/vainilla.webp";
import Hfresa from "../img/Personalizado/fresa.webp";
import Harequipe from "../img/Personalizado/arequipe.webp";
import Gomitas from '../img/Personalizado/gomitas.webp';
import Chipschoc from '../img/Personalizado/chipsChocolate.webp';
import Brownies from '../img/Personalizado/brownies.webp';
import Fresas from '../img/Personalizado/fresas.webp';
import Marshmellow from '../img/Personalizado/marshmellow.webp';
import Gusanitos from '../img/Personalizado/gusanitos.webp';
import Almendras from '../img/Personalizado/almendras.webp';
import Arandanos from '../img/Personalizado/arandanos.webp';
import Cono from '../img/Personalizado/cono.webp';
import Vaso from '../img/Personalizado/vaso.webp';

const IceCreamCustomizer = () => {
    const Sabores = [
        {id: 1, nombre: "Chocolate", imagen: Hchocolate},
        {id: 2, nombre: "Vainilla", imagen: Hvainilla},
        {id: 3, nombre: "Fresa", imagen: Hfresa},
        {id: 4, nombre: "Arequipe", imagen: Harequipe},
    ];

    const Toppings = [
        {id: 1, nombre: "Chispas de Chocolate", imagen: Chipschoc},
        {id: 2, nombre: "Gomitas", imagen: Gomitas},
        {id: 3, nombre: "Brownies", imagen: Brownies},
        {id: 4, nombre: "Fresas", imagen: Fresas},
        {id: 5, nombre: "Marshmellow", imagen: Marshmellow},
        {id: 6, nombre: "Gusanitos", imagen: Gusanitos},
        {id: 7, nombre: "Almendras", imagen: Almendras},
        {id: 8, nombre: "Arandanos", imagen: Arandanos},
    ];

    const Presentaciones = [
        {id: 1, nombre: "Cono", imagen: Cono},
        {id: 2, nombre: "Vaso", imagen: Vaso},
    ];

    // Estados
    const [saborSeleccionado, setSaboresSeleccionados] = useState([]);
    const [toppingSeleccionados, setToppingSeleccionados] = useState([]);
    const [presentacionSeleccionada, setPresentacionSeleccionada] = useState(Presentaciones[0]);
    
    // Lógica interactiva
    const toggleSabor = (sabor) => {
        if (saborSeleccionado.some(f => f.id === sabor.id)) {
            // Si ya está seleccionado, lo quitamos
            setSaboresSeleccionados(saborSeleccionado.filter(f => f.id !== sabor.id));
        } else if (saborSeleccionado.length < 3) {
            // Si no está seleccionado y no hemos alcanzado el límite, lo añadimos
            setSaboresSeleccionados([...saborSeleccionado, sabor]);
        }
    };

    const toggleTopping = (topping) => {
        if (toppingSeleccionados.some(t => t.id === topping.id)) {
            // Si ya está seleccionado, lo quitamos
            setToppingSeleccionados(toppingSeleccionados.filter(t => t.id !== topping.id));
        } else if (toppingSeleccionados.length < 5) {
            // Si no está seleccionado y no hemos alcanzado el límite, lo añadimos
            setToppingSeleccionados([...toppingSeleccionados, topping]);
        }
    };

    const resetSeleccion = () => {
        setSaboresSeleccionados([]);
        setToppingSeleccionados([]);
    };

    return (
        <div className="ice-cream-customizer">
            <div className="customizer-header">
                <h1 className="main-titulo">🍦 PERSONALIZA TU HELADO</h1>
                <p className="subtitulo">Crea tu combinación perfecta</p>
            </div>

            <div className="customizer-grid">
                {/* Opciones de personalización */}
                <div className="panel-seleccion">

                    {/* Selector de Sabores */}
                    <div className="grupo-selector">
                        <h3 className="seleccion-titulo">
                            <span className="numero-paso"> 1 </span> Selecciona el sabor <span className="max-indicador"> (Máx. 3)</span>
                        </h3>

                        <div className="items-grid">
                            {Sabores.map((sabor) => (
                                <div
                                    key={sabor.id}
                                    onClick={() => toggleSabor(sabor)}
                                    className={`seleccion-item ${saborSeleccionado.some(f => f.id === sabor.id) ? 'selected' : ''}`}
                                >
                                    <img src={sabor.imagen} alt={sabor.nombre} />
                                    <span className="item-nombre">{sabor.nombre}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                   
                    {/* Selector de Toppings */}
                    <div className="grupo-selector">

                        <h3 className="seleccion-titulo">
                            <span className="numero-paso"> 2 </span> Selecciona toppings <span className="max-indicador"> (Máx. 5)</span>
                        </h3>

                        <div className="items-grid">
                        {Toppings.map((topping) => (
                                <div
                                    key={topping.id}
                                    onClick={() => toggleTopping(topping)}
                                    className={`seleccion-item ${toppingSeleccionados.some(f => f.id === topping.id) ? 'selected' : ''}`}
                                > 
                                <img src={topping.imagen} alt={topping.nombre} />
                                <span className="item-nombre">{topping.nombre}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Selector de Presentación */}
                    <div className="grupo-selector">
                    <h3 className="seleccion-titulo">
                            <span className="numero-paso"> 3 </span> Selecciona la presentación
                        </h3>
                        
                        <div className="presentaciones-opciones">
                            {Presentaciones.map((presentacion) => (
                                <div 
                                    key={presentacion.id}
                                    onClick={() => setPresentacionSeleccionada(presentacion)}
                                    className={`presentacion-item ${presentacionSeleccionada.id === presentacion.id ? 'selected' : ''}`}
                                >
                                    <img src={presentacion.imagen} alt={presentacion.nombre} />
                                    <span>{presentacion.nombre}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Vista previa en tiempo real */}
                <div className="previa-panel">
                    <div className="previa-header">
                        <h3>Vista previa de tu helado</h3>
                        <div className="seleccion-cuenta">
                            <span>{saborSeleccionado.length}/3 sabores</span>
                            <span>{toppingSeleccionados.length}/5 toppings</span>
                        </div>
                    </div>
                        {/* Presentación (Cono o Vaso) */}
                        <div className="ice-cream-previa">
                            <div className="ice-cream-base">
                                <img 
                                    src={presentacionSeleccionada.imagen} 
                                    alt="presentacion"
                                    className="presentacion-imagen"
                                />

                                {/* Capas de sabores - organizacion proporcional*/}
                                <div className="sabores-stack">
                                    {saborSeleccionado.map((sabor, index) => (
                                        <div
                                            key={index}
                                            className="sabor-layer"
                                            style={{ 
                                                backgroundImage: `url(${sabor.imagen})`, 
                                                zIndex: index,
                                                height: `${100 / saborSeleccionado.length}%`,
                                                bottom: `${(index * 100) / saborSeleccionado.length}%`,
                                            }}
                                        />
                                        ))}
                                </div>
                                {/* distribución de toppings*/}
                                <div className="toppings-layer">
                                    {toppingSeleccionados.map((topping, index) => {
                                        const angulo = (index *30) / toppingSeleccionados.length;
                                        const radio = toppingSeleccionados.length > 3 ? 40:30;
                                        return(
                                            <img
                                            key={index}
                                            src={topping.imagen}
                                            alt={topping.nombre}
                                            className="topping-item"
                                            style={{ 
                                                transform: `
                                                translate(-50%, -50%)
                                                rotate(${angulo}deg)
                                                translate(0, -${radio}px)
                                                rotate(${-angulo}deg)
                                                `,
                                                animationDelay: `${index * 0.1}s`,
                                            }}
                                            />
                                        );    
                                    })}
                            </div>
                        </div>
                        </div>
                        <div className="previa-footer">
                            <button onClick={resetSeleccion} className="accion-btn reset-btn">
                                Reiniciar
                            </button>
                            <button className="accion-btn guardar-btn">
                                Guardar Helado
                            </button>
                        </div>
            </div>
        </div>
    </div>
    );
};
export default IceCreamCustomizer;