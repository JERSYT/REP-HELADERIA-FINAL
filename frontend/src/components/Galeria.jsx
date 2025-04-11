import "foundation-sites/dist/css/foundation.min.css";
import "foundation-sites/dist/js/foundation.min.js";
import "../styles/Galeria.css";
import $ from "jquery";
import { useEffect } from "react";

import gal1 from "../img/Galeria/1.webp";
import gal2 from "../img/Galeria/2.webp";
import gal3 from "../img/Galeria/3.webp";
import gal4 from "../img/Galeria/4.webp";
import gal5 from "../img/Galeria/5.webp";
import gal6 from "../img/Galeria/6.webp";
import gal7 from "../img/Galeria/7.webp";
import gal10 from "../img/Galeria/10.webp";
import gal11 from "../img/Galeria/11.webp";
import gal12 from "../img/Galeria/12.webp";
import gal14 from "../img/Galeria/14.webp";
import gal16 from "../img/Galeria/16.webp";
import gal17 from "../img/Galeria/17.webp";

const Galeria = () => {
  useEffect(() => {
    $(document).foundation();
  }, []);

  return (
    <div className="gallery-container">
      <div className="gallery-header small-10 medium-8 large-7 columns text-center">
        <h2 className="gallery-title">Galería</h2>
        <p>Disfruta de los diferentes sabores y colores que te ofrecemos</p>
      </div>

      <div className="container-img">
        <div className="box-img">
          <figure>
            <img src={gal4} alt="img-galeria" />
          </figure>
        </div>
        <div className="box-img">
          <figure>
            <img src={gal1} alt="img-galeria" />
          </figure>
        </div>
        <div className="box-img">
          <figure>
            <img src={gal3} alt="img-galeria" />
          </figure>
        </div>
        <div className="box-img">
          <figure>
            <img src={gal2} alt="img-galeria" />
          </figure>
        </div>
        <div className="box-img">
          <figure>
            <img src={gal6} alt="img-galeria" />
          </figure>
        </div>
        <div className="box-img">
          <figure>
            <img src={gal11} alt="img-galeria" />
          </figure>
        </div>
        <div className="box-img">
          <figure>
            <img src={gal5} alt="img-galeria" />
          </figure>
        </div>
        <div className="box-img">
          <figure>
            <img src={gal7} alt="img-galeria" />
          </figure>
        </div>
        <div className="box-img">
          <figure>
            <img src={gal10} alt="img-galeria" />
          </figure>
        </div>
        <div className="box-img">
          <figure>
            <img src={gal12} alt="img-galeria" />
          </figure>
        </div>
        <div className="box-img">
          <figure>
            <img src={gal16} alt="img-galeria" />
          </figure>
        </div>
        <div className="box-img">
          <figure>
            <img src={gal17} alt="img-galeria" />
          </figure>
        </div>
        <div className="box-img">
          <figure>
            <img src={gal14} alt="img-galeria" />
          </figure>
        </div>
      </div>
    </div>
  );
};

export default Galeria;
