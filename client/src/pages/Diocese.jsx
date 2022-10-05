import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import SearchBar from "../components/Search/SearchBar";
import NavBar from "../components/NavBar/NavBar";

const Diocese = (props) => {
  const { name } = useParams();

  useEffect(() => {
    console.log("====================================");
    console.log(name);
    console.log("====================================");
  }, []);

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

  return (
    <>
      <NavBar value={"Paroisses"} />
      <SearchBar />
      <div>
        <h1>{sendName()}</h1>
      </div>
    </>
  );
};

export default Diocese;
