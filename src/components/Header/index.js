import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from "reactstrap";
import { Link } from 'react-router-dom'
import '../../styles/header.scss';

import logo from '../../assets/icons/logo.png';

function Header(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  
  return (
    <div className="container-fluid header">      
      <Navbar light expand="md">
        <div className="col-md-6">
          <NavbarBrand className="title" href="/">
            <img src={logo} />
          </NavbarBrand>
        </div>
        <div className="col-md-6">
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar className="nav-list">
            <Nav className="mr-auto" navbar>
              <NavItem>
                <Link to="/sign-up">Sign Up</Link>
              </NavItem>
              <NavItem>
                <Link to="/login">Login</Link>
              </NavItem>
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    </div>
  );
}

export default Header;
