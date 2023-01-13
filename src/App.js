import React, { useState } from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import * as parksData from "./data/location-perks.json";
import "./App.css";

function Map() {
  const [selectedPark, setSelectedPark] = useState(null);

  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 45.421532, lng: -75.697189 }}
    >
      {parksData.features.map((park) => (
        <Marker
          key={park.properties.PARK_ID}
          position={{
            lat: park.geometry.coordinates[1],
            lng: park.geometry.coordinates[0],
          }}
          onClick={() => {
            setSelectedPark(park);
          }}
          /* icon={{
            url: "/image.png",
            scaledSize: new window.google.maps.Size(25, 25),  aqui podriamos poner un icono a los marcadores
          }} */
        />
      ))}
      {selectedPark && (
        <InfoWindow
          position={{
            lat: selectedPark.geometry.coordinates[1],
            lng: selectedPark.geometry.coordinates[0],
          }}
          onCloseClick={() => {
            setSelectedPark(null);
          }}
        >
          <div>
            <h1>{selectedPark.properties.NAME}</h1>
            <p>{selectedPark.properties.DESCRIPTIO}</p>
            <p>{selectedPark.properties.FACILITY}</p>
            <p>{selectedPark.properties.FACILITY_F}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

function App() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <WrappedMap
        /* googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.API_KEY}`} */
        /* googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places`} */
        /* googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places" */
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDoz2SHkwEIzGjGC61i6YNwY3W036WFFsg&callback=initMap"
        loadingElement={<div style={{ height: "0%" }} />}
        containerElement={<div style={{ height: "100%" }} />}
        mapElement={<div style={{ height: "100%" }} />}
      />
    </div>
  );
}

export default App;
