import React, { useReducer, useEffect } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Form from "../../components/Form";
import LocationTable from "../../components/LocationTable";
import TotalResults from "../../components/TotalResults";
import Message from "../../components/Message";
import { Container, Row, Col, Card } from "reactstrap";

import axios from "axios";
import { API_URL } from "../../constants";
import * as types from '../../constants/actionTypes';
import reducer from "../../reducers";
import initialState from "../../reducers/initialState";
import SubmitButton from "../../components/SubmitButton";
import "../../styles/home.scss";

export const ResourceContext = React.createContext();

function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: types.FETCH_PRODUCT });
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/products`);
        dispatch({
          type: types.RECEIVE_PRODUCT,
          payload: { data: res.data},
        });
      } catch (error) {
        dispatch({ type: types.RECEIVE_PRODUCT_ERR, payload: error });
      }
    };
    fetchProducts();
  }, ["products"]);

  return (
    <div className="home">
      <ResourceContext.Provider value={{ state, dispatch }}>
        <Header />
        <Container className="pt-5">
          <Message />
          <Row>
            <Col md={4}>
              <Card className="form-card">
                <Form />
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
