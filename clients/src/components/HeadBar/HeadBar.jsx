import React from "react";
import { NavLink } from "react-router-dom";

const HeadBar = ({ headerName }) => {
  return (
    <div className="HeadBar-container">
      <NavLink to="/" className="HeadBar-left-part">
        <img
          src={process.env.PUBLIC_URL + "/imgs/icon.png"}
          alt="logo-anouanze"
        />
      </NavLink>

      <NavLink to="/paroisses" className="HeadBar-right-part">
        <h1>{headerName}</h1>
        <img
          src={process.env.PUBLIC_URL + "/imgs/icons/arrow-right.png"}
          alt="arrow-right"
        />
      </NavLink>
    </div>
  );
};

export default HeadBar;
