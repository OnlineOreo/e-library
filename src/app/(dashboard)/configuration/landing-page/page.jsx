"use client";

import {
  Col,
  Row,
  Card,
  Tab,
  Nav,
  Container,
  Spinner,
  Button,
  Form,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import "./Checkbox.css";

const Badges = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [publisherList, setPublisherList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [collectionList, setCollectionList] = useState([]);
  const [mediaList, setMediaList] = useState([]);
  const [checkedModelList, setCheckedModelList] = useState([]);

  // Load data when component mounts
  useEffect(() => {
    loadMenus();
  }, []);

  // Token from cookie
  const getToken = () => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));
    return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
  };

  // Fetch all menus
  const loadMenus = async () => {
    const token = getToken();
    if (!token) return router.push("/authentication/sign-in");

    try {
      const headers = { Authorization: `${token}` };
      const [publishers, categories, collections, media] = await Promise.all([
        axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/publishers`,
          { headers }
        ),
        axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/configuration-categories`,
          { headers }
        ),
        axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/configuration-collection`,
          { headers }
        ),
        axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/configuration-media`,
          { headers }
        ),
      ]);

      setPublisherList(publishers.data);
      setCategoriesList(categories.data);
      setCollectionList(collections.data);
      setMediaList(media.data);
      console.log("data-publishers",publishers.data);
      console.log("data-categories",categories.data);
      console.log("data-collections",collections.data);
      console.log("data-media",media.data);
      
    } catch (error) {
      console.error("Axios Error:", error);
    }
  };

  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setCheckedModelList((prev) =>
      checked ? [...prev, value] : prev.filter((id) => id !== value)
    );
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const buildIds = (list, idKey) =>
      list
        .filter((item) => checkedModelList.includes(String(item[idKey])))
        .map((item) => String(item[idKey]));

    const payload = {
      publisher: { ids: buildIds(publisherList, "publisher_id") },
      categories: { ids: buildIds(categoriesList, "configuration_category_id") },
      collection: { ids: buildIds(collectionList, "configuration_collection_id") },
      media: { ids: buildIds(mediaList, "configuration_media_id") },
    };

    console.log("Final JSON Payload:", JSON.stringify(payload, null, 2));

    try {
      setIsLoading(true);
      const token = getToken();
      const headers = { Authorization: `${token}` };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/save-selections`,
        payload,
        { headers }
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Submit Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container fluid className="p-6">
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
                </Nav>
              </Card.Header>

              <Card.Body className="p-0">
                <Tab.Content>
                  <Tab.Pane eventKey="header" className="p-4">
                    <h1>Header</h1>
                  </Tab.Pane>

                  <Tab.Pane eventKey="widget" className="p-4">
                    <h1>Widget</h1>
                  </Tab.Pane>

                  <Tab.Pane eventKey="menu" className="p-4">
                    <Form onSubmit={handleSubmit}>
                      <Row className="p-4">
                        <CheckboxCard
                          title="Publishers"
                          checklists={publisherList}
                          idKey="publisher_id"
                          nameKey="publisher_name"
                          checkedModelList={checkedModelList}
                          onChange={handleCheckboxChange}
                        />
                        <CheckboxCard
                          title="Categories"
                          checklists={categoriesList}
                          idKey="configuration_category_id"
                          nameKey="category_name"
                          checkedModelList={checkedModelList}
                          onChange={handleCheckboxChange}
                        />
                        <CheckboxCard
                          title="Collections"
                          checklists={collectionList}
                          idKey="configuration_collection_id"
                          nameKey="collection_name"
                          checkedModelList={checkedModelList}
                          onChange={handleCheckboxChange}
                        />
                        <CheckboxCard
                          title="Media"
                          checklists={mediaList}
                          idKey="configuration_media_id"
                          nameKey="media_name"
                          checkedModelList={checkedModelList}
                          onChange={handleCheckboxChange}
                        />
                        <Button
                          className="w-100 mt-5"
                          disabled={isLoading}
                          type="submit"
                        >
                          {isLoading ? (
                            <Spinner animation="border" size="sm" />
                          ) : (
                            "Update"
                          )}
                        </Button>
                      </Row>
                    </Form>
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

// Reusable Checkbox Card Component
const CheckboxCard = ({
  title,
  checklists,
  idKey,
  nameKey,
  checkedModelList,
  onChange,
}) => (
  <Col lg={3}>
    <Card>
      <Card.Body className="p-0">
        <h5 className="p-2 bg-dark text-white rounded-top-3">{title}</h5>
      </Card.Body>
      <div className="p-2">
        {checklists.map((item, idx) => {
          const itemId = String(item[idKey]);
          return (
            <div className="checkbox-wrapper-46 mb-2" key={idx}>
              <input
                type="checkbox"
                className="inp-cbx"
                id={`cbx-${title}-${idx}`}
                value={itemId}
                checked={checkedModelList.includes(itemId)}
                onChange={onChange}
                name={nameKey}
              />
              <label className="cbx" htmlFor={`cbx-${title}-${idx}`}>
                <span>
                  <svg viewBox="0 0 12 10" height="10px" width="12px">
                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                  </svg>
                </span>
                <span className="fs-5">{item[nameKey]}</span>
              </label>
            </div>
          );
        })}
      </div>
    </Card>
  </Col>
);

export default Badges;
