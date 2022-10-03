import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../utils";
import { NavLink } from "react-router-dom";

const renderParoisses = (arr) => {
  return (
    <div className="result-container">
      {!isEmpty(arr) ? (
        arr.map((elem, index) => {
          return (
            <NavLink
              to={`/paroisse/${elem._id}`}
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
                    src={process.env.PUBLIC_URL + "/imgs/icon.png"}
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

function compare_name(a, b) {
  if (a.name.toLowerCase() < b.name.toLowerCase()) {
    return -1;
  }
  if (a.name.toLowerCase() > b.name.toLowerCase()) {
    return 1;
  }
  return 0;
}

const List = ({ textSearch }) => {
  const paroisses = useSelector((state) => state.paroisses);
  const paroissesNameSorted = paroisses.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const newArr = paroissesNameSorted.filter(
    (paroiss) =>
      paroiss.name.toLowerCase().includes(textSearch.toLowerCase()) ||
      paroiss.diocese.toLowerCase().includes(textSearch.toLowerCase()) ||
      paroiss.province.toLowerCase().includes(textSearch.toLowerCase())
  );

  return <div className="search-list-container">{renderParoisses(newArr)}</div>;
};

export default List;
