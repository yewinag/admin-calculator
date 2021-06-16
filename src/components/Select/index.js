import React, { useState, useContext } from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import ResourceContext from "../../context";
import * as types from "../../constants/actionTypes";

import "../../styles/select.scss";

function Select() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const {
    state: { products },
    dispatch,
  } = useContext(ResourceContext);
  const toggle = () => setOpen(!open);
  const handleClickItem = (val) => {
    setSelected(val.name);
    dispatch({ type: types.SELECT_PRODUCT, payload: val }); // add product to global state
  };
  return (
    <ButtonDropdown className="select-layout" isOpen={open} toggle={toggle}>
      <DropdownToggle className="select-btn" caret>
        {selected ? selected : "Select Product"}
        <span className="icon" />
      </DropdownToggle>
      <DropdownMenu>
        {!!products ? (
          products.map((item, index) => (
            <DropdownItem onClick={() => handleClickItem(item)} key={index}>
              {item.name}
            </DropdownItem>
          ))
        ) : (
          <span>loading...</span>
        )}
      </DropdownMenu>
    </ButtonDropdown>
  );
}

export default Select;
