import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chooseParoisse, unchooseParoisse } from "../../actions/paroisse";
import { UidContext } from "../AppContext";

const ChooseButton = ({ paroisse }) => {
  const [isChoosen, setIsChoosen] = useState(false);
  const [onLoading, setOnLoading] = useState(false);
  const [isParoissed, setIsParoissed] = useState(false);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user);

  const Pid = paroisse?._id;

  const choose = async () => {
    setOnLoading(true);
    await dispatch(chooseParoisse(Pid, uid));
    setIsChoosen(true);
    setOnLoading(false);
    window.location.reload();
  };

  const unChoose = async () => {
    setOnLoading(true);
    await dispatch(unchooseParoisse(Pid, uid));
    setIsChoosen(false);
    setOnLoading(false);
    window.location.reload();
  };

  useEffect(() => {
    if (paroisse?.paroissiens.includes(uid)) {
      setIsChoosen(true);
      setIsParoissed(true);
    }

    if (user?._paroisse !== undefined && !paroisse.paroissiens.includes(uid)) {
      setIsChoosen(true);
      setIsParoissed(false);
    }

    if (user?._paroisse === "" || user?._paroisse === undefined) {
      setIsChoosen(false);
      setIsParoissed(false);
    }
  }, [paroisse]);

  const otherParoisseChoosen = () => {
    if (uid !== undefined && isChoosen === true && isParoissed === false) {
      return (
        <button
          className="choose-paroisse-container"
          onClick={() => alert("Une paroisse est déjà selectionnée")}
        >
          <p>Une autre paroisse a déja été choisie</p>{" "}
          <img
            src={process.env.PUBLIC_URL + "/imgs/icons/love.webp"}
            alt="heart"
          />
          {onLoading === true && <i className="fa fa-spinner fa-spin"></i>}
        </button>
      );
    }
  };

  return (
    <div>
      {uid !== undefined && isChoosen === true && isParoissed === true && (
        <button
          className="choose-paroisse-container"
          onClick={() => unChoose()}
        >
          <p>Paroisse choisie</p>{" "}
          <img
            src={process.env.PUBLIC_URL + "/imgs/icons/love.webp"}
            alt="heart"
          />
          {onLoading === true && <i className="fa fa-spinner fa-spin"></i>}
        </button>
      )}

      {otherParoisseChoosen()}
      {uid !== undefined && isChoosen === false && (
        <button className="choose-paroisse-container" onClick={() => choose()}>
          <p>Choisir comme ma paroisse</p>{" "}
          <img
            src={process.env.PUBLIC_URL + "/imgs/icons/love.webp"}
            alt="heart"
          />
          {onLoading === true && <i className="fa fa-spinner fa-spin"></i>}
        </button>
      )}
    </div>
  );
};

export default ChooseButton;
