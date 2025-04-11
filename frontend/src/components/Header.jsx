import React, { useEffect } from "react";
import $ from "jquery";
import "foundation-sites/dist/css/foundation.min.css";
import "foundation-sites/dist/js/foundation.min.js";
import "motion-ui/dist/motion-ui.min.css";
import "motion-ui/dist/motion-ui.min.js";
import "../styles/Header.css";
import Helado from "../img/helado1.jpg";
import Helado2 from "../img/helado2.jpeg";
import Helado3 from "../img/helado3.jpg";
import Helado4 from "../img/helado4.jpg";

const Header = () => {
  useEffect(() => {
    $(document).foundation();
  }, []);

  return (
    <div>
      <div
        className="orbit"
        role="region"
        aria-label="Favorite Space Pictures"
        data-orbit
        data-options="animInFromLeft:fade-in; animInFromRight:fade-in; animOutToLeft:fade-out; animOutToRight:fade-out;"
      >
        <div className="orbit-wrapper">
          <div className="orbit-controls"></div>
          <ul className="orbit-container">
            <li className="is-active orbit-slide">
              <figure className="orbit-figure">
                <img className="orbit-image" src={Helado} alt="Space" />
              </figure>
            </li>
            <li className="orbit-slide">
              <figure className="orbit-figure">
                <img className="orbit-image" src={Helado2} alt="Space" />
              </figure>
            </li>
            <li className="orbit-slide">
              <figure className="orbit-figure">
                <img className="orbit-image" src={Helado3} alt="Space" />
              </figure>
            </li>
            <li className="orbit-slide">
              <figure className="orbit-figure">
                <img
                  className="orbit-image imagen4"
                  src={Helado4}
                  alt="Space"
                />
              </figure>
            </li>
          </ul>
        </div>
        <nav className="orbit-bullets">
          <button className="is-active" data-slide="0">
            <span className="show-for-sr">First slide details.</span>
            <span className="show-for-sr" data-slide-active-label>
              Current Slide
            </span>
          </button>
          <button data-slide="1">
            <span className="show-for-sr">Second slide details.</span>
          </button>
          <button data-slide="2">
            <span className="show-for-sr">Third slide details.</span>
          </button>
          <button data-slide="3">
            <span className="show-for-sr">Fourth slide details.</span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Header;
