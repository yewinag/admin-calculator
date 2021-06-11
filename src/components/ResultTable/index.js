import React from "react";
import { Table, Row, Col, Button } from "reactstrap";
import "../../styles/result-table.scss";

function ResultTable() {
  return (
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
                <Button className="add-btn" size="sm">ADD</Button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td><Button className="close-btn" close></Button></td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row>
  );
}

export default ResultTable;
