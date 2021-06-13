import React, { Component } from "react";
import { Button } from "reactstrap";
import * as types from "../../constants/actionTypes";

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
              type: types.REMOVE_SELECTED_LOCATION_ITEM,
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
