import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Form from "../../components/Form";
import ResultTable from "../../components/ResultTable";
import TotalResults from "../../components/TotalResults";

import { Container, Row, Col, Button } from "reactstrap";

import "../../styles/home.scss";
function Home() {
  return (
    <div className="home">
      <Header />
      <Container>
        <Row>
          <Col md={8}>
            <Form />
            <ResultTable />
            <Row className="m-layout">
              <Col md={12} xs={9} className="m-col-left">
                <TotalResults />
              </Col>
              <Col md={12} xs={3} className="m-col-right">
                <Button className="submit-btn" color="success">Submit</Button>
              </Col>
            </Row>            
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default Home;
