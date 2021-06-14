import React from "react";
import GoogleMapReact from "google-map-react";
import { API_KEY } from "../../constants";
import MapMarker from "../MapMarker";

function Map(props) {
  const defaultProps = {
    center: {
      lat: 13.7370587,
      lng: 100.5603061,
    },
    zoom: 13,
  };
  const { locations } = props;
  return (
    <div style={{ height: "80vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {locations.data.map((location, index) => (
          <MapMarker
            key={index}
            lat={location.lat}
            lng={location.long}
            location={location}
            dispatch={props.dispatch}
            toggle={props.toggle}
            selected={props.selected} // selected state from reducer
          />
        ))}
      </GoogleMapReact>
    </div>
  );
}

export default Map;
