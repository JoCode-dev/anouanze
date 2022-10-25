import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import SearchBar from "../components/Search/SearchBar";
import NavBar from "../components/NavBar/NavBar";
import { isEmpty } from "../components/utils";

const sortParoisses = (arr, name) => {
  return (
    !isEmpty(arr) &&
    arr.filter((el) => el.diocese.toLowerCase().includes(name.toLowerCase()))
  );
};

const renderParoisses = (paroissesFounded) => {
  return (
    <div className="table-body">
      {!isEmpty(paroissesFounded) ? (
        paroissesFounded.map((el) => {
          return (
            <NavLink
              to={`/paroisse/${el._id}`}
              key={el._id}
              className="table-row"
            >
              <div>{el.name}</div>
              <div>{el?.address}</div>
              <div>{el?.region}</div>
              <div>{el?.contact}</div>
              <div>{el?.email}</div>
            </NavLink>
          );
        })
      ) : (
        <div className="paroisse-no-found">
          Aucune paroisse enregistrée dans ce Diocèse pour le moment !
        </div>
      )}
    </div>
  );
};

const Diocese = (props) => {
  const { name } = useParams();

  const paroisses = useSelector((state) => state.paroisses);
  const user = useSelector((state) => state.user?.user);
  const paroissesFounded = sortParoisses(paroisses, name);

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
      if (paroissesFounded[0]?.province[0] === voy[i]) {
        bool = true;
        break;
      } else {
        bool = false;
      }
    }

    return bool === true
      ? `d'${paroissesFounded[0]?.province}`
      : `de ${paroissesFounded[0]?.province}`;
  };

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, [user]);

  return (
    <>
      <NavBar value={"Paroisses"} />
      <SearchBar />
      <div className="diocese-container">
        <div className="file-arianne">
          <NavLink to="/provinces" className="file-ariane-element">
            <h1>Diocèses et Paroisses</h1>
          </NavLink>
          <NavLink to="/provinces" className="file-ariane-element">
            <h1>Province écclésiastique {sendProvinceName()}</h1>
          </NavLink>
          <div className="file-ariane-element">
            <h1>{sendName()}</h1>
          </div>
        </div>

        <div className="table-container">
          <div className="table-header">
            <div>Nom</div>
            <div>Adresse Postale</div>
            <div>Region</div>
            <div>Contact</div>
            <div>Email</div>
          </div>
          {!isEmpty(paroisses) && renderParoisses(paroissesFounded)}
        </div>
      </div>
    </>
  );
};

export default Diocese;
