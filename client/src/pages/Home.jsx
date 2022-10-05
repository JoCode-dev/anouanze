import React, { useState } from "react";
import { useSelector } from "react-redux";

import NavBar from "../components/NavBar/NavBar";
import Carousel from "../components/Carousel/Carousel";
import MapComponent from "../components/Map/Map";
import Footer from "../components/Footer/Footer";
import MaParoisse from "../components/MaParoisse/MaParoisse";
import DemandeMesses from "../components/DemandeMesses/DemandeMesses";
import SearchBar from "../components/Search/SearchBar";

import DiocesesBloc from "../components/Home/Bloc Dioceses/DiocesesBloc";
import EventsBloc from "../components/Home/Bloc Events/EventsBloc";
import SubscribeBloc from "../components/Home/Bloc Subscribe/SubscribeBloc";
import { isEmpty } from "../components/utils";

const Home = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <div className="home-container">
      <NavBar value={"Accueil"} />
      <SearchBar />
      <Carousel />
      <MapComponent />
      {user?._paroisse !== "" && <MaParoisse id={user?._paroisse} />}
      <DiocesesBloc />
      <DemandeMesses />
      <EventsBloc />
      {isEmpty(user) && <SubscribeBloc />}

      <Footer dot="" />
    </div>
  );
};

export default Home;
