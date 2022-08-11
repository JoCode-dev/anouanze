import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { isEmpty } from "../components/utils";
import { getAllParoisse } from "../actions/paroisse";
import Loader from "../components/Loader/Loader";

const Paroisses = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [onPlaceholder, setOnPlaceholder] = useState(true);

  let paroisses = useSelector((state) => state.paroisses);

  useEffect(() => {
    if (isLoading) {
      dispatch(getAllParoisse());
    }
  }, [dispatch, isLoading]);

  useEffect(() => {
    if (!isEmpty(paroisses)) {
      setIsLoading(false);
    }
    setTimeout(() => {
      setOnPlaceholder(false);
    }, 3000);
  }, [paroisses]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="paroisses-container">
          <header className="paroisses-header">
            <NavLink to="/">
              <img src="../imgs/icon.png" alt="logo" />
            </NavLink>
            <h1>Paroisses</h1>
          </header>

          <div className="paroisses-blocks-container">
            {isEmpty(paroisses) || onPlaceholder ? (
              <>
                {paroisses.map((paroisse) => (
                  <div className="card" key={paroisse._id}>
                    <div className="card_load"></div>
                    <div className="card_load-content">
                      <div className="card_load_extreme_title"></div>
                      <div className="card_load_extreme_descripion"></div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                {paroisses.map((paroisse) => (
                  <NavLink to={`/paroisse/${paroisse._id}`} className="paroisse-card" key={paroisse._id}>
                    <div className="paroisse-card-img">
                      {paroisse?.pictures[0] ? (
                        <img
                          src={process.env.PUBLIC_URL + paroisse.pictures[0]}
                          alt={paroisse.name}
                        />
                      ) : (
                        <img
                          src={process.env.PUBLIC_URL + "/imgs/icon.png"}
                          alt={paroisse.name}
                        />
                      )}{" "}
                    </div>
                    <div className="paroisse-card-content">
                      <div className="paroisse-card-title">{paroisse.name}</div>
                      <div className="paroisse-card-descripion">
                        <div>Province : {paroisse.province}</div>
                        <div>Diocèse : {paroisse.diocese}</div>
                      </div>
                    </div>
                  </NavLink>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Paroisses;
