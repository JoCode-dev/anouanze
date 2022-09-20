import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../utils/index";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import dayjs from "dayjs";

const EventsBoard = () => {
  // Afficher / Cacher le formulaire
  const [toggleForm, setToggleForm] = useState(true);

  const [files, setFiles] = useState([]);

  const [isOk, setIsOk] = useState(false);
  const [count, setCount] = useState([1]);
  const [countHours, setCountHours] = useState([1, 2]);

  const [formData, setFormData] = useState({
    poster: "",
    title: "",
    description: "",
    address: "",
    begin: "00:00",
    end: "00:00",
    startAt: null,
    endAt: null,
    dateEvent: [],
    organizer: "",
    posterId: "",
  });

  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);

  const renderFiles = () => {};

  const submitForm = (e) => {
    e.preventDefault();

    console.log("====================================");
    console.log(formData);
    console.log("====================================");
  };

  const cancelForm = () => {
    setFormData({
      poster: "",
      title: "",
      description: "",
      address: "",
      startAt: 1663570800,
      endAt: 1663570800,
      dateEvent: [],
      organizer: "",
      posterId: "",
    });
  };

  const renderHoursComponent = () => {
    let ele = document.querySelectorAll(".hourpicker-container");
    const [hours, minutes] = ele[0]?.childNodes[0].value.split(":");
    const hour1 = new Date(hours, minutes);

    const [hours2, minutes2] = ele[1]?.childNodes[0].value.split(":");
    const hour2 = new Date(hours2, minutes2);

    const checkHour = (e) => {
      switch (e) {
        case 1:
          return formData?.begin;

        case 2:
          return formData?.end;
      }
    };

    return countHours.map((el) => (
      <div className="hourpicker-container">
        <input
          type="time"
          className="datepicker-input"
          value={checkHour(el)}
          onChange={(e) => {
            setFormData({
              ...formData,
              startAt: hour1.getTime(),
              endAt: hour2.getTime(),
            });
          }}
        />
      </div>
    ));
  };

  useEffect(() => {
    console.log("====================================");
    console.log(formData);
    console.log("====================================");
  }, [formData]);

  const plusHoursButton = () => {
    const a = [1, 2];
    const element = (
      <div className="plus-button" onClick={() => setCountHours(a)}>
        <img src={process.env.PUBLIC_URL + "/imgs/icons/plus.png"} alt="Plus" />
      </div>
    );
    switch (countHours.length) {
      case 1:
        return element;
        break;
      default:
        break;
    }
  };

  const renderDatesComponent = () => {
    return count.map((el) => (
      <div className="datepicker-container">
        <input type="date" className="datepicker-input" />
      </div>
    ));
  };

  const plusButton = () => {
    const a = [1, 2];
    const element = (
      <div className="plus-button" onClick={() => setCount(a)}>
        <img src={process.env.PUBLIC_URL + "/imgs/icons/plus.png"} alt="Plus" />
      </div>
    );
    switch (count.length) {
      case 1:
        return element;
        break;
      default:
        break;
    }
  };

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
                  <input
                    htmlFor="title"
                    placeholder="Titre"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>
                <div className="form-group-group">
                  <div className="form-group">
                    <label htmlFor="address">Lieu</label>
                    <input
                      htmlFor="address"
                      placeholder="Lieu"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    htmlFor="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>

                {/** Date & Hour */}
                <div className="dates-group">
                  <h2>Date</h2>
                  {renderDatesComponent()}
                  {plusButton()}
                  <h2>Heure</h2>
                  {renderHoursComponent()}
                  {plusHoursButton()}
                </div>

                {/** Organisateur */}
                <div className="form-group">
                  <label htmlFor="organizer">Organisateur</label>
                  <input
                    htmlFor="organizer"
                    placeholder="Organisateur"
                    value={formData.organizer}
                    onChange={(e) =>
                      setFormData({ ...formData, organizer: e.target.value })
                    }
                  />
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
