"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Container, Col, Row, Form, Button, Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Swal from "sweetalert2";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";

const AddPublisherPackage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    package_name: "",
    publisher: "",
    mapping: [{ department_id: "", program_id: "" }],
  });

  const [publishers, setPublishers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [institute, setInstitute] = useState([]);
  const [library, setLibrary] = useState([]);
  const [loadingDropdowns, setLoadingDropdowns] = useState(false);

  const getToken = () => localStorage.getItem("access_token");

  useEffect(() => {
    const fetchDropdownData = async () => {
      setLoadingDropdowns(true);
      const token = getToken();
      if (!token) {
        toast.error("Authentication required!");
        router.push("/authentication/sign-in");
        return;
      }

      try {
        const [pubRes, deptRes, progRes, institute] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/publishers`, {
            headers: { Authorization: token },
          }),
          axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/departments`, {
            headers: { Authorization: token },
          }),
          axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/programs`, {
            headers: { Authorization: token },
          }),
          axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/institutes`, {
            headers: { Authorization: token },
          }),
        ]);

        setPublishers(pubRes.data);
        setDepartments(deptRes.data);
        setPrograms(progRes.data);
        setInstitute(institute.data);
      } catch (error) {
        toast.error("Failed to load dropdown data.");
      } finally {
        setLoadingDropdowns(false);
      }
    };

    fetchDropdownData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInstituteChange = async (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    if (value) {
      const token = getToken();
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/libraries`,
          {
            headers: { Authorization: token },
          }
        );
        setLibrary(response.data);
      } catch (error) {
        toast.error("Failed to load libraries.");
      }
    } else {
      setLibrary([]); // Reset library dropdown when no institute is selected
    }
  };

  const handleMappingChange = (index, event) => {
    const { name, value } = event.target;
    const newMappings = [...formData.mapping];

    // Map "department" to "department_id" and "program" to "program_id"
    if (name === "department") {
      newMappings[index]["department_id"] = value;
    } else if (name === "program") {
      newMappings[index]["program_id"] = value;
    } else if (name === "library") {
      newMappings[index]["library"] = value;
    }

    setFormData({ ...formData, mapping: newMappings });
  };

  const addMapping = () => {
    setFormData({
      ...formData,
      mapping: [...formData.mapping, { department_id: "", program_id: "" }],
    });
  };

  const removeMapping = (index) => {
    if (formData.mapping.length > 1) {
      const newMappings = formData.mapping.filter((_, i) => i !== index);
      setFormData({ ...formData, mapping: newMappings });
    } else {
      // toast.warning("At least one mapping is required!");
    }
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrors({});

    const token = getToken();
    if (!token) {
      router.push("/authentication/sign-in");
      setIsLoading(false);
      return;
    }

    // Transform formData for correct API request
    const transformedData = {
      package_name: formData.package_name,
      publisher: formData.publisher,
      mapping: formData.mapping.map((mapItem) => ({
        department: mapItem.department_id,
        program: mapItem.program_id,
        library: formData.library,
      })),
    };

    // console.log(transformedData);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/publisher-packages`,
        transformedData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      Swal.fire({
        title: "Success!",
        text: "Publisher package added successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });

      setTimeout(() => router.push("/resources/publisher-package"), 2000);
    } catch (error) {
      setErrors(error.response.data);

      if (error.response?.data?.mapping) {
        const errorMessages = error.response.data.mapping
          .map((err) => err.non_field_errors?.join(", "))
          .filter(Boolean)
          .join("\n");
        if (errorMessages) {
          toast.error(errorMessages); // Show error in toast
        }
      } else {
        // toast.error("Something went wrong!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-primary pt-10 pb-21"></div>
      <Container fluid className="mt-n22 px-6">
        <Row>
          <Col lg={12}>
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="mb-0 text-dark">Publisher package</h3>
              <Link href="../publisher-package" className="btn btn-white">
                <FaMinusCircle /> Back
              </Link>
            </div>
          </Col>
        </Row>
        <div className="card p-6 mt-5">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col lg={6} className="mb-3">
                <Form.Group>
                  <Form.Label >Publisher Package Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="package_name"
                    placeholder="Enter publisher package name"
                    value={formData.package_name}
                    onChange={handleInputChange}
                    isInvalid={!!errors.package_name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.package_name?.join(", ")}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col lg={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Publisher</Form.Label>
                  <Form.Select
                    name="publisher"
                    value={formData.publisher}
                    onChange={handleInputChange}
                    isInvalid={!!errors.publisher}
                  >
                    <option value="">Select Publisher</option>
                    {publishers.map((pub) => (
                      <option key={pub.publisher_id} value={pub.publisher_id}>
                        {pub.publisher_name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.publisher?.join(", ")}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col lg={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Institute</Form.Label>
                  <Form.Select
                    name="institute"
                    value={formData.institute}
                    onChange={handleInstituteChange}
                    isInvalid={!!errors.institute}
                  >
                    <option value="">Select Institute</option>
                    {institute.map((ins) => (
                      <option key={ins.institute_id} value={ins.institute_id}>
                        {ins.institute_name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.institute?.join(", ")}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col lg={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Library</Form.Label>
                  <Form.Select
                    name="library"
                    value={formData.library}
                    onChange={handleInputChange}
                    isInvalid={!!errors.library}
                  >
                    <option value="">Select Library</option>
                    {library.map((lib) => (
                      <option key={lib.library_id} value={lib.library_id}>
                        {lib.library_name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.library?.join(", ")}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            {formData.mapping.map((mapping, index) => (
              <Row key={index} className="mb-3 align-items-center">
                <Col lg={5} className="mb-3">
                  <Form.Group>
                    <Form.Label>Department</Form.Label>
                    <Form.Select
                      name="department"
                      required="required"
                      value={mapping.department_id}
                      onChange={(e) => handleMappingChange(index, e)}
                      isInvalid={!!errors[`mapping.${index}.department`]}
                    >
                      <option value="">Select Department</option>
                      {departments.map((dept) => (
                        <option
                          key={dept.department_id}
                          value={dept.department_id}
                        >
                          {dept.department_name}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors[`mapping.${index}.department`]?.join(", ")}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col lg={5} className="mb-3">
                  <Form.Group>
                    <Form.Label>Program</Form.Label>
                    <Form.Select
                      name="program"
                      value={mapping.program_id}
                      required="required"
                      onChange={(e) => handleMappingChange(index, e)}
                      isInvalid={!!errors[`mapping.${index}.program`]}
                    >
                      <option value="">Select Program</option>
                      {programs.map((prog) => (
                        <option key={prog.program_id} value={prog.program_id}>
                          {prog.program_name}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors[`mapping.${index}.program`]?.join(", ")}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col lg={2} className="mt-4">
                <Button variant="danger" onClick={() => removeMapping(index)} disabled={formData.mapping.length === 1}>
                  <FaMinusCircle />
                </Button>
                </Col>
              </Row>
            ))}

            <Row>
              <Col lg={12}>
                <Button onClick={addMapping}>
                  <FaPlusCircle /> Add
                </Button>
              </Col>
              <Col lg={12} className="mt-4">
                <Button className="w-100" disabled={isLoading} type="submit">
                  {isLoading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
        <ToastContainer />
      </Container>
    </>
  );
};

export default AddPublisherPackage;
