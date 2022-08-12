import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllParoisse } from "../../actions/paroisse";
import { isEmpty } from "../utils/index";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const ParoissesBoard = () => {
  const [toggleForm, setToggleForm] = useState(false);
  const dispatch = useDispatch();
  const paroisses = useSelector((state) => state.paroisses);

  useEffect(() => {
    dispatch(getAllParoisse());
  }, [dispatch]);

  return (
    <>
      {toggleForm && (
        <div className="form-container">
          <div className="form-group-container">
            <div className="container-header">
              <h1>Fiche Paroisse</h1>

              <div
                className="form-closer"
                onClick={() => setToggleForm(!toggleForm)}
              >
                Fermer
              </div>
            </div>
            <form></form>
          </div>
        </div>
      )}
      <div className="paroisses-board-container">
        <div className="header">
          <h1>Paroisses</h1>
        </div>

        <div className="paroisses-container">
          <div
            className="paroisse-add-element"
            onClick={() => setToggleForm(!toggleForm)}
          >
            <img
              src={process.env.PUBLIC_URL + "/imgs/icons/add.png"}
              alt={"add"}
            />
          </div>
          {!isEmpty(paroisses) &&
            paroisses.map((element, i) => (
              <div className="paroisse-element" key={i}>
                <div className="paroisse-infos">
                  <div className="paroisse-infos-image">
                    {element?.pictures[0] ? (
                      <img
                        src={process.env.PUBLIC_URL + element.pictures[0]}
                        alt={element.name}
                      />
                    ) : (
                      <img
                        src={process.env.PUBLIC_URL + "/imgs/icon.png"}
                        alt={element.name}
                      />
                    )}{" "}
                  </div>
                  <div className="paroisse-infos-name">
                    <h4>{element.name}</h4>
                    <h6>
                      {element.diocese} - {element.province}
                    </h6>
                  </div>
                </div>
                <div className="paroisse-element-footer">
                  <NavLink
                    to={`/paroisse/${element._id}`}
                    className="footer-view"
                  >
                    <img
                      src={process.env.PUBLIC_URL + "/imgs/icons/eye.png"}
                      alt={"edit"}
                    />
                  </NavLink>{" "}
                  <div className="footer-edit">
                    <img
                      src={process.env.PUBLIC_URL + "/imgs/icons/edit.png"}
                      alt={"edit"}
                    />
                  </div>
                  <div className="footer-delete">
                    <img
                      src={process.env.PUBLIC_URL + "/imgs/icons/trash.png"}
                      alt={"delete"}
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ParoissesBoard;
