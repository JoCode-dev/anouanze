import React from "react";

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader-3">
          <img src={process.env.PUBLIC_URL + '/imgs/icon.webp'} alt="logo" />
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
    </div>
  );
};

export default Loader;
