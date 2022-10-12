import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getParoisse } from "../actions/paroisse";
import { getActuByID } from "../actions/actus";
import { isEmpty } from "../components/utils";
import NavBar from "../components/NavBar/NavBar";

import ChooseButton from "../components/Paroisse/ChooseButton";
import PriestCard from "../components/Paroisse/PriestCard";

import Loader from "../components/Loader/Loader";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Paroisse = () => {
  const [onLoading, setOnLoading] = useState(true);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [priestID, setPriestID] = useState(null);
  const [priestData, setPriestData] = useState({});

  const { id } = useParams();
  const dispatch = useDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  let paroisse = {};
  paroisse = useSelector((state) => state.paroisse);

  let actus = {};
  actus = useSelector((state) => state.actus);

  const putDashes = (hours) => {
    const arrayLength = hours.length;
    let result = "";
    if (arrayLength === 2) {
      result = hours[0] + " - " + hours[1];
    } else if (arrayLength === 1) {
      result = hours[0];
    } else {
      result = hours[0] + " - " + hours[1] + " - " + hours[2];
    }
    return result;
  };

  const renderConfessions = () => {
    let bool = true;

    return (
      <>
        {paroisse?.confessions.map((conf, idx) => (
          <>
            {(bool = conf?.dayHour.length > 0)}
            <div key={idx}>
              {bool && conf.dayName + " :"} {bool && putDashes(conf?.dayHour)}
            </div>
          </>
        ))}
      </>
    );
  };

  useEffect(() => {
    if (onLoading) {
      dispatch(getParoisse(id));
      dispatch(getActuByID(id));
    }

    setTimeout(() => {
      setOnLoading(false);
    }, 1000);
  }, [dispatch, id, onLoading]);

  const checkPriest = (priest) => {
    setIsCardVisible(true);
    console.log("====================================");
    setPriestData(priest);
    console.log("====================================");
  };

  const name = paroisse.diocese;
  const provinceName = paroisse.province;

  const sendName = () => {
    const voy = ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"];
    let bool = true;

    for (let i = 0; i < voy.length; i++) {
      if (name[0] === voy[i]) {
        bool = true;
        break;
      } else {
        bool = false;
      }
    }

    return bool === true ? `Diocèse d'${name}` : `Diocèse de ${name}`;
  };

  const sendProvinceName = () => {
    const voy = ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"];
    let bool = true;

    for (let i = 0; i < voy.length; i++) {
      if (provinceName[0] === voy[i]) {
        bool = true;
        break;
      } else {
        bool = false;
      }
    }

    return bool === true ? `d'${provinceName}` : `de ${provinceName}`;
  };

  return (
    <>
      {onLoading ? (
        <Loader />
      ) : (
        <>
          <NavBar value={"Paroisses"} />
          <div className="paroisse-container">
            <div className="file-arianne">
              <NavLink to="/provinces" className="file-ariane-element">
                <h1>Diocèses et Paroisses</h1>
              </NavLink>
              <NavLink to="/provinces" className="file-ariane-element">
                <h1>Province écclésiastique {sendProvinceName()}</h1>
              </NavLink>
              <NavLink to={`/diocese/${name}`} className="file-ariane-element">
                <h1>{sendName()}</h1>
              </NavLink>
            </div>
            {!isEmpty(paroisse) ? (
              <>
                <div className="paroisse-image">
                  {paroisse?.pictures[0] ? (
                    <img
                      src={process.env.PUBLIC_URL + paroisse.pictures[0]}
                      alt={paroisse.name}
                    />
                  ) : (
                    <img
                      src={process.env.PUBLIC_URL + "/imgs/icon.png"}
                      alt={paroisse.name}
                    />
                  )}
                </div>
                <div className="paroisse-infos">
                  <div className="paroisse-name">{paroisse.name}</div>

                  <div className="paroisse-program-head">
                    Programme des Messes
                  </div>

                  <div className="paroisse-program">
                    {!isEmpty(paroisse?.messes[0]?.dayHour) &&
                      paroisse?.messes.map((messe, idx) => (
                        <>
                          <div key={idx}>
                            {messe.dayName} : {putDashes(messe?.dayHour)}
                          </div>
                        </>
                      ))}
                  </div>

                  <div className="paroisse-program-head">
                    Programme des Confessions
                  </div>

                  <div className="paroisse-program">
                    {!isEmpty(paroisse?.confessions) && renderConfessions()}
                  </div>

                  <div className="paroisse-program-head">
                    Actualité Paroissiale
                  </div>

                  <div className="paroisse-placeholder">
                    Catéchèse - Récollection - Pélé - Veillée et autres
                    informations qui permettrons aux paroissiens d'être informés
                  </div>

                  {!isEmpty(actus.data) &&
                    renderActus(actus.data, paroisse._id)}

                  <div className="paroisse-program-head">
                    Présentation de la paroisse
                  </div>

                  <div className="paroisse-placeholder">
                    Histoire de la paroisse - Clergé - Autres
                  </div>
                </div>

                {/*  <div className="paroisse-infos-container">
                  <div className="paroisse-infos-left">
                    {paroisse?.pictures[0] ? (
                      <img
                        src={process.env.PUBLIC_URL + paroisse.pictures[0]}
                        alt={paroisse.name}
                      />
                    ) : (
                      <img
                        src={process.env.PUBLIC_URL + "/imgs/icon.png"}
                        alt={paroisse.name}
                      />
                    )}
                  </div>

                  <div className="paroisse-infos-right">
                    <div className="paroisse-name">
                      <h1>{paroisse.name}</h1>
                    </div>

                    <div className="paroisse-contacts">
                      {paroisse?.address && paroisse?.contact ? (
                        <p>
                          {paroisse?.address} - {paroisse?.contact}
                        </p>
                      ) : (
                        <>{paroisse?.address && <p>{paroisse?.address}</p>}</>
                      )}
                    </div>

                    <div className="paroisse-program">
                      <div className="paroisse-program-header">
                        <h2>PROGRAMME DES MESSES : </h2>
                      </div>
                      <div className="paroisse-program-content">
                        {!isEmpty(paroisse?.messes[0]?.dayHour) &&
                          paroisse?.messes.map((messe, idx) => (
                            <>
                              <div key={idx}>
                                {messe.dayName} : {putDashes(messe?.dayHour)}
                              </div>
                            </>
                          ))}
                      </div>
                    </div>

                    <div className="paroisse-confessions">
                      <div className="paroisse-confessions-header">
                        <h2>PROGRAMME DES CONFESSIONS : </h2>
                      </div>
                    </div>

                    <ChooseButton paroisse={paroisse} />
                  </div>
                </div> */}
              </>
            ) : (
              <>
                <Loader />
              </>
            )}

            <div className="paroisse-sub-container">
              <div className="paroisse-history-container">
                {paroisse?.history ? (
                  <>
                    <div>{paroisse.history}</div>
                  </>
                ) : (
                  <>
                    <div>Histoire non répertoriée</div>
                  </>
                )}
              </div>
              <div className="paroisse-clergy-container">
                {!isEmpty(paroisse?.clergy) ? (
                  <>
                    <div className="paroisse-clergy-blocks">
                      {paroisse.clergy.map((priest, idx) => (
                        <>
                          <div className="paroisse-priest-block" key={idx}>
                            <div className="paroisse-priest-img">
                              <img
                                src={
                                  process.env.PUBLIC_URL + priest.priestPicture
                                }
                                alt={priest.name}
                              />
                            </div>
                            <div className="paroisse-priest-name">
                              Père {priest.priestName}
                            </div>
                            <div className="paroisse-priest-role">
                              {priest.priestRole}
                            </div>
                            <div
                              className="priest-discover"
                              onClick={() => checkPriest(priest)}
                            >
                              Découvrir +
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <div>Clergé non répertorié</div>
                  </>
                )}
              </div>
            </div>
          </div>
          {isCardVisible === true && (
            <PriestCard
              priestData={priestData}
              isCardVisible={isCardVisible}
              setIsCardVisible={setIsCardVisible}
              paroisseName={paroisse?.name}
            />
          )}
        </>
      )}
    </>
  );
};

const renderActus = (actus, idParoisse) => {
  let newArr = actus
    .sort((a, b) => {
      return b.createdAt.localeCompare(a.createdAt);
    })
    .slice(0, 3);

  return (
    <div className="paroisse-actus">
      {!isEmpty(newArr)
        ? newArr.map((actu) => (
            <NavLink to={`/actu/${actu._id}`} className="actu-block">
              <img
                src={process.env.PUBLIC_URL + actu.poster}
                alt={actu.title}
              />
              <h2>{actu.title}</h2>
            </NavLink>
          ))
        : null}
      {newArr.length >= 1 && (
        <NavLink to={`/actus/${idParoisse}`} className="actu-block">
          <img
            src={process.env.PUBLIC_URL + "/uploads/actus/default-actu.jpg"}
            alt="Plus Actualitéss"
          />
          <h2>Plus d'actualités</h2>
        </NavLink>
      )}
    </div>
  );
};

export default Paroisse;
