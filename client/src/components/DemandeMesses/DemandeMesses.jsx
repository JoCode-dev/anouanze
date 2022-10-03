import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { isEmpty } from "../utils";

const DemandeMesses = () => {
  const user = useSelector((state) => state.user.user);

  const requireAuth = () => {
    return !isEmpty(user) ? "/demande" : "/login";
  };

  return (
    <div className="bloc-demande-container">
      <div>
        <h1>Demande</h1>
        <h1>de messe</h1>
      </div>

      <div>
        <h2>
          Offrez une messe en action de grâce, pour vos proches, pour vos
          défunts...
        </h2>
      </div>

      <NavLink to={requireAuth()} className="btn-demand">
        Faire une demande
      </NavLink>
    </div>
  );
};

export default DemandeMesses;
