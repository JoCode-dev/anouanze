import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../actions/auth";
import { isEmpty } from "../utils";

const NavBar = ({ value }) => {
  const user = useSelector((state) => state.user.user);
  const [menuIcon, setMenuIcon] = useState(true);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(logout());
    localStorage.clear();
    window.location = "/";
  };

  const requireAuth = (el) => {
    return isEmpty(user) ? "/login" : `/${el}`;
  };

  const toggleMenu = () => {
    let toggle = document.querySelector(".menu-burger");

    toggle.addEventListener("click", () => {
      setMenuIcon(!menuIcon);
    });
  };

  return (
    <nav className={`navbar-container ${!menuIcon && "active-nav"}`}>
      <div className="navbar-left-part">
        <NavLink to="/">
          <img
            src={process.env.PUBLIC_URL + "/imgs/icon.png"}
            alt="logo-anouanze"
          />
        </NavLink>
        <div className="menu-burger" onClick={() => toggleMenu()}>
          <img
            src={
              process.env.PUBLIC_URL +
              `/imgs/icons/${menuIcon ? "menu-burger.png" : "close.png"}`
            }
            alt="menu-burger"
          />
        </div>
      </div>

      <div className="navbar-center-part">
        <ul>
          <NavLink to="/">
            <li className={value === "Accueil" ? "active" : undefined}>
              Accueil
            </li>
          </NavLink>
          <NavLink to={requireAuth("events")}>
            <li className={value === "Events" ? "active" : undefined}>
              Évènements
            </li>
          </NavLink>
          <NavLink to={requireAuth("provinces")}>
            <li
              className={
                value === "Paroisses" || value === "Provinces"
                  ? "active"
                  : undefined
              }
            >
              Paroisses
            </li>
          </NavLink>
          <NavLink to={requireAuth("demande")}>
            <li className={value === "Demande" ? "active" : undefined}>
              Demande de messe
            </li>
          </NavLink>
        </ul>
      </div>

      <div className="navbar-right-part">
        {user ? (
          <>
            {user.adminType === true && (
              <NavLink to="/admin-dashboard" className="admin-btn">
                <img
                  src={process.env.PUBLIC_URL + "/imgs/icons/community.png"}
                  alt="admin"
                />
              </NavLink>
            )}
            {user.moderatorType === true && (
              <NavLink to="/mod-dashboard" className="mod-btn">
                <img
                  src={process.env.PUBLIC_URL + "/imgs/icons/mod.png"}
                  alt="Moderator"
                />
                <h1>Espace d'administration</h1>
              </NavLink>
            )}

            <div className="logout-btn" onClick={handleLogout}>
              <img
                src={process.env.PUBLIC_URL + "/imgs/icons/logout.png"}
                alt="logout"
              />
              <h1>Déconnexion</h1>
            </div>
          </>
        ) : (
          <NavLink to="/login" className="navbar-log-button">
            Connexion
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
