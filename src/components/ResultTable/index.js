import React from "react";
import { Table, Row, Col, Button } from "reactstrap";

function ResultTable() {
  return (
    <Row>
      <Col md={2}>
        <label>Locations</label>
      </Col>
      <Col md={10}>
        <Table>
          <thead>
            <tr>
              <th>Place</th>
              <th>Units</th>
              <th>Cost</th>
              <th>
                <Button>ADD</Button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>abads</td>
            </tr>            
          </tbody>
        </Table>
      </Col>
    </Row>
  );
}

export default ResultTable;
