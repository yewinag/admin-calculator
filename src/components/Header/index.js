import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import '../../styles/header.scss';

function Header(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className="container-fluid header">
      <Navbar light expand="md">
        <div className="col-md-6">
          <NavbarBrand className="title" href="/">Rabbit</NavbarBrand>
        </div>
        <div className="col-md-6">
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar className="nav-list">
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/sign-up">Sign Up</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/register">Register</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    </div>
  );
}

export default Header;
