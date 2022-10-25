import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../utils";
import { NavLink } from "react-router-dom";

const renderParoisses = (arr, idUser) => {
  console.log(idUser);
  const requireAuth = (el) => {
    return idUser ? el : "/login";
  };
  return (
    <div className="result-container">
      {!isEmpty(arr) ? (
        arr.map((elem, index) => {
          return (
            <NavLink
              to={requireAuth(`/paroisse/${elem._id}`)}
              key={elem._id}
              value={elem._id}
              className="result-element"
            >
              <div className="list-img-c">
                {elem?.pictures[0] ? (
                  <img
                    src={process.env.PUBLIC_URL + elem.pictures[0]}
                    alt={elem.name}
                  />
                ) : (
                  <img
                    src={process.env.PUBLIC_URL + "/imgs/icon.webp"}
                    alt={elem.name}
                  />
                )}
              </div>
              <p>{elem.name}</p>
            </NavLink>
          );
        })
      ) : (
        <div className="result-element">Aucun resultat</div>
      )}
    </div>
  );
};

const List = ({ textSearch }) => {
  const paroisses = useSelector((state) => state.paroisses);
  const user = useSelector((state) => state?.user?.user);

  const paroissesNameSorted = paroisses?.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const newArr = paroissesNameSorted.filter(
    (paroiss) =>
      paroiss.name.toLowerCase().includes(textSearch.toLowerCase()) ||
      paroiss.diocese.toLowerCase().includes(textSearch.toLowerCase()) ||
      paroiss.province.toLowerCase().includes(textSearch.toLowerCase())
  );

  return (
    <div className="search-list-container">
      {renderParoisses(newArr, user?._id)}
    </div>
  );
};

export default List;
