import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logout } from "../../actions/auth";

const NavBar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("jwt")));

  const setClassActive = (e) => {
    const li = document.querySelectorAll("li");

    li.forEach((el) => {
      el.classList.remove("active");
    });

    e.target.className = "active";
  };

  const dispatch = useDispatch();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("jwt")));

    console.log(user?.result);
  }, []);

  const handleLogout = async () => {
    dispatch(logout());
    localStorage.clear();
    window.location = "/";
    setUser(null);
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
          <li onClick={(e) => setClassActive(e)} className="active">
            Accueil
          </li>
          <li onClick={(e) => setClassActive(e)}>Près de chez vous</li>
          <li onClick={(e) => setClassActive(e)}>Ma Paroisse</li>
          <li onClick={(e) => setClassActive(e)}>Demande de messe</li>
        </ul>
      </div>

      <div className="navbar-right-part">
        {user ? (
          <>
            {user.result.adminType === true && (
              <NavLink to="/admin-dashboard" className="admin-btn">
                <img
                  src={process.env.PUBLIC_URL + "/imgs/icons/community.png"}
                  alt="admin"
                />
              </NavLink>
            )}
            {user.result.moderatorType === true && (
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
