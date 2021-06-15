import React, { useContext, useState } from "react";
import { Popover, PopoverHeader, PopoverBody } from "reactstrap";
import { calculatePrice, isError, isErrorMsg } from "../../utils/helper";
import * as types from "../../constants/actionTypes";
import ResourceContext from "../../context";
import flag from "../../assets/icons/placeholder.png";

import "../../styles/map-marker.scss";

function MapMarker(props) {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  const {
    state: { selectedProduct, selectedDate },
    dispatch,
  } = useContext(ResourceContext);

  const handleAddLocation = () => {
    dispatch({ type: types.SELECT_LOCATION, payload: location }); // add current location item        
    isError(selectedProduct, location, selectedDate)
      ? dispatch({
          type: types.ADD_ERROR_MSG,
          payload: isErrorMsg(selectedProduct, location, selectedDate),
        })
      : dispatch({
          type: types.ADD_LOCATION_ITEM,
          payload: calculatePrice(selectedProduct, location, selectedDate), // add current location
        }); // push item included total price for each location item
    props.toggle();
  };
  const { location } = props;
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
