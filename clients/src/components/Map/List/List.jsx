import React from "react";
import { isEmpty } from "../../utils/index";
import { NavLink } from "react-router-dom";

const List = ({ paroisses }) => {
  return (
    <div className="list-paroisses-container">
      {!isEmpty(paroisses) &&
        paroisses.map((paroisse) => {
          return (
            <NavLink
              to={`/paroisse/${paroisse._id}`}
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
