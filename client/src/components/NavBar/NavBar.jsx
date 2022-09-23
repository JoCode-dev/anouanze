import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../actions/auth";

const NavBar = () => {
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
            <li className="active">Accueil</li>
          </NavLink>
          <NavLink to="/events">
            <li>Évènements</li>
          </NavLink>
          <NavLink to="/paroisses">
            <li>Paroisses</li>
          </NavLink>
          <NavLink to="/demande">
            <li>Demande de messe</li>
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
              <div className="mode-btn">Mode</div>
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
