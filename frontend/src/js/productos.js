import heladoVainilla from "../img/helado_vainilla.jpeg";
import heladoVainilla1 from "../img/helado-vainilla1.png";
import heladoVainilla2 from "../img/helado-vainilla2.png";
import heladoVainilla3 from "../img/helado-vainilla3.png";
import heladoVainilla4 from "../img/helado-vainilla4.png";
import heladoChocolate from "../img/helado_chocolate.jpeg";
import heladoChocolate1 from "../img/helado_chocolate1.png";
import heladoChocolate2 from "../img/helado_chocolate2.png";
import heladoChocolate3 from "../img/helado_chocolate3.png";
import heladoChocolate4 from "../img/helado_chocolate4.png";
import heladoFresa from "../img/helado_fresa.jpeg";
import heladoFresa1 from "../img/helado_fresa1.png";
import heladoFresa2 from "../img/helado_fresa2.png";
import heladoFresa3 from "../img/helado_fresa3.png";
import heladoFresa4 from "../img/helado_fresa4.png";
import heladoMenta from "../img/helado_menta.jpeg";
import heladoMenta1 from "../img/helado_menta1.png";
import heladoMenta2 from "../img/helado_menta2.png";
import heladoMenta3 from "../img/helado_menta3.png";
import heladoMenta4 from "../img/helado_menta4.png";
import heladoCaramelo from "../img/helado_caramelo.jpeg";
import heladoCaramelo1 from "../img/helado_caramelo1.png";
import heladoCaramelo2 from "../img/helado_caramelo2.png";
import heladoCaramelo3 from "../img/helado_caramelo3.png";
import heladoCaramelo4 from "../img/helado_caramelo4.png";
import heladoCafe from "../img/helado_cafe.jpeg";
import heladoCafe1 from "../img/helado_cafe1.png";
import heladoCafe2 from "../img/helado_cafe2.png";
import heladoCafe3 from "../img/helado_cafe3.png";
import heladoCafe4 from "../img/helado_cafe4.png";

const products = [
  {
    id: 1,
    titulo: "Vainilla Clásica",
    imagen_grande: heladoVainilla,
    imagen_pequeña1: heladoVainilla1,
    imagen_pequeña2: heladoVainilla2,
    imagen_pequeña3: heladoVainilla3,
    imagen_pequeña4: heladoVainilla4,
    precio: "6.500",
    descripcion:
      "Helado cremoso de vainilla, perfecto para quienes disfrutan de los sabores tradicionales.",
  },
  {
    id: 2,
    titulo: "Chocolate Oscuro",
    imagen_grande: heladoChocolate,
    imagen_pequeña1: heladoChocolate1,
    imagen_pequeña2: heladoChocolate2,
    imagen_pequeña3: heladoChocolate3,
    imagen_pequeña4: heladoChocolate4,
    precio: "7.000",
    descripcion:
      "Helado de chocolate intenso y rico, hecho con cacao oscuro para un sabor profundo y decadente.",
  },
  {
    id: 3,
    titulo: "Fresa Natural",
    imagen_grande: heladoFresa,
    imagen_pequeña1: heladoFresa1,
    imagen_pequeña2: heladoFresa2,
    imagen_pequeña3: heladoFresa3,
    imagen_pequeña4: heladoFresa4,
    precio: "6.800",
    descripcion:
      "Helado refrescante hecho con fresas frescas, ideal para los amantes de los sabores frutales y naturales.",
  },
  {
    id: 4,
    titulo: "Menta con Chips de Chocolate",
    imagen_grande: heladoMenta,
    imagen_pequeña1: heladoMenta1,
    imagen_pequeña2: heladoMenta2,
    imagen_pequeña3: heladoMenta3,
    imagen_pequeña4: heladoMenta4,
    precio: "7.200",
    descripcion:
      "Helado de menta fresca con trozos de chocolate crujiente, una combinación clásica y refrescante.",
  },
  {
    id: 5,
    titulo: "Caramelo Salado",
    imagen_grande: heladoCaramelo,
    imagen_pequeña1: heladoCaramelo1,
    imagen_pequeña2: heladoCaramelo2,
    imagen_pequeña3: heladoCaramelo3,
    imagen_pequeña4: heladoCaramelo4,
    precio: "7.500",
    descripcion:
      "Helado cremoso con un toque de caramelo salado, que combina lo dulce y lo salado en cada bocado.",
  },
  {
    id: 6,
    titulo: "Café Espresso",
    imagen_grande: heladoCafe,
    imagen_pequeña1: heladoCafe1,
    imagen_pequeña2: heladoCafe2,
    imagen_pequeña3: heladoCafe3,
    imagen_pequeña4: heladoCafe4,
    precio: "7.500",
    descripcion:
      "Helado con un sabor intenso a café, perfecto para los amantes del café que buscan un postre energético.",
  },
];

export default products;
