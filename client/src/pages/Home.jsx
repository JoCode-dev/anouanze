import React from "react";

import NavBar from "../components/NavBar/NavBar";
import Carousel from "../components/Carousel/Carousel";
import MapComponent from "../components/Map/Map";
import Footer from "../components/Footer/Footer";
import MaParoisse from "../components/MaParoisse/MaParoisse";

const Home = () => {
  return (
    <div className="home-container">
      <NavBar />
      <Carousel />
      <MapComponent />
      <MaParoisse />

      <Footer dot="" />
    </div>
  );
};

export default Home;
