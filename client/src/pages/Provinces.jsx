import React, { useEffect } from "react";
import NavBar from "../components/NavBar/NavBar";
import { NavLink } from "react-router-dom";
import SearchBar from "../components/Search/SearchBar";
import { useSelector } from "react-redux";

const Provinces = () => {
  const user = (useSelector = (state) => state.user?.user);

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, [user]);

  const location = {
    pathname: "/diocese",
    state: {
      title: "Abidjan",
    },
  };

  return (
    <>
      <NavBar value={"Provinces"} />
      <SearchBar />
      <div className="provinces-container">
        <div className="provinces-container-head">
          <div>
            <h1>Diocèses</h1>
            <h1>et Paroisses</h1>
          </div>
        </div>

        <div className="provinces-grid">
          <div className="provinces-grid-element">
            <div className="province-image">
              <img
                src={process.env.PUBLIC_URL + "/imgs/provinces/abidjan.jpeg"}
                alt="Province écclésiastique d'Abidjan"
              />
            </div>
            <div className="province-details">
              <div className="province-name">
                <h1>PROVINCE ÉCCLÉSIASTIQUE D'ABIDJAN</h1>
              </div>
              <div className="province-dioceses">
                <NavLink to={`/diocese/Abidjan`}>
                  <p>Diocèse d'Abidjan</p>
                </NavLink>
                <NavLink to={`/diocese/Agboville`}>
                  <p>Diocèse d'Agboville</p>
                </NavLink>
                <NavLink to={`/diocese/Grand-Bassam`}>
                  <p> Diocèse de Grand-Bassam</p>
                </NavLink>
                <NavLink to={`/diocese/Yopougon`}>
                  <p>Diocèse de Yopougon</p>
                </NavLink>
              </div>
            </div>
          </div>
          <div className="provinces-grid-element">
            <div className="province-image">
              <img
                src={process.env.PUBLIC_URL + "/imgs/provinces/bouake.jpeg"}
                alt="Province écclésiastique de Bouaké"
              />{" "}
            </div>
            <div className="province-details">
              <div className="province-name">
                <h1>PROVINCE ÉCCLÉSIASTIQUE DE BOUAKÉ</h1>
              </div>
              <div className="province-dioceses">
                <NavLink to={`/diocese/Bouaké`}>
                  <p>Diocèse de Bouaké</p>
                </NavLink>
                <NavLink to={`/diocese/Abengourou`}>
                  <p>Diocèse d'Abengourou</p>
                </NavLink>
                <NavLink to={`/diocese/Bondoukou`}>
                  <p>Diocèse de Bondoukou</p>
                </NavLink>
                <NavLink to={`/diocese/Yamoussoukro`}>
                  <p>Diocèse de Yamoussoukro</p>
                </NavLink>
              </div>
            </div>
          </div>
          <div className="provinces-grid-element">
            <div className="province-image">
              <img
                src={process.env.PUBLIC_URL + "/imgs/provinces/korhogo.jpeg"}
                alt="Province écclésiastique de Korhogo"
              />{" "}
            </div>
            <div className="province-details">
              <div className="province-name">
                <h1>PROVINCE ÉCCLÉSIASTIQUE DE KORHOGO</h1>
              </div>
              <div className="province-dioceses">
                <NavLink to={`/diocese/Korhogo`}>
                  <p>Diocèse de Korhogo</p>
                </NavLink>
                <NavLink to={`/diocese/Katiola`}>
                  <p>Diocèse de Katiola</p>
                </NavLink>
                <NavLink to={`/diocese/Odienné`}>
                  <p>Diocèse de Odienné</p>
                </NavLink>
              </div>
            </div>
          </div>
          <div className="provinces-grid-element">
            <div className="province-image">
              <img
                src={process.env.PUBLIC_URL + "/imgs/provinces/gagnoa.jpeg"}
                alt="Province écclésiastique de Gagnoa"
              />{" "}
            </div>
            <div className="province-details">
              <div className="province-name">
                <h1>PROVINCE ÉCCLÉSIASTIQUE DE GAGNOA</h1>
              </div>
              <div className="province-dioceses">
                <NavLink to={`/diocese/Gagnoa`}>
                  <p>Diocèse de Gagnoa</p>
                </NavLink>
                <NavLink to={`/diocese/Daloa`}>
                  <p>Diocèse de Daloa</p>
                </NavLink>
                <NavLink to={`/diocese/Man`}>
                  <p>Diocèse de Man</p>
                </NavLink>
                <NavLink to={`/diocese/San Pedro`}>
                  <p>Diocèse de San Pedro</p>
                </NavLink>
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default Provinces;
