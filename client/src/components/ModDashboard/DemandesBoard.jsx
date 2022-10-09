import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../utils/index";

import { getDemandsByParoisse, updateDemande } from "../../actions/demandes";

const DemandesBoard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(getDemandsByParoisse(user._paroisse));
  }, [dispatch]);

  let demands = useSelector((state) => state.demandes.data);
  !isEmpty(demands) && demands.filter((demand) => demand.isValid === false);

  const checkDemand = async (id) => {
    await dispatch(updateDemande(id)).then(() =>
      dispatch(getDemandsByParoisse(user._paroisse))
    );
  };

  return (
    <div className="mod-demandes-container">
      <h1>Demandes de Messe</h1>

      {!isEmpty(demands) ? (
        <div className="list-demandes">
          {demands.map((item, index) => {
            return (
              <div className="list-demandes-item">
                <div className="list-demandes-left">
                  <h3>Demandeur : {item.name}</h3>
                  <h2>Intention</h2>
                  <h3>{item.textDemand}</h3>
                </div>
                <div className="list-demandes-right">
                  <input
                    type="checkbox"
                    checked={item.isValid}
                    onClick={() => checkDemand(item._id)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <h2>Aucune demande en attente</h2>
        </div>
      )}
    </div>
  );
};

export default DemandesBoard;
