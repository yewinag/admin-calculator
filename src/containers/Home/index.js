import React, { useReducer, useEffect } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Form from "../../components/Form";
import LocationTable from "../../components/LocationTable";
import TotalResults from "../../components/TotalResults";
import SuccessAlert from "../../components/SuccessAlert";
import { Container, Row, Col, Button, Card, Alert } from "reactstrap";

import "../../styles/home.scss";
import axios from "axios";
import { API_URL } from "../../constants";
import WarningWrapper from "../../components/WarningWrapper";
import moment from "moment";
import { getLocationList } from "../../utils/helper";

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
  cart: {
    isSubmitting: false,
    data: null,
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
            location: null,
          },
        },
        ...{
          selectedLocationList: {
            data: [],
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
    case "CLEAR_LOCATION_ITEM":
      return {
        ...state,
        ...{
          selectedLocationList: {
            data: [],
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
    case "SUBMITTING":
      return {
        ...state,
        ...{
          cart: {
            isSubmitting: true,
          },
        },
      };
    case "SENT_CART":
      return {
        ...state,
        ...{
          cart: {
            isSubmitting: false,
            data: action.payload,
          },
        },
        ...{
          selected: {
            product: null,
            date: null,
            location: null,
          },
        },
        ...{
          selectedLocationList: {
            data: [],
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

  const handleSubmit = () => {
    dispatch({ type: "SUBMITTING" });
    const payload = {
      date: moment().format("YYYY MMMM DD"),
      product: state.selected.product && parseInt(state.selected.product.id),
      locations: getLocationList(state.selectedLocationList.data),
    };
    const submitCart = async () => {
      try {
        const res = await axios({
          method: "post",
          url: `${API_URL}/cart`,
          data: payload,
        });
        dispatch({ type: "SENT_CART", payload: res });
      } catch (error) {
        console.log(error);
      }
    };
    submitCart();
  };
  return (
    <div className="home">
      <ResourceContext.Provider value={{ state, dispatch }}>
        <Header />
        <Container className="pt-5">
          <WarningWrapper />
          <SuccessAlert />
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
                    <Button
                      onClick={() => handleSubmit()}
                      className="submit-btn"
                      disabled={
                        !state.selected.product ||
                        !state.selected.date ||
                        state.selectedLocationList.data.length == 0
                      }
                    >
                      {state.cart.isSubmitting ? "loading..." : "Submit"}
                    </Button>
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
