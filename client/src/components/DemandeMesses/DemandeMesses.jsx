import React from "react";
import { NavLink } from "react-router-dom";

const DemandeMesses = () => {
  return (
    <div className="demande-messes-container">
      <div className="demande-messes-left">
        <img src={process.env.PUBLIC_URL + "imgs/eucharist.png"} alt="" />
      </div>
      <div className="demande-messes-right">
        <div className="demande-messes-title">
          <h1>Demandes</h1>
          <h2>de Messes</h2>
        </div>

        <div className="demande-messes-text">
          Offrez une messe en action de grâce, pour vos proches, pour vos
          défunts...
        </div>

        <NavLink to="/demande" className="demande-messes-button">
          Faire une demande ✝️
        </NavLink>
      </div>
    </div>
  );
};

export default DemandeMesses;
