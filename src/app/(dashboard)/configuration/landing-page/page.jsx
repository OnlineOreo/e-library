"use client";

import { Col, Row, Card, Tab, Nav, Container } from "react-bootstrap";
import { useState } from "react";
import "./Checkbox.css";

const Badges = () => {
  const checklists = [
    "Dance",
    "Music",
    "Movie",
    "Travelling",
    "Writing",
    "Cooking",
    "Drawing",
    "Singing",
  ];

  const [checkedModelList, setCheckedModelList] = useState([]);

  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    setCheckedModelList((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };


  const onChangeModel = (e) => {
    const ischecked = e.target.checked;
    const dataid = e.target.dataset.id;
    if (dataid === "checkall") {
      if (ischecked === true) {
        setCheckedModelList(checklists);
      } else {
        setCheckedModelList([]);
      }
    } else {
      if (ischecked === true) {
        setCheckedModelList((prevalue) => [...prevalue, dataid]);
      } else {
        const resultfilter = checkedModelList.filter((d, index) => {
          return d !== dataid;
        });
        setCheckedModelList(resultfilter);
      }
    }
  };

  return (
    <Container fluid className="p-6">
      {/* Contextual  badges   */}
      <Row>
        <Col xl={12} lg={12} md={12} sm={12}>
          <Tab.Container id="tab-container-1" defaultActiveKey="header">
            <Card>
              <Card.Header className="border-bottom-0 p-0 ">
                <Nav className="nav-lb-tab">
                  <Nav.Item>
                    <Nav.Link eventKey="header" className="mb-sm-3 mb-md-0">
                      Header
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="widget" className="mb-sm-3 mb-md-0">
                      Widget
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="menu" className="mb-sm-3 mb-md-0">
                      Menu
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Header>
              <Card.Body className="p-0">
                <Tab.Content>
                  <Tab.Pane eventKey="header" className="pb-4 p-4">
                    <h1>Header</h1>
                  </Tab.Pane>
                  <Tab.Pane eventKey="widget" className="pb-4 p-4 react-code">
                    <h1>Widget</h1>
                  </Tab.Pane>
                  <Tab.Pane eventKey="menu" className="pb-4 p-4 react-code">
                    <Row>
                      <Col lg={3}>
                        <Card>
                          <Card.Body className="p-0">
                            <h5 className="p-2 bg-dark text-white rounded-top-3">
                              Publisher
                            </h5>
                          </Card.Body>
                          <div>
						  <CheckboxList
								checklists={checklists}
								onChangeModel={handleCheckboxChange}
								checkedModelList={checkedModelList}
							/>
                          </div>
                        </Card>
                      </Col>
                    </Row>
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

function CheckboxList({ checklists, onChangeModel, checkedModelList }) {
  return (
    <div>
      {checklists.map((dvalue, index) => (
        <div className="col-lg-12 px-2" key={index}>
          <div className="form-group d-flex fs-4 text-dark">
            <div className="checkbox-wrapper-46">
              <input
                type="checkbox"
                className="inp-cbx"
                data-id={dvalue}
                id={`cbx-${index}`}
                value={dvalue}
                onChange={onChangeModel}
                checked={checkedModelList.includes(dvalue)}
              />
              <label className="cbx" htmlFor={`cbx-${index}`}>
                <span>
                  <svg viewBox="0 0 12 10" height="10px" width="12px">
                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                  </svg>
                </span>
                <span>{dvalue}</span>
              </label>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Badges;
