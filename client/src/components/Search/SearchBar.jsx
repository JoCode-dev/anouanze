import React from "react";
import { useState, useEffect } from "react";
import List from "./List";
import { getAllParoisse } from "../../actions/paroisse";
import { useDispatch, useSelector } from "react-redux";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [onType, setOnType] = useState(false);
  const [text, setTest] = useState("");

  useEffect(() => {
    dispatch(getAllParoisse());
  }, []);

  useEffect(() => {
    if (text === "") {
      setOnType(false);
    }
  }, [text]);
  const handleSearch = (e) => {
    setOnType(true);
    setTest(e);
  };
  return (
    <div className="SearchBar-container">
      <div className="SearchBar">
        <input
          type="text"
          placeholder="Chercher une paroisse"
          onChange={(e) => handleSearch(e.target.value)}
          onClick={() => setOnType(true)}
        />
      </div>
      {onType && <List textSearch={text} />}
    </div>
  );
};

export default SearchBar;
