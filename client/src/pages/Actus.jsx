import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar/NavBar";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../components/utils";
import { getParoisse } from "../actions/paroisse";
import { getActuByID } from "../actions/actus";

const Actus = () => {
  const [onLoading, setOnLoading] = useState(true);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (onLoading) {
      dispatch(getParoisse(id));
      dispatch(getActuByID(id));
    }

    setTimeout(() => {
      setOnLoading(false);
    }, 1000);
  }, [dispatch, id, onLoading]);

  const paroisse = useSelector((state) => state.paroisse);
  const actus = useSelector((state) => state.actus.data);
  !isEmpty(actus) &&
    actus.sort((a, b) => {
      return b.createdAt.localeCompare(a.createdAt);
    });

  return (
    <>
      <NavBar value={"Paroisses"} />

      <div className="actus-container">
        <div className="head">
          <img
            src={process.env.PUBLIC_URL + "/uploads/actus/default-actu.jpg"}
            alt="Plus Actualitéss"
          />
        </div>

        <div className="paroisse-name">{paroisse.name}</div>

        {!isEmpty(actus) && renderActus(actus)}
      </div>
    </>
  );
};

const renderActus = (arr) => {
  return (
    <div className="actus-container">
      {!isEmpty(arr)
        ? arr.map((el, idx) => (
            <NavLink to={`/actu/${el._id}`} className="actu-bloc" key={idx}>
              <div className="actu-bloc-left">
                <img src={process.env.PUBLIC_URL + el.poster} alt={el.title} />
              </div>
              <div className="actu-bloc-right">
                <p>{el?.title}</p>
                <p>{el?.description}</p>{" "}
              </div>
            </NavLink>
          ))
        : null}
    </div>
  );
};

export default Actus;
