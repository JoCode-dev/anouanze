import React from "react";
import { isEmpty } from "../../utils/index";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const List = ({ paroisses }) => {
  const user = useSelector((state) => state.user);

  const requireAuth = (id) => {
    return !isEmpty(user) ? `/paroisse/${id}` : "/login";
  };

  return (
    <div className="list-paroisses-container">
      {!isEmpty(paroisses) &&
        paroisses.map((paroisse) => {
          return (
            <NavLink
              to={requireAuth(paroisse._id)}
              className="list-paroisse-element"
            >
              <div className="paroisse-element-left">
                <img
                  src={
                    paroisse.pictures.length > 0
                      ? paroisse.pictures[0]
                      : "./imgs/icons/church.png"
                  }
                  alt="church"
                />
              </div>
              <div className="paroisse-element-right">
                <p>{paroisse.name}</p>
                <p>Diocèse : {paroisse.diocese}</p>
              </div>
            </NavLink>
          );
        })}
    </div>
  );
};

export default List;
