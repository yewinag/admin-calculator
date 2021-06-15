import React, { useContext } from "react";
import GoogleMapReact from "google-map-react";
import { ResourceContext } from "../../containers/Home";
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
  const {
    state: { locations },
    dispatch,
  } = useContext(ResourceContext);
  return (
    <div style={{ height: "80vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {locations.map((location, index) => (
          <MapMarker
            key={index}
            lat={location.lat}
            lng={location.long}
            location={location}
            toggle={props.toggle}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
}

export default Map;
