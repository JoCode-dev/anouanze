import React from "react";
import { NavLink } from "react-router-dom";

const SubscribeBloc = () => {
  return (
    <div className="bloc-subscribe-container">
      <div>
        <h1>Inscrivez vous</h1>
      </div>

      <div>
        <h2>Pour ne rater aucune information.</h2>
      </div>

      <NavLink to="/login" className="btn-visit">
        Je m'inscrit
      </NavLink>
    </div>
  );
};

export default SubscribeBloc;
