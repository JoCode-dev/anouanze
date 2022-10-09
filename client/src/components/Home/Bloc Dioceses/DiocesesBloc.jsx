import React from "react";
import { NavLink } from "react-router-dom";
import { isEmpty } from "../../utils";
import { useSelector } from "react-redux";

const DiocesesBloc = () => {
  const user = useSelector((state) => state.user.user);

  const requireAuth = () => {
    return !isEmpty(user) ? "/provinces" : "/login";
  };
  return (
    <div className="bloc-diocese-container">
      <div>
        <h1>Diocèses</h1>
        <h1>et Paroisses</h1>
      </div>

      <div>
        <h2>Toutes les informations sont ici !</h2>
      </div>

      <div>
        <p>Messes, Confessions, Vie de la paroisse, Activités paroissiale...</p>
      </div>

      <NavLink to={requireAuth()} className="btn-visit">
        Visiter
      </NavLink>
    </div>
  );
};

export default DiocesesBloc;
