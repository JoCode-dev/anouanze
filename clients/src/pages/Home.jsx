import React from "react";

import NavBar from "../components/NavBar/NavBar";
import Carousel from "../components/Carousel/Carousel";
import MapComponent from "../components/Map/Map";
import Footer from "../components/Footer/Footer";

const Home = () => {
  return (
    <div className="home-container">
      <NavBar />
      <Carousel />
      <MapComponent />

      <Footer dot="" />
    </div>
  );
};

export default Home;
