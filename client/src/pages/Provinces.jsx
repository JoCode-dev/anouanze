import React from "react";
import NavBar from "../components/NavBar/NavBar";
import { NavLink } from "react-router-dom";

const Provinces = () => {
  const location = {
    pathname: "/diocese",
    state: {
      title: "Abidjan",
    },
  };
  return (
    <>
      <NavBar value={"Provinces"} />
      <div className="provinces-container">
        <div className="provinces-container-head">
          <h1>Provinces</h1>
        </div>

        <div className="provinces-grid">
          <div className="provinces-grid-abidjan">
            <div className="province-details">
              <div className="province-name">
                <h3>PROVINCE</h3>
                <h1>D'ABIDJAN</h1>
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
          <div className="provinces-grid-bouake">
            <div className="province-details">
              <div className="province-name">
                <h3>PROVINCE</h3>
                <h1>DE BOUAKÉ</h1>
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
          <div className="provinces-grid-korhogo">
            <div className="province-details">
              <div className="province-name">
                <h3>PROVINCE</h3>
                <h1>DE KORHOGO</h1>
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
          <div className="provinces-grid-gagnoa">
            <div className="province-details">
              <div className="province-name">
                <h3>PROVINCE</h3>
                <h1>DE GAGNOA</h1>
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
