'use client'
import { Col, Row, Card, Tab, Nav, Container, Button, Form, } from "react-bootstrap";
import "./Checkbox.css";
import Menu from "./Menu";
import Header from "./Header";
import Widget from "./Widget";
import NewsCategory from "./NewsCategory";

const Badges = () => {
  return (
    <Container fluid className="p-6 input_hidden">
      <Row>
        <Col xl={12}>
          <Tab.Container defaultActiveKey="header">
            <Card>
              <Card.Header className="border-bottom-0 p-0">
                <Nav className="nav-lb-tab">
                  <Nav.Item>
                    <Nav.Link eventKey="header">Header</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="widget">Widget</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="menu">Menu</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="news-category">News Category</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Header>

              <Card.Body className="p-0">
                <Tab.Content>
                  <Tab.Pane eventKey="header" className="p-4">
                    <Header/>
                  </Tab.Pane>

                  <Tab.Pane eventKey="widget" className="p-4">
                    <Widget/>
                  </Tab.Pane>

                  <Tab.Pane eventKey="menu" className="p-4">
                    <Menu/>
                  </Tab.Pane>
                  <Tab.Pane eventKey="news-category" className="p-4">
                    <NewsCategory/>
                  </Tab.Pane>
                </Tab.Content>
              </Card.Body>
            </Card>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
    
  );
};



export default Badges;
