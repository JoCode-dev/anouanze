import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllParoisse } from "../../actions/paroisse";
import { isEmpty } from "../utils/index";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "../Map/Marker";

const ParoissesBoard = () => {
  const [toggleForm, setToggleForm] = useState(false);
  const [userCoords, setUserCoords] = useState({});
  const [coordinates, setCoordinates] = useState({});

  const dispatch = useDispatch();
  const paroisses = useSelector((state) => state.paroisses);

  const defaultProps = {
    center: {
      lat: 5.30338066581707,
      lng: -3.9515431999999993,
    },
    zoom: 15,
  };

  const apiKey = "AIzaSyBwwRjHA3A4j64wjjtRgKfhviBkvz9psYE";

  const hours = {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  };

  useEffect(() => {
    dispatch(getAllParoisse());
  }, [dispatch]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
        setUserCoords({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  const setPosition = (e) => {
    setCoordinates({
      lat: e.center.lat,
      lng: e.center.lng,
    });
    setUserCoords({
      lat: e.center.lat,
      lng: e.center.lng,
    });
  };

  const mapStyles = [];

  return (
    <>
      {toggleForm && (
        // Form elements
        <div className="form-container">
          <div className="form-group-container">
            <div className="container-header">
              <h1>Fiche Paroisse</h1>

              <div
                className="form-closer"
                onClick={() => setToggleForm(!toggleForm)}
              >
                Fermer
              </div>
            </div>

            <div className="form-elements-container">
              <form>
                <div className="form-group">
                  <label htmlFor="name">Nom</label>
                  <input htmlFor="name" placeholder="Nom" />
                </div>
                <div className="form-group-group">
                  <div className="form-group">
                    <label htmlFor="province">Province</label>
                    <input htmlFor="province" placeholder="Province" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="diocese">Diocèse</label>
                    <input htmlFor="diocese" placeholder="Diocèse" />
                  </div>
                </div>
                <div className="form-group-group">
                  <div className="form-group">
                    <label htmlFor="address">Adresse</label>
                    <input htmlFor="address" placeholder="Adresse" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact">Contact</label>
                    <input htmlFor="contact" placeholder="Contact" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input htmlFor="email" placeholder="Email" />{" "}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="history">Histoire</label>
                  <textarea htmlFor="history" placeholder="Histoire" />
                </div>
                {/* Important! Always set the container height explicitly */}
                <div className="location-container">
                  <h1>Localisation Géographique</h1>
                  <div className="location-map-container">
                    <GoogleMapReact
                      bootstrapURLKeys={{ key: apiKey }}
                      defaultCenter={defaultProps.center}
                      defaultZoom={defaultProps.zoom}
                      margin={[50, 50, 50, 50]}
                      options={{
                        disableDefaultUI: true,
                        zoomControl: true,
                        styles: mapStyles,
                      }}
                      onChange={(e) => {
                        setPosition(e);
                      }}
                    >
                      <Marker lat={userCoords.lat} lng={userCoords.lng} />
                    </GoogleMapReact>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="paroisses-board-container">
        <div className="header">
          <h1>Paroisses</h1>
        </div>

        <div className="paroisses-container">
          <div
            className="paroisse-add-element"
            onClick={() => setToggleForm(!toggleForm)}
          >
            <img
              src={process.env.PUBLIC_URL + "/imgs/icons/add.png"}
              alt={"add"}
            />
          </div>
          {!isEmpty(paroisses) &&
            paroisses.map((element, i) => (
              <div className="paroisse-element" key={i}>
                <div className="paroisse-infos">
                  <div className="paroisse-infos-image">
                    {element?.pictures[0] ? (
                      <img
                        src={process.env.PUBLIC_URL + element.pictures[0]}
                        alt={element.name}
                      />
                    ) : (
                      <img
                        src={process.env.PUBLIC_URL + "/imgs/icon.png"}
                        alt={element.name}
                      />
                    )}{" "}
                  </div>
                  <div className="paroisse-infos-name">
                    <h4>{element.name}</h4>
                    <h6>
                      {element.diocese} - {element.province}
                    </h6>
                  </div>
                </div>
                <div className="paroisse-element-footer">
                  <NavLink
                    to={`/paroisse/${element._id}`}
                    className="footer-view"
                  >
                    <img
                      src={process.env.PUBLIC_URL + "/imgs/icons/eye.png"}
                      alt={"edit"}
                    />
                  </NavLink>{" "}
                  <div className="footer-edit">
                    <img
                      src={process.env.PUBLIC_URL + "/imgs/icons/edit.png"}
                      alt={"edit"}
                    />
                  </div>
                  <div className="footer-delete">
                    <img
                      src={process.env.PUBLIC_URL + "/imgs/icons/trash.png"}
                      alt={"delete"}
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ParoissesBoard;
