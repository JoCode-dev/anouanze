import React, { useState } from "react";

import NavBar from "../components/NavBar/NavBar";
import Carousel from "../components/Carousel/Carousel";
import MapComponent from "../components/Map/Map";
import Footer from "../components/Footer/Footer";
import MaParoisse from "../components/MaParoisse/MaParoisse";
import DemandeMesses from "../components/DemandeMesses/DemandeMesses";
import VerseDay from "../components/VerseDay/VerseDay";

const Home = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("jwt")));
  return (
    <div className="home-container">
      <NavBar />
      <VerseDay />
      <Carousel />
      <MapComponent />
      {user?.result?._paroisse !== "" && (
        <MaParoisse id={user?.result?._paroisse} />
      )}

      <DemandeMesses />
      <Footer dot="" />
    </div>
  );
};

export default Home;
