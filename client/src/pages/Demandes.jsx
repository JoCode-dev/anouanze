import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getParoisse, getAllParoisse } from "../actions/paroisse";
import { addDemande } from "../actions/demandes";
import { isEmpty } from "../components/utils/index";
import { NavLink } from "react-router-dom";

const Demandes = () => {
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    if (user === undefined) {
      window.location.href = "/login";
    }
  }, [user]);

  const [isInfos, setIsInfos] = useState(false);
  const [isIntention, setIsIntention] = useState(false);
  const [isChoosen, setIsChoosen] = useState(false);
  const [dataKey, setDataKey] = useState(1);
  const [paroisseChoosen, setParoisseChoosen] = useState("");
  const [idChoosen, setIdChoosen] = useState(null);
  const [dayChoosen, setDayChoosen] = useState([]);
  const [demandeDatas, setDemandeDatas] = useState({
    isAnonymous: false,
    name: "",
    number: "",
    textDemand: "",
    dayMesse: "",
    hourMesse: "",
    _idParoisse: "",
    paroisseName: "",
  });

  const [isValid, setIsvalid] = useState(false);

  const dispatch = useDispatch();

  let paroisse = useSelector((state) => state.paroisse);
  const paroisses = useSelector((state) => state.paroisses);

  useEffect(() => {
    dispatch(getAllParoisse());

    if (idChoosen) {
      paroisse = {};
      dispatch(getParoisse(idChoosen));
      setIdChoosen(null);
    }
  }, [user, paroisse, idChoosen]);

  useEffect(() => {
    (demandeDatas.name !== "" && demandeDatas.number !== "") ||
    demandeDatas.isAnonymous
      ? setIsInfos(true)
      : setIsInfos(false);

    demandeDatas.textDemand !== ""
      ? setIsIntention(true)
      : setIsIntention(false);

    demandeDatas.paroisseName !== "" &&
    demandeDatas._idParoisse !== "" &&
    demandeDatas.dayMesse !== "" &&
    demandeDatas.hourMesse !== ""
      ? setIsChoosen(true)
      : setIsChoosen(false);
  }, [demandeDatas]);

  const handleParoissesList = () => {
    if (!isEmpty(user)) {
      if (user?._paroisse !== "") {
        return (
          <select
            onChange={(e) => chooseParoisse(e)}
            value={demandeDatas.paroisseName}
          >
            <option>{paroisse.name}</option>
          </select>
        );
      }
    }
  };

  const handleAllParoisseList = () => {
    if (!isEmpty(paroisses)) {
      return (
        <select
          onChange={(e) => chooseParoisse(e) || null}
          value={demandeDatas?.paroisseName || ""}
        >
          <option value="" disabled>
            Choisir paroisse *
          </option>
          {paroisses.map((e) => (
            <option key={e._id} data-key={e._id} value={e.name}>
              {e.name}
            </option>
          ))}
        </select>
      );
    }
  };

  const chooseParoisse = (event) => {
    const selectedIndex = event.target.options.selectedIndex;
    const idx = event.target.options[selectedIndex].getAttribute("data-key");

    setIdChoosen(idx);
    setParoisseChoosen(idx);
    setDayChoosen([]);
    setDemandeDatas({
      ...demandeDatas,
      paroisseName: event.target.value,
      _idParoisse: idx,
      dayMesse: "",
      hourMesse: "",
    });
  };

  const chooseDay = (e) => {
    const selectedIndex = e.target.options.selectedIndex;
    const idx = e.target.options[selectedIndex].getAttribute("data-key");

    setDayChoosen(paroisse?.messes[idx].dayHour);

    setDemandeDatas({ ...demandeDatas, dayMesse: e.target.value });
  };

  const chooseHour = (e) => {
    setDemandeDatas({ ...demandeDatas, hourMesse: e.target.value });
  };

  const toggleActive = (e) => {
    const elements = document.querySelectorAll(".bar");

    setDataKey(e.dataset.key);

    elements.forEach((e) => {
      e.classList.remove("active");
    });

    elements[e.dataset.key - 1].classList.add("active");
  };

  const changeKey = (e) => {
    setDataKey(e);

    const elements = document.querySelectorAll(".bar");
    elements.forEach((e) => {
      e.classList.remove("active");
    });

    //elements[dataKey - 1].classList.add("active");
    elements[e - 1].classList.add("active");
  };

  const handleDemand = async () => {
    setIsvalid(true);
    const finalDatas = {
      name: demandeDatas?.isAnonymous ? "Un anonyme" : demandeDatas.name,
      number: demandeDatas.number,
      textDemand: demandeDatas.textDemand,
      dayMesse: demandeDatas.dayMesse,
      dayHour: demandeDatas.hourMesse,
      _idParoisse: demandeDatas._idParoisse,
    };

    await dispatch(addDemande(finalDatas));

    setIsvalid(false);

    const bloc = document.querySelector(".demand-valid");
    bloc.classList.add("active");

    setTimeout(() => {
      bloc.classList.remove("active");
      window.location = "/";
    }, 2000);
  };

  return (
    <div
      className="demandes-container"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}imgs/eucharist-02.png)`,
      }}
    >
      <div className="demandes-header">
        <NavLink to="/">
          <img src={process.env.PUBLIC_URL + "imgs/icon.png"} alt="icon" />
        </NavLink>
        <h1>Demande de messe</h1>
        <h3>
          Votre demande sera directement envoyée à la paroisse choisie ou aux
          responsables de l'évènement choisie.
        </h3>
      </div>

      <div className="demandes-box-container">
        <div className="bar-section">
          <div
            className="bar active"
            onClick={() => {
              isInfos && changeKey(1);
            }}
            data-key="1"
          >
            Infos Demandeur
          </div>
          <div
            className="bar"
            onClick={() => {
              isInfos && changeKey(2);
            }}
            data-key="2"
          >
            Intention de Messe
          </div>
          <div
            className="bar"
            onClick={() => {
              isInfos && isIntention && changeKey(3);
            }}
            data-key="3"
          >
            Choix de la paroisse
          </div>
          <div
            className="bar"
            onClick={() => {
              isInfos && isIntention && isChoosen && changeKey(4);
            }}
            data-key="4"
          >
            Récapitulatif
          </div>
        </div>
        {dataKey == 1 && (
          <div className="infos-section infos">
            <h2>Veuillez saisir les infomations du demandeur.</h2>

            <div className="infos-container">
              <div className="infos-anonymous">
                <input
                  type="checkbox"
                  className=""
                  name="anonymous"
                  id="anonymous"
                  htmlFor="anonymous"
                  defaultChecked={demandeDatas.isAnonymous}
                  onChange={(e) =>
                    setDemandeDatas({
                      ...demandeDatas,
                      isAnonymous: !demandeDatas.isAnonymous,
                    })
                  }
                />
                <label htmlFor="anonymous" name="anonymous">
                  Garder l'anonymat
                </label>
              </div>
              <div className="form-group">
                <img
                  src={process.env.PUBLIC_URL + "/imgs/icons/man.png"}
                  alt="man"
                />
                <input
                  type="text"
                  className="name"
                  placeholder="Nom Complet"
                  name="name"
                  value={demandeDatas.name}
                  onChange={(e) =>
                    setDemandeDatas({ ...demandeDatas, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <img
                  src={process.env.PUBLIC_URL + "/imgs/icons/phone.png"}
                  alt="phone"
                />
                <input
                  type="text"
                  className="name"
                  placeholder="Numéro de Téléphone"
                  name="number"
                  value={demandeDatas.number}
                  onChange={(e) =>
                    setDemandeDatas({ ...demandeDatas, number: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <img
                  src={process.env.PUBLIC_URL + "/imgs/icons/gender.png"}
                  alt="phone"
                />
                <select>
                  <option>Homme</option>
                  <option>Femme</option>
                </select>
              </div>
            </div>
            {isInfos && (
              <div className="btns-container">
                <div className="btn-next" onClick={() => changeKey(2)}>
                  Suivant
                </div>
              </div>
            )}
          </div>
        )}
        {dataKey == 2 && (
          <div className="infos-section intention">
            <h2>Saisissez votre intention</h2>
            <div className="form-group">
              <label htmlFor="content">Intention</label>
              <textarea
                placeholder="Un paroissien demande cette messe en action de grâces pour..."
                id="content"
                name="textDemand"
                value={demandeDatas.textDemand}
                onChange={(e) =>
                  setDemandeDatas({
                    ...demandeDatas,
                    textDemand: e.target.value,
                  })
                }
              />
            </div>

            {isInfos && isIntention && (
              <div className="btns-container">
                <div className="btn-prec" onClick={() => changeKey(1)}>
                  Précédent
                </div>
                <div className="btn-next" onClick={() => changeKey(3)}>
                  Suivant
                </div>
              </div>
            )}
          </div>
        )}
        {dataKey == 3 && (
          <div className="infos-section choose">
            <h2>Choisissez la paroisse dans laquelle la demande sera faite.</h2>

            <div className="choose-container">
              <div className="form-group">
                <img
                  src={process.env.PUBLIC_URL + "/imgs/icons/pin-paroisse.png"}
                  alt="pin"
                />
                {handleAllParoisseList()}
              </div>

              {!isEmpty(paroisse) &&
              paroisseChoosen &&
              paroisse?.messes.length > 0 ? (
                <div className="form-group">
                  <img
                    src={process.env.PUBLIC_URL + "/imgs/icons/agenda.png"}
                    alt="agenda"
                  />
                  <>
                    <select
                      onChange={(e) => chooseDay(e) || null}
                      value={demandeDatas.dayMesse || ""}
                    >
                      <option value="" disabled="disabled">
                        Choisir le jour
                      </option>
                      {paroisse?.messes.map((e, idx) => (
                        <option key={idx} data-key={idx}>
                          {e.dayName}
                        </option>
                      ))}
                    </select>
                  </>
                </div>
              ) : (
                <div className="empty-messes">
                  <h4>
                    Désolé cette paroisse n'a pas de messe enregistrée sur notre
                    plateforme
                  </h4>
                </div>
              )}

              {!isEmpty(paroisse) && dayChoosen.length > 0 ? (
                <div className="form-group">
                  <img
                    src={process.env.PUBLIC_URL + "/imgs/icons/clock.png"}
                    alt="clock"
                  />
                  <>
                    <select
                      onChange={(e) => chooseHour(e) || null}
                      value={demandeDatas.hourMesse || ""}
                    >
                      <option value="" disabled="disabled">
                        Choisir l'heure
                      </option>
                      {dayChoosen.map((e, idx) => (
                        <option key={idx} data-key={idx}>
                          {e}
                        </option>
                      ))}
                    </select>
                  </>
                </div>
              ) : null}
            </div>

            {isInfos && isIntention && isChoosen && (
              <div className="btns-container">
                <div className="btn-prec" onClick={() => changeKey(2)}>
                  Précédent
                </div>
                <div className="btn-next" onClick={() => changeKey(4)}>
                  Suivant
                </div>
              </div>
            )}
          </div>
        )}
        {dataKey == 4 && (
          <div className="infos-section recap">
            <h2>Récapitulatif des données saisies</h2>

            <div className="recap-container">
              <div className="recap-block">
                <h4>Demandeur :</h4>
                <p>
                  {demandeDatas.isAnonymous === true
                    ? "Un anonyme"
                    : demandeDatas.name}
                </p>
              </div>
              <div className="recap-block">
                <h4>Numéro du demandeur :</h4>
                <p>{demandeDatas.number}</p>
              </div>
              <div className="recap-block">
                <h4>Paroisse :</h4>
                <p>{demandeDatas.paroisseName}</p>
              </div>
              <div className="recap-block">
                <h4>Date & Heure :</h4>
                <p>
                  {demandeDatas.dayMesse} à la messe de {demandeDatas.hourMesse}
                </p>
              </div>
              <div className="recap-block">
                <h4>Intention :</h4>
                <p>{demandeDatas.textDemand}</p>
              </div>
              <div className="recap-block">
                <h4>Coût de la demande :</h4>
                <h3>3.300Fcfa</h3>
              </div>
            </div>

            {isInfos && isIntention && isChoosen && (
              <>
                <div className="btns-container">
                  <div className="btn-prec" onClick={() => changeKey(3)}>
                    Précédent
                  </div>
                  <div className="btn-next" onClick={() => handleDemand()}>
                    Finaliser
                    {isValid === true && (
                      <i className="fa fa-spinner fa-spin"></i>
                    )}
                  </div>
                </div>

                <div className="demand-valid">
                  <h2>Demande validée !</h2>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Demandes;
