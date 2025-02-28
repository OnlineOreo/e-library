"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ListGroup, Container, Row, Col, Card, Tab } from "react-bootstrap";
import Link from "next/link";
import axios from "axios";
import { FaMinusCircle } from "react-icons/fa";

export default function ShowLibrary() {
  const { id } = useParams();

  const [library, setLibrary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchLibrary = async (id) => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/libraries?library_id=${id}`,
          {
            headers: { Authorization: localStorage.getItem("access_token") },
          }
        );

        const libraryData = response.data || {};
        const emailConfig =
          typeof libraryData.email_config === "string"
            ? JSON.parse(libraryData.email_config)
            : libraryData.email_config || {};

        setLibrary({ ...libraryData, email_config: emailConfig });
      } catch (error) {
        console.error("Error fetching library details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLibrary(id);
  }, [id]);

  return (
    <>
      <div className="bg-primary pt-10 pb-21"></div>
      <Container fluid className="mt-n22 px-6">
        <Row>
          <Col lg={12} md={12} xs={12}>
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="mb-0 text-dark">Show Library</h3>
              <Link href="../" className="btn btn-white">
                <FaMinusCircle /> Back
              </Link>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center mt-4">
          <Col xl={8} lg={8} md={8} sm={12}>
            <Tab.Container id="tab-container-8" defaultActiveKey="details">
              <Card>
                <Card.Body className="p-0">
                  <Tab.Content>
                    <Tab.Pane eventKey="details" className="pb-4 p-4">
                      {loading ? (
                        <p>Loading...</p>
                      ) : library ? (
                        <ListGroup>
                          {/* Library Details */}
                          <ListGroup.Item>
                            <strong>LIBRARY NAME:</strong> {library.library_name || "N/A"}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <strong>DOMAIN:</strong> {library.domain || "N/A"}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <strong>ADDRESS:</strong> {library.address || "N/A"}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <strong>EMAIL:</strong> {library.email || "N/A"}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <strong>PHONE:</strong> {library.phone || "N/A"}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <strong>INSTITUTE:</strong> {library.institute_name || "N/A"}
                          </ListGroup.Item>

                          {/* Email Configuration */}
                          <h5 className="mt-4">Mail Configuration</h5>
                          <ListGroup.Item>
                            <strong>MAIL DRIVER:</strong> {library.email_config.mail_driver || "N/A"}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <strong>MAIL HOST:</strong> {library.email_config.mail_host || "N/A"}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <strong>MAIL PORT:</strong> {library.email_config.mail_port || "N/A"}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <strong>MAIL USERNAME:</strong> {library.email_config.mail_username || "N/A"}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <strong>MAIL PASSWORD:</strong> {library.email_config.mail_password || "N/A"}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <strong>MAIL ENCRYPTION:</strong> {library.email_config.mail_encryption || "N/A"}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <strong>MAIL FROM ADDRESS:</strong> {library.email_config.mail_from_address || "N/A"}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <strong>MAIL FROM NAME:</strong> {library.email_config.mail_from_name || "N/A"}
                          </ListGroup.Item>
                        </ListGroup>
                      ) : (
                        <p>Library not found.</p>
                      )}
                    </Tab.Pane>
                  </Tab.Content>
                </Card.Body>
              </Card>
            </Tab.Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}
