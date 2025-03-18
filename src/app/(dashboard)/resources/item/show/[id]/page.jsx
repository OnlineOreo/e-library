"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Container, Row, Col, Card, Table, ListGroup } from "react-bootstrap";
import axios from "axios";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ViewItem() {
  const router = useRouter();
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [mappings, setMappings] = useState([]);
  const [itemTypes, setItemTypes] = useState([]); // Store item types
  const [packages, setPackages] = useState([]); // Store packages

  useEffect(() => {
    if (id) {
      fetchItemDetails();
      fetchMappings(); // Fetch item types and packages
    }
  }, [id]);

  const getToken = () => {
    const cookieString = document.cookie
        .split("; ")
        .find((row) => row.startsWith("access_token="));
    
    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  const fetchItemDetails = async () => {
    const token = getToken();
    if (!token) {
      toast.error("Authentication required!");
      router.push("/authentication/sign-in");
      return;
    }
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/items?item_id=${id}`,
        { headers: { Authorization: `${token}` } }
      );
      if (response.status === 200) {
        console.log("Item Details API Response:", response.data);
        setItem(response.data);
        if (response.data.mappings) {
          setMappings(response.data.mappings);
        }
      }
    } catch (error) {
      console.error(
        "Error fetching item details:",
        error.response?.data || error.message
      );
      toast.error("Failed to load item details.");
    }
  };

  const fetchMappings = async () => {
    const token = getToken();
    try {
      const [itemTypesRes, packagesRes] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/item-types`, {
          headers: { Authorization: `${token}` },
        }),
        axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/publisher-packages`,
          { headers: { Authorization: `${token}` } }
        ),
      ]);

      console.log("Item Types API Response:", itemTypesRes.data);
      console.log("Packages API Response:", packagesRes.data);

      if (itemTypesRes.status === 200) setItemTypes(itemTypesRes.data);
      if (packagesRes.status === 200) setPackages(packagesRes.data);
    } catch (error) {
      console.error(
        "Error fetching mappings:",
        error.response?.data || error.message
      );
      toast.error("Failed to load item types and packages.");
    }
  };

  // Function to find type name by ID
  const getItemTypeName = (itemTypeId) => {
    const foundType = itemTypes.find((type) => type.id === itemTypeId);
    return foundType ? foundType.type_name : "N/A";
  };

  // Function to find package name by ID
  const getPackageName = (packageId) => {
    const foundPackage = packages.find((pkg) => pkg.id === packageId);
    return foundPackage ? foundPackage.package_name : "N/A";
  };

  if (!item) {
    return <p className="text-center mt-5">Loading item details...</p>;
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <Card>
            <Card.Header>
              <h3 className="text-dark">Item Details</h3>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Title:</strong> {item.title}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Author:</strong> {item.author}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Place:</strong> {item.place}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Year:</strong> {item.year}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>ISBN:</strong> {item.ISBN}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>ISSN:</strong> {item.ISSN}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Description:</strong> {item.description}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Language:</strong> {item.language}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>URL:</strong>{" "}
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.url}
                  </a>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Tags:</strong> {item.tags.join(", ")}
                </ListGroup.Item>

                {/* Mapping Table */}
                <ListGroup.Item>
                  <strong>Mappings:</strong>
                  {mappings.length > 0 ? (
                    <Table striped bordered hover className="mt-3">
                      <thead>
                        <tr>
                          <th>Item Type</th>
                          <th>Package</th>
                          <th>Created At</th>
                          <th>Updated At</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mappings.map((mapping, index) => (
                          <tr key={index}>
                            <td>{getItemTypeName(mapping.item_type_id)}</td>
                            <td>{getPackageName(mapping.package_id)}</td>
                            <td>
                              {new Date(mapping.created_at).toLocaleString()}
                            </td>
                            <td>
                              {new Date(mapping.updated_at).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    <p>No mappings found.</p>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
          <div className="mt-3">
            <Link href="/resources/item" className="btn btn-primary">
              Back to Items
            </Link>
          </div>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
}
