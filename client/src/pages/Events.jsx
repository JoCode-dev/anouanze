import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../actions/event";
import { NavLink } from "react-router-dom";
import { isEmpty } from "../components/utils";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";

import dayjs from "dayjs";
import "dayjs/locale/fr";

import Loader from "../components/Loader/Loader";

const Events = () => {
  const dispatch = useDispatch();

  const [onLoading, setOnLoading] = useState(true);
  const [onPlaceholder, setOnPlaceholder] = useState(true);
  const events = useSelector((state) => state.events);
  const user = useSelector((state) => state?.user?.user);

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, [user]);

  useEffect(() => {
    if (onLoading) {
      dispatch(getAllEvents());
    }
  }, [dispatch, onLoading]);

  const newArr = !isEmpty(events)
    ? events.sort((a, b) => {
        return Number(b.isPremium) - Number(a.isPremium);
      })
    : [];

  dayjs.locale("fr");
  const hourParser = (date) => {
    return dayjs(date).format("HH");
  };

  const minuteParser = (date) => {
    return dayjs(date).format("mm");
  };

  useEffect(() => {
    if (!isEmpty(events)) {
      setOnLoading(false);
      events.map((event) => console.log(event));
    }

    setTimeout(() => {
      setOnLoading(false);
    }, 2000);

    setTimeout(() => {
      setOnPlaceholder(false);
    }, 3000);
  }, [events]);

  return (
    <>
      {onLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <NavBar value={"Events"} />
          <div className="events-container">
            <div className="events-blocks-container">
              {isEmpty(events) || onPlaceholder
                ? events.map((event) => (
                    <>
                      <div className="card">
                        <div className="card_load"></div>
                        <div className="card_load-content">
                          <div className="card_load_extreme_title"></div>
                          <div className="card_load_extreme_descripion"></div>
                        </div>
                      </div>
                    </>
                  ))
                : events.map((event) => (
                    <>
                      <a
                        href={event.poster}
                        target="_blank"
                        className="event-card"
                      >
                        <div className="event-poster">
                          <img src={event.poster} alt="poster" />
                        </div>
                        <div className="event-details">
                          <div className="event-title">
                            <h2>{event.title}</h2>
                          </div>

                          <div className="event-description">
                            <p>{event.description}</p>
                            <p>Lieu : {event.address}</p>
                          </div>

                          <div className="event-sub">
                            <div className="event-date">
                              <img
                                src={
                                  process.env.PUBLIC_URL +
                                  "/imgs/icons/calendar.png"
                                }
                                alt="calendar "
                              />
                              {event?.dateEvent.length === 1 ? (
                                <>
                                  <p>
                                    {dayjs(event.dateEvent[0]).format(
                                      "DD MMMM YYYY"
                                    )}
                                  </p>
                                </>
                              ) : (
                                <>
                                  <p>
                                    {dayjs(event.dateEvent[0]).format(
                                      "DD MMMM YYYY"
                                    )}
                                    <br />
                                    {dayjs(event.dateEvent[1]).format(
                                      "DD MMMM YYYY"
                                    )}
                                  </p>
                                </>
                              )}
                            </div>
                            <div className="event-time">
                              <img
                                src={
                                  process.env.PUBLIC_URL +
                                  "/imgs/icons/clock.png"
                                }
                                alt="calendar "
                              />
                              {hourParser(event.startAt) + "H"} -{" "}
                              {hourParser(event.endAt) + "H"}
                            </div>
                            <div className="event-organizer">
                              <img
                                src={
                                  process.env.PUBLIC_URL +
                                  "/imgs/icons/orator.png"
                                }
                                alt="calendar "
                              />
                              <p>Organisateur : {event.organizer}</p>
                            </div>
                          </div>
                        </div>
                      </a>
                    </>
                  ))}
            </div>
          </div>
          {/* <Footer /> */}
        </>
      )}
    </>
  );
};

export default Events;
