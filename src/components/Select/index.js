import React, { useState } from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import '../../styles/select.scss';

function Select() {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);
  return (
    <ButtonDropdown isOpen={open} toggle={toggle}>
      <DropdownToggle className="select-btn" caret>Select Product</DropdownToggle>
      <DropdownMenu>
        <DropdownItem>Product 1</DropdownItem>
        <DropdownItem>Product 2</DropdownItem>
        <DropdownItem>Product 3</DropdownItem>        
        <DropdownItem>Product 4</DropdownItem>
      </DropdownMenu>
    </ButtonDropdown>
  );
}

export default Select;
