import React from "react";
import { Card, CardTitle, CardText } from 'reactstrap';
function TotalResults() {
  return (
    <Card body>
        <CardTitle tag="h5">Results</CardTitle>
        <CardText>Costs</CardText>
        <CardText>Units</CardText>
    </Card>
  );
}

export default TotalResults;
