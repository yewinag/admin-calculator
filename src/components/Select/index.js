import React, { useState } from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "../../styles/select.scss";

function Select(props) {
  const [open, setOpen] = useState(false);
  const [selected, setselected] = useState("");
  const toggle = () => setOpen(!open);
  const { products, dispatch } = props;
  return (
    <ButtonDropdown className="select-layout" isOpen={open} toggle={toggle}>
      <DropdownToggle className="select-btn" caret>
        {selected ? selected : "Select Product"} <span className="icon" />
      </DropdownToggle>
      <DropdownMenu>
        {products.data ? (
          products.data.map((item, index) => (
            <DropdownItem onClick={() => setselected(item.name)} key={index}>
              {item.name}
            </DropdownItem>
          ))
        ) : (
          <DropdownItem disabled />
        )}
      </DropdownMenu>
    </ButtonDropdown>
  );
}

export default Select;
