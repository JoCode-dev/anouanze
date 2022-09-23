import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getParoisse } from "../actions/paroisse";
import { getActuByID } from "../actions/actus";
import { isEmpty } from "../components/utils";

import ChooseButton from "../components/Paroisse/ChooseButton";

import HeadBar from "../components/HeadBar/HeadBar";
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
  const { id } = useParams();
  const dispatch = useDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  let paroisse = {};
  paroisse = useSelector((state) => state.paroisse);

  let actus = {};
  actus = useSelector((state) => state.actu);

  const putDashes = (hours) => {
    const arrayLength = hours.length;
    return arrayLength <= 2
      ? hours[0] + " - " + hours[1]
      : hours[0] + " - " + hours[1] + " - " + hours[2];
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

  return (
    <>
      {onLoading ? (
        <Loader />
      ) : (
        <div className="paroisse-container">
          <HeadBar headerName={"Paroisses"} />
          {!isEmpty(paroisse) ? (
            <>
              <div className="paroisse-infos-container">
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
              </div>
            </>
          ) : (
            <>
              <Loader />
            </>
          )}

          <div className="paroisse-sub-container">
            <div className="paroisse-actus-container">
              <div className="paroisse-actus-header">Vie de la paroisse</div>

              {!isEmpty(actus.data) ? (
                <>
                  <Swiper
                    slidesPerView={5}
                    spaceBetween={100}
                    pagination={{
                      clickable: true,
                    }}
                    loop={true}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="paroisse-slide-container"
                  >
                    {actus.data.map((act) => (
                      <SwiperSlide key={act._id} className="paroisse-actu">
                        <NavLink
                          to={`/actu/${act._id}`}
                          className="paroisse-actu-img-container"
                        >
                          <img
                            src={process.env.PUBLIC_URL + act.poster}
                            alt={act.title}
                          />
                        </NavLink>
                        <h3>{act.title}</h3>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </>
              ) : (
                <>
                  <h2>Pas d'activités en ce moment !</h2>
                </>
              )}
            </div>
            <div className="paroisse-history-container">
              <div className="paroisse-actus-header">
                Histoire de la paroisse
              </div>
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
              <div className="paroisse-actus-header">Clergé de la paroisse</div>
              {!isEmpty(paroisse?.clergy) ? (
                <>
                  <div className="paroisse-clergy-blocks">
                    {paroisse.clergy.map((priest, idx) => (
                      <div className="paroisse-priest-block" key={idx}>
                        <div className="paroisse-priest-img">
                          <img
                            src={process.env.PUBLIC_URL + priest.priestPicture}
                            alt={priest.name}
                          />
                        </div>
                        <div className="paroisse-priest-name">
                          {priest.priestName}
                        </div>
                        <div className="paroisse-priest-role">
                          {priest.priestRole}
                        </div>
                      </div>
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
      )}
    </>
  );
};

export default Paroisse;
