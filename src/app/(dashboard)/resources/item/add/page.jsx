"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import { Container, Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";

export default function AddItem() {
  const router = useRouter();
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
    mappings: {
      package: [],
      item_type: [],
    },
  });

  const getToken = () =>
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const token = getToken();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemTypesResponse, packagesResponse] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/item-types`, {
            headers: { Authorization: `${token}` },
          }),
          axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/publisher-packages`,
            { headers: { Authorization: `${token}` } }
          ),
        ]);
        setItemTypes(itemTypesResponse.data);
        setPackageList(packagesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Handle Package and Item Type Selection
  const handlePackageChange = (index, value) => {
    setFormData((prev) => {
      const updatedPackages = [...prev.mappings.package];
      updatedPackages[index] = value;
      return {
        ...prev,
        mappings: { ...prev.mappings, package: updatedPackages },
      };
    });
  };

  const handleItemTypeChange = (index, value) => {
    setFormData((prev) => {
      const updatedItemTypes = [...prev.mappings.item_type];
      updatedItemTypes[index] = value;
      return {
        ...prev,
        mappings: { ...prev.mappings, item_type: updatedItemTypes },
      };
    });
  };

  const addMappingsEntry = () => {
    setFormData((prev) => ({
      ...prev,
      mappings: {
        package: [...prev.mappings.package, ""],
        item_type: [...prev.mappings.item_type, ""],
      },
    }));
  };

  const removeMappingsEntry = (index) => {
    setFormData((prev) => ({
      ...prev,
      mappings: {
        package: prev.mappings.package.filter((_, i) => i !== index),
        item_type: prev.mappings.item_type.filter((_, i) => i !== index),
      },
    }));
  };

  // Handle Tags
  const addTag = () =>
    setFormData((prev) => ({ ...prev, tags: [...prev.tags, ""] }));
  const removeTag = (index) =>
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  const handleTagChange = (index, value) => {
    setFormData((prev) => {
      const updatedTags = [...prev.tags];
      updatedTags[index] = value;
      return { ...prev, tags: updatedTags };
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

    if (
      formData.mappings.package.length === 0 ||
      formData.mappings.item_type.length === 0
    ) {
      setErrors({
        mappings: ["At least one package and item type are required."],
      });
      toast.error("Please select at least one package and one item type.");
      return;
    }

    setLoading(true);

    try {
      // Transform mappings into an array of objects
      const mappingsArray = formData.mappings.package.map((pkg, index) => ({
        package: pkg,
        item_type: formData.mappings.item_type[index],
      }));

      const payload = {
        ...formData,
        mappings: mappingsArray, // Now it's an array of objects
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/items`,
        payload,
        { headers: { Authorization: `${token}` } }
      );

      if (response.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Item added successfully!",
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
              <h3 className="mb-0 text-dark">Add Item</h3>
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
                    isInvalid={Boolean(errors.title)}
                  />
                  {errors.title && (
                    <Form.Control.Feedback type="invalid">
                      {errors.title[0]}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="ISBN">
                  <Form.Label>
                    ISBN <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="ISBN"
                    value={formData.ISBN}
                    onChange={handleChange}
                    isInvalid={Boolean(errors.ISBN)}
                  />
                  {errors.ISBN && (
                    <Form.Control.Feedback type="invalid">
                      {errors.ISBN[0]}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="ISSN">
                  <Form.Label>
                    ISSN <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="ISSN"
                    value={formData.ISSN}
                    onChange={handleChange}
                    isInvalid={Boolean(errors.ISSN)}
                  />
                  {errors.ISSN && (
                    <Form.Control.Feedback type="invalid">
                      {errors.ISSN[0]}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="place">
                  <Form.Label>
                    place <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="place"
                    value={formData.place}
                    onChange={handleChange}
                    isInvalid={Boolean(errors.place)}
                  />
                  {errors.place && (
                    <Form.Control.Feedback type="invalid">
                      {errors.place[0]}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="language">
                  <Form.Label>
                    Language <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    isInvalid={Boolean(errors.language)}
                  />
                  {errors.language && (
                    <Form.Control.Feedback type="invalid">
                      {errors.language[0]}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="url">
                  <Form.Label>
                    URL <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="url"
                    value={formData.url}
                    onChange={handleChange}
                    isInvalid={Boolean(errors.url)}
                  />
                  {errors.url && (
                    <Form.Control.Feedback type="invalid">
                      {errors.url[0]}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group controlId="author">
                  <Form.Label>
                    Author <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    isInvalid={Boolean(errors.author)}
                  />
                  {errors.author && (
                    <Form.Control.Feedback type="invalid">
                      {errors.author[0]}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="year">
                  <Form.Label>
                    Year <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    isInvalid={Boolean(errors.year)}
                  />
                  {errors.year && (
                    <Form.Control.Feedback type="invalid">
                      {errors.year[0]}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="description">
              <Form.Label>
                Description <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                isInvalid={Boolean(errors.description)}
              />
              {errors.description && (
                <Form.Control.Feedback type="invalid">
                  {errors.description[0]}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            {/* <Form.Group controlId="itemTypes">
  <Form.Label>Item Types</Form.Label>
  {formData.item_type.map((type, index) => (
    <div key={index} className="d-flex mb-2">
      <Form.Control
        as="select"
        value={type}
        onChange={(e) => handleItemTypeChange(index, e.target.value)}
      >
        <option value="">Select Item Type</option>
        {itemTypes.map((itemType) => (
          <option key={itemType.item_type_id} value={itemType.item_type_id}>
            {itemType.type_name}
          </option>
        ))}
      </Form.Control>
      <Button variant="danger" onClick={() => removeItemType(index)} className="ms-2">
        <FaMinusCircle />
      </Button>
    </div>
  ))}
  <Button variant="success" onClick={addItemType}>
    <FaPlusCircle /> Add Item Type
  </Button>
</Form.Group> */}

            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              {formData.tags.map((tag, index) => (
                <div key={index} className="d-flex mb-2">
                  <Form.Control
                    type="text"
                    value={tag}
                    onChange={(e) => handleTagChange(index, e.target.value)}
                  />
                  <Button
                    variant="danger"
                    onClick={() => removeTag(index)}
                    className="ms-2"
                  >
                    <FaMinusCircle />
                  </Button>
                </div>
              ))}
              <Button variant="success" onClick={addTag}>
                <FaPlusCircle /> Add Tag
              </Button>
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Mappings</Form.Label>
                  {formData.mappings.package.map((pkg, index) => (
                    <div key={index} className="d-flex mb-2 align-items-center">
                      <Form.Select
                        value={pkg}
                        onChange={(e) =>
                          handlePackageChange(index, e.target.value)
                        }
                      >
                        <option value="">Select Package</option>
                        {packageList.map((packageItem) => (
                          <option
                            key={packageItem.package_id}
                            value={packageItem.package_id}
                          >
                            {packageItem.package_name}
                          </option>
                        ))}
                      </Form.Select>

                      <Form.Select
                        value={formData.mappings.item_type[index]}
                        onChange={(e) =>
                          handleItemTypeChange(index, e.target.value)
                        }
                        className="ms-2"
                      >
                        <option value="">Select Item Type</option>
                        {itemTypes.map((itemType) => (
                          <option
                            key={itemType.item_type_id}
                            value={itemType.item_type_id}
                          >
                            {itemType.type_name}
                          </option>
                        ))}
                      </Form.Select>

                      <Button
                        variant="outline-danger"
                        onClick={() => removeMappingsEntry(index)}
                        className="ms-2"
                      >
                        <FaMinusCircle />
                      </Button>
                    </div>
                  ))}
                </Form.Group>

                <Button variant="outline-primary" onClick={addMappingsEntry}>
                  <FaPlusCircle /> Add Package & Item Type
                </Button>
              </Col>
            </Row>

            <Button
              variant="primary"
              type="submit"
              className="mt-3"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Item"}
            </Button>
          </Form>
        </div>
      </Container>
      <ToastContainer />
    </>
  );
}
