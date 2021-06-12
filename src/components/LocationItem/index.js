import React, { Component } from "react";
import { Button } from "reactstrap";

function LocationItem(props) {
  return (
    <tr>
      <td>{props.item.name}</td>
      <td>{props.item.total_unit}</td>
      <td>{props.item.total_cost}</td>
      <td>
        <Button
          onClick={() =>
            props.dispatch({
              type: "REMOVE_SELECTED_LOCATION_ITEM",
              payload: props.item.id,
            })
          }
          className="close-btn"
          close
        ></Button>
      </td>
    </tr>
  );
}
export default LocationItem;
