import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../actions/auth";
import { isEmpty } from "../utils";

const NavBar = ({ value }) => {
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(user);
  }, []);

  const handleLogout = async () => {
    dispatch(logout());
    localStorage.clear();
    window.location = "/";
  };

  const requireAuth = (el) => {
    return isEmpty(user) ? "/login" : `/${el}`;
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-left-part">
        <NavLink to="/">
          <img
            src={process.env.PUBLIC_URL + "/imgs/icon.png"}
            alt="logo-anouanze"
          />
        </NavLink>
      </div>

      <div className="navbar-center-part">
        <ul>
          <NavLink to="/">
            <li className={value === "Accueil" && "active"}>Accueil</li>
          </NavLink>
          <NavLink to={requireAuth("events")}>
            <li className={value === "Events" && "active"}>Évènements</li>
          </NavLink>
          <NavLink to={requireAuth("provinces")}>
            <li
              className={
                (value === "Paroisses" || value === "Provinces") && "active"
              }
            >
              Paroisses
            </li>
          </NavLink>
          <NavLink to={requireAuth("demande")}>
            <li className={value === "Demande" && "active"}>
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
              <NavLink to="/mod-dashboard" className="mode-btn">
                Mode
              </NavLink>
            )}

            <div className="logout-btn" onClick={handleLogout}>
              <img
                src={process.env.PUBLIC_URL + "/imgs/icons/logout.png"}
                alt="logout"
              />
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
