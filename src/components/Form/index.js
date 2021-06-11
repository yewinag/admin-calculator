import React from "react";
import { FormGroup, Input, Label, Row, Col } from "reactstrap";
import Select from "../Select";
import DatePicker from "../DatePicker";
import "../../styles/form.scss";
function Form() {
  return (
    <>
      <Row className="mb-3">        
        <Col md={4}>
          <p>Products</p>
        </Col>
        <Col md={8}>
          <Select />
        </Col>
      </Row>
      <Row>        
        <Col md={4}>
          <p>Date</p>
        </Col>
        <Col md={8}>
          <DatePicker />
        </Col>
      </Row>
    </>
  );
}

export default Form;
