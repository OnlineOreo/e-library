'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import { ListGroup, Col, Row, Card, Tab, Container, Spinner } from "react-bootstrap";
import Link from "next/link";
import { use } from "react";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";

export default function ShowInstitute(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        package_name: "",
        mappings:[],
    });

    const params = use(props.params);
    const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

    // Function to safely get token
    const getToken = () => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("access_token");
        }
        return null;
    };

    const getPublisherPkg = async (instituteId) => {
        if (!instituteId) return;

        setIsLoading(true);
        const token = getToken();

        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/publisher-packages?package_id=${instituteId}`,
                {
                    headers: { Authorization: `${token}` },
                }
            );

            setFormData({
                package_name: response.data?.package_name || "",
                mappings : response.data?.mappings || [],
            });

        } catch (error) {
            console.error("Error fetching institute:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            getPublisherPkg(id);
        }
    }, [id]);

    console.log(formData);
    return (
        <>
            <div className="bg-primary pt-10 pb-21"></div>
            <Container fluid className="mt-n22 px-6">
                <Row>
                    <Col lg={12} md={12} xs={12}>
                        <div className="d-flex justify-content-between align-items-center">
                            <h3 className="mb-0 text-dark">Show Packages</h3>
                            <Link href="../" className="btn btn-white">
                                <FaMinusCircle /> Back
                            </Link>
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
                                                    <ListGroup horizontal className="mb-3">
                                                        <ListGroup.Item className="flex-fill">
                                                            Package Name        
                                                        </ListGroup.Item>
                                                        <ListGroup.Item className="flex-fill">
                                                            { formData.package_name }
                                                        </ListGroup.Item>
                                                    </ListGroup>
                                                    <ListGroup horizontal className="mb-3">
                                                        <ListGroup.Item className="flex-fill">
                                                            Library        
                                                        </ListGroup.Item>
                                                        <ListGroup.Item className="flex-fill">
                                                            { formData.mappings[0]?.library }
                                                        </ListGroup.Item>
                                                    </ListGroup>
                                                    {[formData.mappings] && (
                                                        <>
                                                            <ListGroup horizontal className="mb-3">
                                                                <ListGroup.Item className="flex-fill">
                                                                    <strong>Department</strong>
                                                                </ListGroup.Item>
                                                                <ListGroup.Item className="flex-fill">
                                                                    <strong>Program</strong>
                                                                </ListGroup.Item>
                                                            </ListGroup>    
                                                            { 
                                                                formData.mappings.map((element,index)=>{
                                                                return (
                                                                        <ListGroup horizontal key={index} className="mb-3">
                                                                            <ListGroup.Item className="flex-fill">
                                                                                { element.department}
                                                                            </ListGroup.Item>
                                                                            <ListGroup.Item className="flex-fill">
                                                                                { element.program }
                                                                            </ListGroup.Item>
                                                                        </ListGroup>
                                                                    )
                                                                })
                                                            }
                                                        </>
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
