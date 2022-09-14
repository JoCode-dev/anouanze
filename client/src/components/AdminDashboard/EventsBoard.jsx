import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../utils/index";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const EventsBoard = () => {
  // Afficher / Cacher le formulaire
  const [toggleForm, setToggleForm] = useState(false);
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);
  return (
    <>
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
