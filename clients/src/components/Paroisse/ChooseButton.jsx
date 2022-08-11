import React, { useEffect, useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { chooseParoisse, unchooseParoisse } from "../../actions/paroisse";
import { UidContext } from "../AppContext";

const ChooseButton = ({ paroisse }) => {
  const [isChoosen, setIsChoosen] = useState(false);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const Pid = paroisse?._id;

  const choose = () => {
    dispatch(chooseParoisse(Pid, uid));
    setIsChoosen(true);
    console.log(uid);
  };

  const unChoose = () => {
    dispatch(unchooseParoisse(Pid, uid));
    setIsChoosen(false);
    console.log(uid);
  };

  useEffect(() => {
    if (paroisse.paroissiens.includes(uid)) {
      setIsChoosen(true);
    } else setIsChoosen(false);
  }, [paroisse.paroissiens, uid, isChoosen]);

  return (
    <div>
      {uid !== "" && isChoosen === true && (
        <button className="choose-paroisse-container" onClick={unChoose}>
          <p>Paroisse déjà choisie</p>{" "}
          <img
            src={process.env.PUBLIC_URL + "/imgs/icons/love.png"}
            alt="heart"
          />
        </button>
      )}

      {uid !== "" && isChoosen === false && (
        <button className="choose-paroisse-container" onClick={choose}>
          <p>Choisir comme ma paroisse</p>{" "}
          <img
            src={process.env.PUBLIC_URL + "/imgs/icons/love.png"}
            alt="heart"
          />
        </button>
      )}
    </div>
  );
};

export default ChooseButton;
