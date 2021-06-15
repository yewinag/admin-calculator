import React, { useContext, useReducer } from "react";
import { Row, Col } from "reactstrap";
import Select from "../Select";
import DatePicker from "../DatePicker";
import ResourceContext from '../../context';
import "../../styles/form.scss";
function Form() {
  const {
    products,
    selectedProduct,
    selectedLocation,
    selectedDate,
    dispatch,
  } = useContext(ResourceContext);
  return (
    <>
      <Row className="mb-3">
        <Col md={4}>
          <p>Products</p>
        </Col>
        <Col md={8}>
          <Select
            products={products}
            selectedProduct={selectedProduct}
            selectedDate={selectedDate}
            selectedLocation={selectedLocation}
            dispatch={dispatch}
          />
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <p>Date</p>
        </Col>
        <Col md={8}>
          <DatePicker dispatch={dispatch} />
        </Col>
      </Row>
    </>
  );
}

export default Form;
