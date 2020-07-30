import React, { Component } from "react";
import { withScriptjs } from "react-google-maps";
import Map from "./Map";

const MapViewer = (props) => {
  console.log();
  const MapLoader = withScriptjs((props) => (
    <Map order={props.order} {...props} />
  ));

  return (
    <MapLoader
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
      loadingElement={<div style={{ height: `100%` }} />}
    />
  );
};

export default MapViewer;
