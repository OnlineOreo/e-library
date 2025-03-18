'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import { ListGroup, Col, Row, Card, Tab, Container, Spinner } from "react-bootstrap";
import Link from "next/link";
import { FaMinusCircle } from "react-icons/fa";
import { useParams } from "next/navigation";

export default function ShowInstitute() {
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        institute_name: "",
        email: "",
        address: "",
        phone: "",
        domain: "",
        sub_domain: "",
    });

    const { id } = useParams();

    const getToken = () => {
        const cookieString = document.cookie
          .split("; ")
          .find((row) => row.startsWith("access_token="));
      
        return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
      };

    const getInstitute = async (instituteId) => {
        if (!instituteId) return;
        console.log(instituteId)

        setIsLoading(true);
        const token = getToken();

        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/institutes?institute_id=${instituteId}`,
                {
                    headers: { Authorization: `${token}` },
                }
            );

            setFormData({
                institute_name: response.data?.institute_name || "",
                email: response.data?.email || "",
                address: response.data?.address || "",
                phone: response.data?.phone || "",
                domain: response.data?.domain || "",
                sub_domain: response.data?.sub_domain || "",
            });

        } catch (error) {
            console.error("Error fetching institute:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            getInstitute(id);
        }
    }, [id]);

    const { institute_name, email, address, phone, domain, sub_domain } = formData;

    return (
        <>
            <div className="bg-primary pt-10 pb-21"></div>
            <Container fluid className="mt-n22 px-6">
                <Row>
                    <Col lg={12} md={12} xs={12}>
                        <div className="d-flex justify-content-between align-items-center">
                            <h3 className="mb-0 text-dark">Show Institute</h3>
                            <Link href="../" className="btn btn-white"><FaMinusCircle /> Back</Link>
                        </div>
                    </Col>
                </Row>

                <Row className="justify-content-center mt-4">
                    <Col xl={8} lg={8} md={8} sm={12}>
                        <Tab.Container id="tab-container-8" defaultActiveKey="design">
                            <Card>
                                <Card.Body className="p-0">
                                    <Tab.Content>
                                        <Tab.Pane eventKey="design" className="pb-4 p-4">
                                            {isLoading ? (
                                                <Spinner animation="border" size="sm" />
                                            ) : (
                                                <>
                                                    {[institute_name, email].some(Boolean) && (
                                                        <ListGroup horizontal>
                                                            {institute_name && (
                                                                <ListGroup.Item className="flex-fill">
                                                                    {institute_name}
                                                                </ListGroup.Item>
                                                            )}
                                                            {email && (
                                                                <ListGroup.Item className="flex-fill">
                                                                    {email}
                                                                </ListGroup.Item>
                                                            )}
                                                        </ListGroup>
                                                    )}

                                                    {[address, phone].some(Boolean) && (
                                                        <ListGroup horizontal className="mt-2">
                                                            {address && (
                                                                <ListGroup.Item className="flex-fill">
                                                                    {address}
                                                                </ListGroup.Item>
                                                            )}
                                                            {phone && (
                                                                <ListGroup.Item className="flex-fill">
                                                                    {phone}
                                                                </ListGroup.Item>
                                                            )}
                                                        </ListGroup>
                                                    )}

                                                    {[domain, sub_domain].some(Boolean) && (
                                                        <ListGroup horizontal className="mt-2">
                                                            {domain && (
                                                                <ListGroup.Item className="flex-fill">
                                                                    {domain}
                                                                </ListGroup.Item>
                                                            )}
                                                            {sub_domain && (
                                                                <ListGroup.Item className="flex-fill">
                                                                    {sub_domain}
                                                                </ListGroup.Item>
                                                            )}
                                                        </ListGroup>
                                                    )}
                                                </>
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
