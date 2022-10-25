import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { getEvent } from "../actions/event";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../components/utils/index";

import Loader from "../components/Loader/Loader";

import dayjs from "dayjs";
import "dayjs/locale/fr";

import Footer from "../components/Footer/Footer";

const Event = () => {
  const event = useSelector((state) => state.event);

  const [loadEvent, setLoadEvent] = useState(true);
  const [onLoading, setOnLoading] = useState(true);
  let { id } = useParams();
  const dispatch = useDispatch();

  dayjs.locale("fr");
  const hourParser = (date) => {
    return dayjs(date).format("HH");
  };

  const minuteParser = (date) => {
    return dayjs(date).format("mm");
  };

  useEffect(() => {
    if (loadEvent) {
      dispatch(getEvent(id));
      setLoadEvent(false);
    }

    setTimeout(() => {
      setOnLoading(false);
    }, 1000);
  }, [dispatch, id, loadEvent]);

  return (
    <>
      {onLoading ? (
        <Loader />
      ) : (
        <div className="event-container">
          <header className="event-header">
            <NavLink to="/">
              <img src={process.env.PUBLIC_URL + "/imgs/icon.webp"} alt="logo" />
            </NavLink>
            <NavLink to="/events">
              <h1>Évènements</h1>
            </NavLink>
          </header>
          <div className="event-details-container">
            <img
              src={process.env.PUBLIC_URL + event.poster}
              alt="event-poster"
              width="500px"
            />

            <div className="event-title">
              <p>{event.title}</p>
            </div>
            <div className="event-description">
              <p>{event.description}</p>
            </div>
            <div className="event-address">
              <p> Lieu: {event.address}</p>
            </div>

            <div className="event-sub-details">
              <div className="event-date">
                {isEmpty(event) ? (
                  <></>
                ) : (
                  <>
                    {event?.dateEvent.length === 1 ? (
                      <>
                        <p>
                          {dayjs(event.dateEvent[0]).format(
                            "dddd DD MMMM YYYY"
                          )}
                        </p>
                      </>
                    ) : (
                      <>
                        <p>
                          {dayjs(event.dateEvent[0]).format("DD MMMM YYYY")} -{" "}
                          {dayjs(event.dateEvent[1]).format("DD MMMM YYYY")}
                        </p>
                      </>
                    )}
                  </>
                )}
              </div>
              <div className="event-time">
                <p>
                  {hourParser(event.startAt) +
                    "H" +
                    minuteParser(event.startAt) +
                    "min"}{" "}
                  -{" "}
                  {hourParser(event.endAt) +
                    "H" +
                    minuteParser(event.endAt) +
                    "min"}
                </p>
              </div>
              <div className="event-organizer">
                <p>Organisé par : {event.organizer}</p>
              </div>
            </div>
          </div>
          <Footer dot="." />
        </div>
      )}
    </>
  );
};

export default Event;
