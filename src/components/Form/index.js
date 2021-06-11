import React from "react";
import { FormGroup, Input, Label, Row, Col } from "reactstrap";
import Select from "../Select";
import DatePicker from "../DatePicker";
import "../../styles/form.scss";
function Form() {
  return (
    <>
      <Row>        
        <Col md={2}>
          <p for="exampleEmail">Products</p>
        </Col>
        <Col md={10}>
          <Select />
        </Col>
      </Row>
      <Row>        
        <Col md={2}>
          <p for="exampleEmail">Date</p>
        </Col>
        <Col md={10}>
          <DatePicker />
        </Col>
      </Row>
    </>
  );
}

export default Form;
