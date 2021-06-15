import React, { useReducer, useEffect } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import LocationTable from "../../components/LocationTable";
import TotalResults from "../../components/TotalResults";
import Message from "../../components/Message";
import Select from "../../components/Select";
import DatePicker from "../../components/DatePicker";
import { Container, Row, Col, Card } from "reactstrap";

import axios from "axios";
import { API_URL } from "../../constants";
import * as types from "../../constants/actionTypes";
import reducer from "../../reducers";
import initialState from "../../reducers/initialState";
import SubmitButton from "../../components/SubmitButton";
import "../../styles/home.scss";
import ResourceContext from '../../context';

function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/products`);
        dispatch({
          type: types.FETCH_PRODUCT,
          payload: res.data,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, ["products"]);
  const { products, selectedDate, selectedLocation, selectedProduct } = state;
  return (
    <div className="home">
      <ResourceContext.Provider value={{ state, dispatch }}>
        <Header />
        <Container className="pt-5">
          <Message />
          <Row>
            <Col md={4}>
              <Card className="form-card">
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
              </Card>
            </Col>
            <Col md={8}>
              <Card className="result-card">
                <LocationTable />
                <Row className="m-layout">
                  <Col md={12} xs={9} className="m-col-left">
                    <TotalResults />
                  </Col>
                  <Col md={12} xs={3} className="m-col-right">
                    <SubmitButton />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Container>
        <Footer />
      </ResourceContext.Provider>
    </div>
  );
}

export default Home;
