import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getParoisse } from "../../actions/paroisse";
import { getActuByID } from "../../actions/actus";
import { isEmpty } from "../utils/index";
import { NavLink } from "react-router-dom";

const MaParoisse = ({ id }) => {
  const [loadEvent, setLoadEvent] = useState(true);
  const [isSwith, setIsSwith] = useState(false);
  const paroisse = useSelector((state) => state.paroisse);
  const actus = useSelector((state) => state.actu);

  const dispatch = useDispatch();

  useEffect(() => {
    if (loadEvent) {
      dispatch(getParoisse(id));
      dispatch(getActuByID(id));
    }
  }, [dispatch, id, loadEvent]);

  const toggleProgram = (id) => {
    id === 1 ? setIsSwith(false) : setIsSwith(true);
  };

  const putDashes = (hours) => {
    const arrayLength = hours.length;
    return arrayLength <= 2
      ? hours[0] + " - " + hours[1]
      : hours[0] + " - " + hours[1] + " - " + hours[2];
  };

  return (
    <>
      {!isEmpty(paroisse) && (
        <div className="MaParoisse-container">
          <div className="MaParoisse-header">
            <NavLink to={`/paroisse/${paroisse._id}`}>
              <h1>Ma Paroisse</h1>
            </NavLink>

            <NavLink to={`/paroisses`} className="MaParoisse-header-right">
              <h2>Paroisses</h2>
              <img
                src={process.env.PUBLIC_URL + "/imgs/icons/arrow-right.png"}
                alt="arrow-right"
              />
            </NavLink>
          </div>

          <div className="MaParoisse-infos-container">
            <div className="MaParoisse-infos-left">
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
              )}{" "}
            </div>
            <div className="MaParoisse-infos-right">
              <h1>{paroisse?.name}</h1>

              <div className="MaParoisse-program">
                <div className="MaParoisse-program-title">
                  Programme Paroissial
                </div>
                <div className="MaParoisse-program-switch">
                  <div
                    className={`switch ${!isSwith && "active"}`}
                    onClick={() => toggleProgram(1)}
                  >
                    Messes
                  </div>
                  <div
                    className={`switch ${isSwith && "active"}`}
                    onClick={() => toggleProgram(2)}
                  >
                    Confessions
                  </div>
                </div>
                {isSwith === false && (
                  <div className="MaParoisse-program-messes">
                    {paroisse?.messes.map((messe, idx) => (
                      <>
                        <div key={idx} className="messe-box">
                          <h3>
                            {messe.dayName} : {putDashes(messe?.dayHour)}
                          </h3>
                        </div>
                      </>
                    ))}
                  </div>
                )}

                {isSwith === true && (
                  <div className="MaParoisse-program-confess">
                    {paroisse?.confessions.lengtht > 1 &&
                      paroisse?.confessions.map((confession, idx) => (
                        <>
                          <div key={idx} className="confess-box">
                            <h3>
                              {confession.dayName} :{" "}
                              {putDashes(confession?.dayHour)}
                            </h3>
                          </div>
                        </>
                      ))}
                    {paroisse?.confessions.length === 1 &&
                      paroisse?.confessions.map((confession, idx) => (
                        <>
                          <div key={idx} className="confess-box">
                            <h3>
                              {confession.dayName} : {confession?.dayHour}
                            </h3>
                          </div>
                        </>
                      ))}
                  </div>
                )}
              </div>

              {!isEmpty(actus) && (
                <div className="MaParoisse-actus">
                  <div className="MaParoisse-actus-title">
                    Vie de ma Paroisse
                  </div>
                  <div className="MaParoisse-actus-container">
                    {Array.isArray(actus?.data)
                      ? actus?.data.map((actu, idx) => (
                          <NavLink
                            to={`/actu/${actu._id}`}
                            className="actu-box"
                            key={idx}
                          >
                            <div className="box-img">
                              <img src={process.env.PUBLIC_URL + actu.poster} />
                            </div>
                            {actu.title}
                          </NavLink>
                        ))
                      : null}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MaParoisse;
