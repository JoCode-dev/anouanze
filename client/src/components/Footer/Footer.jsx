import React from "react";
import { NavLink } from "react-router-dom";

const Footer = ({ dot }) => {
  return (
    <footer className="footer-container">
      <div className="footer-left-part">
        <NavLink to="/">
          <img src={`${dot}./imgs/icon.png`} alt="logo" />
        </NavLink>
        <p>Plateforme de recherche de paroisse à proximité et d'actualités</p>
      </div>

      <div className="footer-right-part">
        <ul>
          <li>
            <NavLink to="/">Nous Contacter</NavLink>{" "}
          </li>

          <li>
            <NavLink to="/">À propos</NavLink>{" "}
          </li>

          <li>
            <NavLink to="/">Retrouvez-nous sur...</NavLink>{" "}
          </li>

          <li>
            <NavLink to="/">Mode de paiement</NavLink>{" "}
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
