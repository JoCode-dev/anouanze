import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { getActu } from "../actions/actus";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../components/utils/index";

import Loader from "../components/Loader/Loader";

import dayjs from "dayjs";
import "dayjs/locale/fr";

import Footer from "../components/Footer/Footer";

const Actu = () => {
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
      dispatch(getActu(id));
      setLoadEvent(false);
    }

    setTimeout(() => {
      setOnLoading(false);
    }, 1000);
  }, [dispatch, id, loadEvent]);

  const actu = useSelector((state) => state.actu.data);

  return (
    <>
      {onLoading ? (
        <Loader />
      ) : (
        <div className="actu-container">
          <header className="actu-header">
            <NavLink to="/">
              <img src={process.env.PUBLIC_URL + "/imgs/icon.png"} alt="logo" />
            </NavLink>
            <NavLink to="/events">
              <h1>Évènements</h1>
            </NavLink>
          </header>
          <div className="actu-details-container">
            <img
              src={process.env.PUBLIC_URL + actu.poster}
              alt="actu-poster"
              width="500px"
            />

            <div className="actu-title">
              <p>{actu.title}</p>
            </div>
            <div className="actu-description">
              <p>{actu.description}</p>
            </div>
          </div>
          <Footer dot="." />
        </div>
      )}
    </>
  );
};

export default Actu;
