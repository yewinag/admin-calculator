import React, { useState, useContext, useEffect } from "react";
import { Table, Row, Col, Button, Modal } from "reactstrap";
import Map from "../Map";
import { ResourceContext } from "../../containers/Home";
import LocationItem from "../LocationItem";
import "../../styles/result-table.scss";

function LocationTable() {
  const [modal, setModal] = useState(false);
  const resources = useContext(ResourceContext);
  const toggle = () => setModal(!modal);

  const { locations, selected, selectedLocationList } = resources.state;
  const { dispatch } = resources;

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
                  <Button onClick={toggle} className="add-btn" size="sm">
                    ADD
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>
              {selectedLocationList.data.length > 0 &&
              !selectedLocationList.data[0].hasOwnProperty("isErr")
                ? selectedLocationList.data.map((item, index) => (
                    <LocationItem dispatch={dispatch} item={item} key={index} />
                  ))
                : null}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Modal isOpen={modal} toggle={toggle}>
        <Map
          selected={selected}
          locations={locations}
          dispatch={dispatch}
          toggle={toggle}
        />
      </Modal>      
    </>
  );
}

export default LocationTable;
