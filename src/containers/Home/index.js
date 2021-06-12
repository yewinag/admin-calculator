import React, { useReducer, useEffect } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Form from "../../components/Form";
import ResultTable from "../../components/ResultTable";
import TotalResults from "../../components/TotalResults";

import { Container, Row, Col, Button, Card } from "reactstrap";

import "../../styles/home.scss";
import axios from "axios";
import { API_URL } from "../../constants";

export const ResourceContext = React.createContext(reducer);

const initialState = {
  products: {
    isFetching: false,
    data: [],
    status: null,
  },
  locations: {
    isFetching: false,
    data: [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_PRODUCT":
      return { ...state, ...{ products: { isFetching: true } } };
    case "RECEIVE_PRODUCT":
      return {
        ...state,
        ...{
          products: {
            isFetching: false,
            data: action.payload.data,
            status: action.payload.status,
          },
        },
      };
    case "RECEIVE_PRODUCT_ERR":
      return {
        ...state,
        ...{ products: { isFetching: false, status: action.payload } },
      };
    case "FETCH_LOCATIONS":
      return { ...state, ...{ locations: { isFetching: true } } };
    case "RECEIVE_LOCATIONS":
      return {
        ...state,
        ...{
          locations: {
            isFetching: false,
            data: action.payload.data,
            status: action.payload.status,
          },
        },
      };
    case "RECEIVE_LOCATIONS_ERR":
      return {
        ...state,
        ...{ locations: { isFetching: false, status: action.payload } },
      };
    default:
      throw new Error();
  }
}

function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "FETCH_PRODUCT" });
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/products`);
        dispatch({
          type: "RECEIVE_PRODUCT",
          payload: { data: res.data, status: res.status },
        });
      } catch (error) {
        dispatch({ type: "RECEIVE_PRODUCT_ERR", payload: error });
      }
    };
    fetchProducts();
  }, ["products"]);

  useEffect(() => {
    dispatch({ type: "FETCH_LOCATIONS" });
    const fetchLocations = async () => {
      try {
        const res = await axios.get(`${API_URL}/locations`);
        dispatch({
          type: "RECEIVE_LOCATIONS",
          payload: { data: res.data, status: res.status },
        });
      } catch (error) {
        dispatch({ type: "RECEIVE_LOCATIONS_ERR", payload: error });
      }
    };
    fetchLocations();
  }, ["locations"]);

  return (
    <div className="home">
      <Header />
      <Container className="pt-5">
        <Row>
          <Col md={4}>
            <Card className="form-card">
              <ResourceContext.Provider value={{ state, dispatch }}>
                <Form />
              </ResourceContext.Provider>
            </Card>
          </Col>
          <Col md={8}>
            <Card className="result-card">
              <ResultTable />
              <Row className="m-layout">
                <Col md={12} xs={9} className="m-col-left">
                  <TotalResults />
                </Col>
                <Col md={12} xs={3} className="m-col-right">
                  <Button className="submit-btn">Submit</Button>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default Home;
