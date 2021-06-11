import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Form from "../../components/Form";
import ResultTable from "../../components/ResultTable";
import TotalResults from "../../components/TotalResults";

import { Container, Row, Col, Button } from 'reactstrap';

import "../../styles/home.scss";
function Home() {
  return (
    <div className="home">
      <Header />
      <Container>
        <Row>
        <Col md={6}>
          <Form />
          <ResultTable />
          <TotalResults />
        </Col>
        </Row>
        <Button color="success">Submit</Button>
      </Container>
      <Footer />
    </div>
  );
}

export default Home;
