import React from "react";
import { NavLink } from "react-router-dom";
import { isEmpty } from "../../utils";
import { useSelector } from "react-redux";

const EventsBloc = () => {
  const user = useSelector((state) => state.user.user);

  const requireAuth = () => {
    return !isEmpty(user) ? "/events" : "/login";
  };
  return (
    <div className="bloc-events-container">
      <div>
        <h1>Evènements</h1>
      </div>

      <div>
        <h2>C’est pourquoi je vous le dit :</h2>
        <h2>Tout ce que vous demanderez en priant,</h2>
        <h2>croyez que vous l’avez réçu et cela vous sera accordé.</h2>
      </div>

      <div className="ref">
        <h3>Marc 11:24</h3>
      </div>

      <NavLink to={requireAuth()} className="btn-visit">
        Voir les annonces
      </NavLink>
    </div>
  );
};

export default EventsBloc;
