import React, { useState, useContext } from "react";
import { Table, Row, Col, Button, Modal } from "reactstrap";
import Map from "../Map";
import axios from "axios";
import ResourceContext from '../../context';
import LocationItem from "../LocationItem";
import { API_URL } from "../../constants";
import * as types from "../../constants/actionTypes";
import "../../styles/location-table.scss";

function LocationTable() {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const {
    state: { selectedLocationList },
    dispatch,
  } = useContext(ResourceContext);

  const handleFetchLocation = () => {
    const fetchLocations = async () => {
      try {
        const res = await axios.get(`${API_URL}/locations`);
        dispatch({
          type: types.FETCH_LOCATIONS,
          payload: res.data,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchLocations();
  };

  const handleShowMap = () => {
    toggle();
    handleFetchLocation();
  };

  return (
    <>
      <Row>
        <Col md={2}>
          <p>Locations</p>
        </Col>
        <Col md={10}>
          <Table>
            <thead>
              <tr>
                <th>Place</th>
                <th>Units</th>
                <th>Cost</th>
                <th className="header-action">
                  <Button onClick={handleShowMap} className="add-btn" size="sm">
                    ADD
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>
              {selectedLocationList.length > 0 &&
              !selectedLocationList[0].hasOwnProperty("isErr")
                ? selectedLocationList.map((item, index) => (
                    <LocationItem dispatch={dispatch} item={item} key={index} />
                  ))
                : null}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Modal isOpen={modal} toggle={toggle}>
        <Map toggle={toggle} />
      </Modal>
    </>
  );
}

export default LocationTable;
