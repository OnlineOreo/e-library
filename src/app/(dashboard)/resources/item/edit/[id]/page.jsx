"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";

export default function EditItem() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [itemTypes, setItemTypes] = useState([]);
  const [packageList, setPackageList] = useState([]);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    ISBN: "",
    ISSN: "",
    title: "",
    author: "",
    place: "",
    year: "",
    description: "",
    language: "",
    url: "",
    tags: [],
    mappings: [], // This should be an array of objects
  });

  const getToken = () => {
    const cookieString = document.cookie
        .split("; ")
        .find((row) => row.startsWith("access_token="));
    
    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };
  
  const token = getToken();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemTypesResponse, packagesResponse, itemResponse] =
          await Promise.all([
            axios.get(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/item-types`,
              { headers: { Authorization: `${token}` } }
            ),
            axios.get(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/publisher-packages`,
              { headers: { Authorization: `${token}` } }
            ),
            axios.get(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/items?item_id=${id}`,
              { headers: { Authorization: `${token}` } }
            ),
          ]);
        setItemTypes(itemTypesResponse.data);
        setPackageList(packagesResponse.data);
        setFormData(itemResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handlePackageChange = (index, value) => {
    setFormData((prev) => {
      const updatedMappings = [...prev.mappings];
      updatedMappings[index].package = value;
      return { ...prev, mappings: updatedMappings };
    });
  };

  const handleItemTypeChange = (index, value) => {
    setFormData((prev) => {
      const updatedMappings = [...prev.mappings];
      updatedMappings[index].item_type = value;
      return { ...prev, mappings: updatedMappings };
    });
  };

  const addTag = () => {
    setFormData((prev) => ({
      ...prev,
      tags: [...prev.tags, ""], // Add an empty string as a new tag
    }));
  };

  const addMapping = () => {
    setFormData((prev) => ({
      ...prev,
      mappings: [...prev.mappings, { package: "", item_type: "" }],
    }));
  };

  const removeMapping = (ids) => {
    // let deleteMappingId = formData.mappings[index].publisher_package_mapping_id;
    let deleteMappingId = ids;
    console.log(deleteMappingId);
    const token = getToken();
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this mapping?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/items?item_id=${id}&mapping_ids=${deleteMappingId}`,
            {
              headers: { Authorization: `${token}` },
            }
          );
          Swal.fire("Deleted!", "Item package has been deleted.", "success");
          setFormData((prevState) => ({
            ...prevState,
            mappings: prevState.mappings.filter(
              (mapping) => mapping.item_package_mapping_id !== ids
            ),
          }));
        } catch (error) {
          if (error?.response?.data?.message == "Invalid UUID: undefined") {
            if (formData.mappings.length > 1) {
              const newMappings = formData.mappings.filter(
                (_, i) => i !== index
              );
              setFormData({ ...formData, mappings: newMappings });
            }
          }
        }
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!token) {
      toast.error("Authentication required!");
      router.push("/authentication/sign-in");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/items?item_id=${id}`,
        formData,
        { headers: { Authorization: `${token}` } }
      );

      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Item updated successfully!",
          icon: "success",
        }).then(() => router.push("/resources/item"));
      }
    } catch (error) {
      if (error.response?.data) {
        setErrors(error.response.data);
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-primary pt-10 pb-21"></div>
      <Container fluid className="mt-n22 px-6">
        <Row>
          <Col lg={12} md={12} xs={12} className="mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="mb-0 text-dark">Edit Item</h3>
              <Link href="/resources/item" className="btn btn-white">
                <FaMinusCircle /> Back
              </Link>
            </div>
          </Col>
        </Row>
        <div className="card p-4">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="title">
                  <Form.Label>
                    Title <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>ISBN</Form.Label>
                  <Form.Control
                    type="text"
                    name="ISBN"
                    value={formData.ISBN}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group controlId="ISSN">
                  <Form.Label>ISSN</Form.Label>
                  <Form.Control
                    type="text"
                    name="ISSN"
                    value={formData.ISSN}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="place">
                  <Form.Label>Place</Form.Label>
                  <Form.Control
                    type="text"
                    name="place"
                    value={formData.place}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group controlId="language">
                  <Form.Label>Language</Form.Label>
                  <Form.Control
                    type="text"
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="url">
                  <Form.Label>URL</Form.Label>
                  <Form.Control
                    type="text"
                    name="url"
                    value={formData.url}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group controlId="author">
                  <Form.Label>Author</Form.Label>
                  <Form.Control
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="year">
                  <Form.Label>Year</Form.Label>
                  <Form.Control
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Tags</Form.Label>
              {formData.tags.map((tag, index) => (
                <div key={index} className="d-flex mb-2">
                  <Form.Control
                    type="text"
                    value={tag}
                    onChange={(e) => {
                      const newTags = [...formData.tags];
                      newTags[index] = e.target.value;
                      setFormData((prev) => ({ ...prev, tags: newTags }));
                    }}
                  />
                  <Button
                    variant="danger"
                    className="ms-2"
                    onClick={() => {
                      const newTags = [...formData.tags];
                      newTags.splice(index, 1);
                      setFormData((prev) => ({ ...prev, tags: newTags }));
                    }}
                  >
                    <FaMinusCircle />
                  </Button>
                </div>
              ))}
              <Button variant="success" onClick={addTag}>
                <FaPlusCircle /> Add Tag
              </Button>
            </Form.Group>

            {Array.isArray(formData?.mappings) &&
              formData.mappings.map((mapping, index) => (
                <Row
                  key={index}
                  className="justify-content-center align-items-center"
                >
                  {/* Package Selection */}
                  <Col md={5}>
                    <Form.Group>
                      <Form.Label>Packages</Form.Label>
                      <div className="d-flex mb-2">
                        <Form.Select
                          value={mapping.package}
                          onChange={(e) =>
                            handlePackageChange(index, e.target.value)
                          }
                        >
                          <option value="">Select Package</option>
                          {packageList.map((pkg) => (
                            <option key={pkg.package_id} value={pkg.package_id}>
                              {pkg.package_name}
                            </option>
                          ))}
                        </Form.Select>
                      </div>
                    </Form.Group>
                  </Col>

                  {/* Item Type Selection */}
                  <Col md={5}>
                    <Form.Group>
                      <Form.Label>Item Type</Form.Label>
                      <div className="d-flex mb-2">
                        <Form.Select
                          value={mapping.item_type}
                          onChange={(e) =>
                            handleItemTypeChange(index, e.target.value)
                          }
                        >
                          <option value="">Select Item</option>
                          {itemTypes.map((type) => (
                            <option
                              key={type.item_type_id}
                              value={type.item_type_id}
                            >
                              {type.type_name}
                            </option>
                          ))}
                        </Form.Select>
                      </div>
                    </Form.Group>
                  </Col>

                  {/* Remove Mapping Button */}
                  <Col lg={2}>
                    <Button
                      variant="danger"
                      className="ms-2"
                      onClick={() =>
                        removeMapping(mapping.item_package_mapping_id)
                      }
                    >
                      <FaMinusCircle />
                    </Button>
                  </Col>
                </Row>
              ))}

            {/* Add Mapping Button */}
            <Col md={2} className="d-flex align-items-end">
              <Button variant="success" onClick={addMapping}>
                <FaPlusCircle /> Add
              </Button>
            </Col>

            <Button
              variant="primary"
              type="submit"
              className="mt-3"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Item"}
            </Button>
          </Form>
        </div>
      </Container>
      <ToastContainer />
    </>
  );
}
