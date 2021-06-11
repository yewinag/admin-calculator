import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Form from "../../components/Form";
import ResultTable from "../../components/ResultTable";
import TotalResults from "../../components/TotalResults";

import { Container, Row, Col, Button, Card } from "reactstrap";

import "../../styles/home.scss";
function Home() {
  return (
    <div className="home">
      <Header />
      <Container className="pt-5">
        <Row>
          <Col md={4}>
            <Card className="form-card">
              <Form />
            </Card>
          </Col>
          <Col md={8}>
            <Card className="result-card">
            <ResultTable />
            <Row className="m-layout">
              <Col md={12} xs={9} className="m-col-left">
                <TotalResults />
              </Col>
              <Col md={12} xs={3} className="m-col-right">
                <Button className="submit-btn">
                  Submit
                </Button>
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
