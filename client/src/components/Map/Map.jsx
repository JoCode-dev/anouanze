import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";

import { getNearParoisses } from "../../actions/paroisse";

import { useDispatch, useSelector } from "react-redux";

import List from "./List/List";
import Marker from "./Marker";
import ParoisseMarker from "./ParoisseMarker";

import mapStyles from "./mapStyles";

import { isEmpty } from "../utils";

const Map = () => {
  const [shistApi] = useState(true);
  const [userCoords, setUserCoords] = useState({});
  const [coordinates, setCoordinates] = useState({});
  const [onLoading, setOnLoading] = useState(true);
  let coords = "";

  const dispatch = useDispatch();
  const paroisses = useSelector((state) => state.nearParoisses);
  const apiKey = shistApi && "AIzaSyBwwRjHA3A4j64wjjtRgKfhviBkvz9psYE";

  const [paroisseCoords, setParoisseCoords] = useState({
    lat: !isEmpty(paroisses)
      ? paroisses?.result[0]?.location.coordinates[0]
      : null,
    lng: !isEmpty(paroisses)
      ? paroisses?.result[0]?.location.coordinates[1]
      : null,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
        setUserCoords({ lat: latitude, lng: longitude });
        console.log(coordinates);
      }
    );

    setTimeout(() => {
      setOnLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    coords = coordinates.lat + ";" + coordinates.lng;
    dispatch(getNearParoisses(coords));
  }, [coordinates]);

  const handleParoisseCoords = (coords) => {
    setParoisseCoords({ lat: coords[0], lng: coords[1] });
  };

  return (
    <div className="map-container">
      <div className="map-list-container">
        <h1>Près de Chez vous</h1>
        {!isEmpty(paroisses.result) ? (
          <List paroisses={paroisses.result} />
        ) : (
          <>
            <h2>Aucun Résultat pour cette zone</h2>{" "}
          </>
        )}
      </div>
      <div className="map-container">
        {onLoading ? (
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          <GoogleMapReact
            bootstrapURLKeys={{ key: apiKey }}
            defaultCenter={coordinates}
            center={coordinates}
            defaultZoom={15}
            margin={[50, 50, 50, 50]}
            options={{
              disableDefaultUI: true,
              zoomControl: true,
              styles: mapStyles,
            }}
            onChange={(e) => {
              console.log(e);
              setCoordinates({ lat: e.center.lat, lng: e.center.lng });
            }}
            //onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
            yesIWantToUseGoogleMapApiInternals={true}
          >
            <Marker lat={userCoords.lat} lng={userCoords.lng} />

            {paroisses.result?.map((paroisses, idx) => (
              <ParoisseMarker
                lat={paroisses.location.coordinates[0]}
                lng={paroisses.location.coordinates[1]}
                key={idx}
              />
            ))}
          </GoogleMapReact>
        )}
      </div>
    </div>
  );
};

export default Map;
