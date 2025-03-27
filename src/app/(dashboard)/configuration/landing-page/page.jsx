"use client";

import { Col, Row, Card, Tab, Nav, Container, Spinner, Button, Form, } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import "./Checkbox.css";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";


const Badges = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [publisherList, setPublisherList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [collectionList, setCollectionList] = useState([]);
  const [mediaList, setMediaList] = useState([]);
  const instituteId = useSelector((state) => state.institute.instituteId);

  useEffect(() => {
    if (instituteId) {
      loadMenus();
    }
  }, [instituteId]); // Added dependency array
  

  const getToken = () => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));
    return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
  };

  const loadMenus = async () => {
    const token = getToken();
    if (!token) {
      router.push("/authentication/sign-in");
      return;
    }
  
    try {
      const headers = { Authorization: ` ${token}` }; // Corrected header format
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/is-active-mapping?institute_id=${instituteId}`,
        { headers }
      );
  
      setPublisherList(response.data.publishers || []);
      setCategoriesList(response.data.categories || []);
      setCollectionList(response.data.collections || []);
      setMediaList(response.data.media || []);
    } catch (error) {
      console.error("Axios Error:", error);
    }
  };

  const handleCheckboxChange = (e, boxName) => {
    const { value, checked } = e.target;
  
    const updateList = (prevList) =>
      prevList.map((item) =>
        item.id === value ? { ...item, is_active: checked } : item
      );
  
    switch (boxName) {
      case "publisher":
        setPublisherList(updateList);
        break;
      case "category":
        setCategoriesList(updateList);
        break;
      case "collection":
        setCollectionList(updateList);
        break;
      case "media":
        setMediaList(updateList);
        break;
      default:
        break;
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const activePublisherList = publisherList.filter(item => item.is_active).map(item => item.id);
    const activeCategoriesList = categoriesList.filter(item => item.is_active).map(item => item.id);
    const activeCollectionList = collectionList.filter(item => item.is_active).map(item => item.id);
    const activeMediaIds = mediaList.filter(item => item.is_active).map(item => item.id);

    const sataToSend = {
      institute: instituteId,
      active_json: {
        publisher_ids: activePublisherList,
        categories_ids: activeCategoriesList,
        collection_ids: activeCollectionList,
        media_ids: activeMediaIds,
      }
    };
    try {
      setIsLoading(true);
      const token = getToken();
      const headers = { Authorization: `${token}` }; 
  
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/is-active-mapping?institute=${instituteId}`, // Fixed incorrect variable reference
        sataToSend,
        { headers }
      );

      Swal.fire({
        title: "Success!",
        text: "Updated successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
      
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
                          onChange={(e)=>handleCheckboxChange(e,'publisher')}
                        />
                        <CheckboxCard
                          title="Categories"
                          checklists={categoriesList}
                          idKey="configuration_category_id"
                          nameKey="category_name"
                          onChange={(e)=>handleCheckboxChange(e,'category')}
                        />
                        <CheckboxCard
                          title="Collections"
                          checklists={collectionList}
                          idKey="configuration_collection_id"
                          nameKey="collection_name"
                          onChange={(e)=>handleCheckboxChange(e,'collection')}
                        />
                        <CheckboxCard
                          title="Media"
                          checklists={mediaList}
                          idKey="configuration_media_id"
                          nameKey="media_name"
                          onChange={(e)=>handleCheckboxChange(e,'media')}
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

const CheckboxCard = ({
  title,
  checklists,
  idKey,
  nameKey,
  onChange,
}) => (
  <Col lg={3}>
    <Card>
      <Card.Body className="p-0">
        <h5 className="p-2 bg-dark text-white rounded-top-3">{title}</h5>
      </Card.Body>
      <div className="p-2">
        {checklists.map((item, idx) => {
          const itemId = String(item.id);
          return (
            <div className="checkbox-wrapper-46 mb-2" key={idx}>
              <input
                type="checkbox"
                className="inp-cbx"
                id={`cbx-${title}-${idx}`}
                value={itemId}
                checked={item.is_active}
                name={item.name}
                onChange={onChange}
              />
              <label htmlFor={`cbx-${title}-${idx}`}>{item.name}</label>
            </div>
          );          
        })}
      </div>
    </Card>
  </Col>
);

export default Badges;
