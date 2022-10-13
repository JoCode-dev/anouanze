import React from "react";

const PriestCard = ({ priestData, paroisseName, setIsCardVisible }) => {
  const close = () => {
    setIsCardVisible(false);
  };
  return (
    <div className="priest-card-container">
      <div className="priest-card-head">
        <h2>Père {priestData?.priestName}</h2>
        <button onClick={close}>Fermer</button>
      </div>

      <div className="priest-card-body">
        <div className="priest-card-left">
          <div className="priest-head">
            <h1>{priestData?.priestRole}</h1>
            <h2>{paroisseName}</h2>
          </div>

          <div className="priest-presentation">
            <h1>Biographie</h1>
            <p>
              {priestData?.priestBio
                ? priestData?.priestBio
                : "Non repertoriée"}
            </p>
          </div>
        </div>
        <div className="priest-card-right">
          <img
            src={process.env.PUBLIC_URL + priestData?.priestPicture}
            alt={priestData.name}
          />
        </div>
      </div>
    </div>
  );
};

export default PriestCard;
