import React, { useReducer, useEffect } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Form from "../../components/Form";
import LocationTable from "../../components/LocationTable";
import TotalResults from "../../components/TotalResults";

import { Container, Row, Col, Button, Card } from "reactstrap";

import "../../styles/home.scss";
import axios from "axios";
import { API_URL } from "../../constants";
import WarningAlert from "../../components/WarningAlert";
import WarningWrapper from "../../components/WarningWrapper";

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
  selected: {
    product: null,
    location: null,
    date: null,
  },
  selectedLocationList: {
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
    case "SELECT_PRODUCT":
      return {
        ...state,
        ...{
          selected: {
            product: action.payload,
            date: state.selected.date,
            location: state.selected.location,
          },
        },
      };
    case "SELECTED_DATE":
      return {
        ...state,
        ...{
          selected: {
            product: state.selected.product,
            date: action.payload,
            location: state.selected.location,
          },
        },
      };
    case "SELECT_LOCATION":
      return {
        ...state,
        ...{
          selected: {
            product: state.selected.product,
            date: state.selected.date,
            location: action.payload,
          },
        },
      };
    case "ADD_LOCATION_ITEM":
      return {
        ...state,
        ...{
          selectedLocationList: {
            data: [...state.selectedLocationList.data, action.payload],
          },
        },
      };
    case "REMOVE_SELECTED_LOCATION_ITEM":
      const res = state.selectedLocationList.data.filter(
        (item) => item.id != action.payload
      );
      return {
        ...state,
        ...{
          selectedLocationList: {
            data: res,
          },
        },
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
        <ResourceContext.Provider value={{ state }}>
          <WarningWrapper />
        </ResourceContext.Provider>
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
              <ResourceContext.Provider value={{ state, dispatch }}>
                <LocationTable />
              </ResourceContext.Provider>
              <Row className="m-layout">
                <Col md={12} xs={9} className="m-col-left">
                  <ResourceContext.Provider value={{ state }}>
                    <TotalResults />
                  </ResourceContext.Provider>
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
