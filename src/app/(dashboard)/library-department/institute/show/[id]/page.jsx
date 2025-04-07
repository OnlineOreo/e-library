"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Col,
  Row,
  Card,
  Container,
  Spinner,
  Button,
} from "react-bootstrap";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { useParams } from "next/navigation";
import "./ShowInstitute.css"; // custom styles

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

  const renderField = (label, value) => (
    <div className="info-row mb-3">
      <div className="info-label">{label}</div>
      <div className="info-value">{value || "N/A"}</div>
    </div>
  );

  return (
    <div className="show-institute-wrapper py-5">
      <Container>

        {isLoading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Row className="justify-content-center">
            <Col md={8}>
              <Card className="custom-card ">
                <Card.Header className="custom-card-header d-flex justify-content-between  align-items-center">
                  <span>Institute Information</span>
                <Link href={'/library-department/institute'} className="btn btn-white">
                <FaArrowLeft className="me-1" /> Back
              </Link>
                </Card.Header>
                <Card.Body className="custom-card-body">
                  {renderField("Institute Name", formData.institute_name)}
                  {renderField("Email", formData.email)}
                  {renderField("Phone", formData.phone)}
                  {renderField("Address", formData.address)}
                  {renderField("Domain", formData.domain)}
                  {renderField("Subdomain", formData.sub_domain)}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}
