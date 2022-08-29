import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { isEmpty } from "../components/utils";
import { getAllParoisse } from "../actions/paroisse";
import Loader from "../components/Loader/Loader";

const Paroisses = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [onPlaceholder, setOnPlaceholder] = useState(true);
  const [count, setCount] = useState(3);
  const [paroissesGroupe, setParoissesGroupe] = useState([]);
  const [searchText, setSearchText] = useState("");

  const holder = [1, 2, 3, 4, 5, 6];

  let paroisses = useSelector((state) => state.paroisses);

  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight
    ) {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    if (isLoading) {
      dispatch(getAllParoisse(count));
      setIsLoading(false);
      setCount(count + 4);
    }

    window.addEventListener("scroll", loadMore);
    return () => window.removeEventListener("scroll", loadMore);
  }, [dispatch, isLoading]);

  useEffect(() => {
    if (!isEmpty(paroisses)) {
      setIsLoading(false);
      setParoissesGroupe(paroisses);
    }
    setTimeout(() => {
      setOnPlaceholder(false);
    }, 3000);
  }, [paroisses]);

  const searchParoisse = (e) => {
    setSearchText(e);

    const regex = new RegExp(
      "(?:[^.w]|^|^\\W+)" + e + "(?:[^.w]|\\W(?=\\W+|$)|$)",
      "i"
    );
    const res = paroisses.filter((v) => regex.test(v.name));

    setParoissesGroupe(res);

    console.log(res);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="paroisses-container">
          <header className="paroisses-header">
            <NavLink to="/">
              <img src="../imgs/icon.png" alt="logo" />
            </NavLink>
            <h1>Paroisses</h1>
          </header>

          <div className="paroisses-blocks-container">
            {isEmpty(paroisses[0]) || onPlaceholder ? (
              <>
                {holder.map((holder, idx) => (
                  <div className="card" key={idx}>
                    <div className="card_load"></div>
                    <div className="card_load-content">
                      <div className="card_load_extreme_title"></div>
                      <div className="card_load_extreme_descripion"></div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                <div className="search-container">
                  <input
                    type="text"
                    value={searchText}
                    onChange={(e) => searchParoisse(e.target.value)}
                    placeholder="Chercher une Paroisse..."
                  />
                </div>
                {paroissesGroupe.map((paroisse) => (
                  <>
                    <NavLink
                      to={`/paroisse/${paroisse._id}`}
                      className="paroisse-card"
                      key={paroisse._id}
                    >
                      <div className="paroisse-card-img">
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
                      <div className="paroisse-card-content">
                        <div className="paroisse-card-title">
                          {paroisse.name}
                        </div>
                        <div className="paroisse-card-descripion">
                          <div>Province : {paroisse.province}</div>
                          <div>Diocèse : {paroisse.diocese}</div>
                        </div>
                      </div>
                    </NavLink>
                  </>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Paroisses;
