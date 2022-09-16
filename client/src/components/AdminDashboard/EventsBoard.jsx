import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../utils/index";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const EventsBoard = () => {
  // Afficher / Cacher le formulaire
  const [toggleForm, setToggleForm] = useState(true);

  const [files, setFiles] = useState([]);

  const [isOk, setIsOk] = useState(false);

  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);

  const renderFiles = () => {};

  const submitForm = (e) => {
    e.preventDefault();
  };

  const cancelForm = () => {};

  return (
    <>
      {toggleForm && (
        // Form elements
        <div className="form-container">
          <div className="form-group-container">
            <div className="container-header">
              <h1>Fiche Évènement</h1>

              <div
                className="form-closer"
                onClick={() => setToggleForm(!toggleForm)}
              >
                Fermer
              </div>
            </div>

            <div className="form-elements-container">
              <form onSubmit={(e) => submitForm(e)}>
                <div className="form-group">
                  <label htmlFor="title">Titre</label>
                  <input htmlFor="title" placeholder="Titre" />
                </div>
                <div className="form-group-group">
                  <div className="form-group">
                    <label htmlFor="address">Lieu</label>
                    <input htmlFor="address" placeholder="Lieu" />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea htmlFor="description" placeholder="Description" />
                </div>

                {/** Picture */}
                <div className="pictures">
                  <div className="pictures-title">
                    <h3>Image</h3>
                  </div>
                  <div className="pictures-content">
                    <div className="pictures-blocks-container">
                      {!isEmpty(files) && <>{renderFiles()}</>}

                      <div className="file-upload">
                        <input
                          type="file"
                          name="file"
                          //onChange={(e) => fileSelectedHandler(e)}
                          accept=".jpg, .jpeg, .png"
                        />
                        <i className="fa fa-arrow-up"></i>
                      </div>
                    </div>
                  </div>
                </div>
                {/** Clergy */}

                <div className="btn-group">
                  <input type="submit" value="Save" />
                  {isOk === true && <i className="fa fa-spinner fa-spin"></i>}

                  <input
                    type="reset"
                    value="Annuler"
                    onClick={() => cancelForm()}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="events-board-container">
        <div className="header">
          <h1>Évènements</h1>
        </div>

        {/*  <div className="events-container">
          <div
            className="event-add-element"
            onClick={() => setToggleForm(!toggleForm)}
          >
            <img
              src={process.env.PUBLIC_URL + "/imgs/icons/add.png"}
              alt={"add"}
            />
          </div>
          {!isEmpty(events) &&
            events.map((element, i) => (
              <div className="event-element" key={i}>
                <div className="event-infos">
                  <div className="event-infos-image">
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
                  <div className="event-infos-name">
                    <h4>{element.name}</h4>
                    <h6>
                      {element.diocese} - {element.province}
                    </h6>
                  </div>
                </div>
                <div className="event-element-footer">
                  <NavLink
                    to={`/event/${element._id}`}
                    className="footer-view"
                    target="_blank"
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
                  <div
                    className="footer-delete"
                  
                  >
                    <img
                      src={process.env.PUBLIC_URL + "/imgs/icons/trash.png"}
                      alt={"delete"}
                    />
                  </div>
                </div>
              </div>
            ))}
        </div> */}
      </div>
    </>
  );
};

export default EventsBoard;
