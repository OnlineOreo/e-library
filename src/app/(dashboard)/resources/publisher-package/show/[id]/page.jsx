"use client";

import { use, useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Spinner, Table } from "react-bootstrap";
import Link from "next/link";
import { FaMinusCircle } from "react-icons/fa";

export default function Page({ params }) {
  const { id } = use(params); // ✅ unwrap promise with use()

  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    package_name: "",
    mappings: [],
  });

  const getToken = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));
    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  const getPublisherPkg = async (instituteId) => {
    if (!instituteId) return;

    setIsLoading(true);
    const token = getToken();

    const hostname = typeof window !== "undefined" ? window.location.hostname : "";

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/publisher-packages?package_id=${instituteId}&sub_domain=${hostname}`,
        {
          headers: { Authorization: `${token}` },
        }
      );

      setFormData({
        package_name: response.data?.package_name || "",
        publisher_name: response.data?.publisher_name || "",
        mappings: response.data?.mappings || [],
      });
    } catch (error) {
      console.error("Error fetching package:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getPublisherPkg(id);
    }
  }, [id]);

  return (
    <Container className="py-5">
      <Row className="align-items-center mb-4">
        <Col></Col>
        <Col className="text-end">
          <Link href="/resources/publisher-package" className="btn btn-dark">
            <FaMinusCircle /> Back
          </Link>
        </Col>
      </Row>

      <Card className="shadow rounded-4 border-0">
        <Card.Body className="p-4">
          {isLoading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <>
              <Row className="mb-4">
                <Col md={4}>
                  <h5 className="text-dark">Package Name</h5>
                </Col>
                <Col md={8}>
                  <h5 className="fw-semibold">
                    {formData.package_name || "N/A"}
                  </h5>
                </Col>
              </Row>

              <Row className="mb-4">
                <Col md={4}>
                  <h5 className="text-dark">Publisher name</h5>
                </Col>
                <Col md={8}>{formData.publisher_name || "N/A"}</Col>
              </Row>

              <div className="mt-5">
                <h5 className="fw-bold mb-3 text-dark">Department & Program</h5>
                {formData.mappings.length > 0 ? (
                  <Table
                    striped
                    bordered
                    hover
                    responsive
                    className="rounded-3 overflow-hidden"
                  >
                    <thead className="table-light">
                      <tr>
                        <th>Department</th>
                        <th>Program</th>
                        <th>Library name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.mappings.map((item, index) => (
                        <tr key={index}>
                          <td>{item.department_name || "—"}</td>
                          <td>{item.program_name || "—"}</td>
                          <td>{item.library_name || "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <div className="text-dark">No mappings available.</div>
                )}
              </div>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}
