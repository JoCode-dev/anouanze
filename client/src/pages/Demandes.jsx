import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getParoisse, getAllParoisse } from "../actions/paroisse";
import { addDemande } from "../actions/demandes";
import { isEmpty } from "../components/utils/index";
import { NavLink } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";

const Demandes = () => {
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    if (isEmpty(user)) {
      window.location.href = "/login";
    }
  }, [user]);

  const [paroisseChoosen, setParoisseChoosen] = useState("");
  const [idChoosen, setIdChoosen] = useState(null);
  const [dayChoosen, setDayChoosen] = useState([]);
  const [demandeDatas, setDemandeDatas] = useState({
    name: "",
    number: "",
    textDemand: "",
    dayMesse: "",
    hourMesse: "",
    _idParoisse: "",
    paroisseName: "",
  });

  useEffect(() => {
    console.log("====================================");
    console.log(paroisseChoosen);
    console.log("====================================");
  }, [paroisseChoosen]);

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

  const handleDemand = async (e) => {
    e.preventDefault();
    setIsvalid(true);
    const finalDatas = {
      name: demandeDatas.name,
      number: demandeDatas.number,
      textDemand: demandeDatas.textDemand,
      dayMesse: demandeDatas.dayMesse,
      dayHour: demandeDatas.hourMesse,
      _idParoisse: demandeDatas._idParoisse,
    };

    await dispatch(addDemande(finalDatas));

    setIsvalid(false);
    setDemandeDatas({
      name: "",
      number: "",
      textDemand: "",
      dayMesse: "",
      hourMesse: "",
      _idParoisse: "",
      paroisseName: "",
    });
  };

  return (
    <>
      <NavBar value="Demande" />
      <div className="demandes-container">
        <div className="demandes-header">
          <div>
            <h1>Demande</h1>
            <h1>de messe</h1>
            <h3>
              Offrez une messe en action de grâce, pour vos proches, pour vos
              defunts...
            </h3>
          </div>
        </div>

        <form className="demande-form" onSubmit={(e) => handleDemand(e)}>
          <div className="form-group">
            <label>Nom & Prénom(s) du demandeur</label>
            <br />
            <input
              type="text"
              className="name"
              name="name"
              value={demandeDatas.name}
              onChange={(e) =>
                setDemandeDatas({ ...demandeDatas, name: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Contact</label>
            <br />
            <input
              type="text"
              className="name"
              name="number"
              value={demandeDatas.number}
              onChange={(e) =>
                setDemandeDatas({
                  ...demandeDatas,
                  number: e.target.value,
                })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Intention</label>
            <br />
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

          <div className="form-group">
            <label>Paroisse souhaitée</label>
            <br />
            {handleAllParoisseList()}
          </div>

          {!isEmpty(paroisse) &&
          paroisseChoosen &&
          paroisse?.messes.length > 0 ? (
            <div className="form-group">
              <>
                <label>Date souhaitée</label>
                <br />
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
            <>
              {paroisseChoosen && (
                <div className="empty-messes">
                  <h4>
                    Désolé cette paroisse n'a pas de messe enregistrée sur notre
                    plateforme
                  </h4>
                </div>
              )}
            </>
          )}

          {!isEmpty(paroisse) && dayChoosen.length > 0 ? (
            <div className="form-group">
              <>
                <label>Heure de messe souhaitée</label>
                <br />
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
          ) : (
            <>
              {paroisseChoosen && !isEmpty(dayChoosen) && (
                <div className="empty-messes">
                  <h4>Désolé Il n'y a pas de messe ce jour !</h4>
                </div>
              )}
            </>
          )}
          {!isEmpty(paroisse) &&
            paroisseChoosen &&
            dayChoosen.length > 0 &&
            demandeDatas.hourMesse && (
              <div className="montant">
                <h3>Coût de la demande :</h3>
                <h1>3.300Fcfa</h1>
              </div>
            )}

          <input type="submit" value="Valider" />
        </form>
      </div>
    </>
  );
};

export default Demandes;
