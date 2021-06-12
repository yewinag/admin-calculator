import React, { useState } from "react";
import { Popover, PopoverHeader, PopoverBody } from "reactstrap";

import flag from "../../assets/icons/placeholder.png";
import "../../styles/map-marker.scss";
import { calculatePrice } from "../../utils/helper";
function MapMarker(props) {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  const { location, selected } = props;

  const handleAddLocation = () => {
    props.dispatch({ type: "SELECT_LOCATION", payload: location }); // add current location item
    props.dispatch({
      type: "ADD_LOCATION_ITEM",
      payload: calculatePrice(
        selected.product,
        location, // add current location
        selected.date
      ),
    }); // push item included total price for each location item
    props.toggle();
  };
  return (
    <>
      <div id={`popover${location.id}`}>
        <img src={flag} />
      </div>
      <Popover
        placement="top"
        isOpen={popoverOpen}
        target={`popover${location.id}`}
        toggle={toggle}
        className="marker-popover"
      >
        <PopoverHeader className="marker-popover-title">
          {location.name}
        </PopoverHeader>
        <PopoverBody>
          <div className="marker-info-layout">
            <p>Max Units: </p>
            <p>{location.max_dist}</p>
          </div>
          <div className="marker-info-layout">
            <p>Fee: </p>
            <p>{location.fee}</p>
          </div>
          <div className="marker-info-layout">
            <button className="marker-add" onClick={() => handleAddLocation()}>
              ADD
            </button>
          </div>
        </PopoverBody>
      </Popover>
    </>
  );
}

export default MapMarker;
