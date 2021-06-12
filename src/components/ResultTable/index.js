import React, { useState, useContext } from "react";
import { Table, Row, Col, Button, Modal } from "reactstrap";
import Map from "../Map";
import { ResourceContext } from "../../containers/Home";
import "../../styles/result-table.scss";

function ResultTable() {
  const [modal, setModal] = useState(false);
  const resources = useContext(ResourceContext);
  const toggle = () => setModal(!modal);

  const { locations } = resources.state;
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
              <tr>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>
                  <Button className="close-btn" close></Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
      <Modal isOpen={modal} toggle={toggle}>
        <Map locations={locations} dispatch={dispatch} toggle={toggle} />
      </Modal>
    </>
  );
}

export default ResultTable;
