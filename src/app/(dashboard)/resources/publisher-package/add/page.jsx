"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Container, Col, Row, Form, Button, Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Swal from "sweetalert2";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

const AddPublisherPackage = () => {
  const instituteId = useSelector((state) => state.institute.instituteId);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    package_name: "",
    publisher: "",
    started_at: "",
    ended_at: "",
    mappings: [{ department_id: "", program_id: "" }],
  });

  const [publishers, setPublishers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [programs, setPrograms] = useState([]);
  // const [institute, setInstitute] = useState([]); 
  const [library, setLibrary] = useState([]);
  const [loadingDropdowns, setLoadingDropdowns] = useState(false);

  const getToken = () => {
    const cookieString = document.cookie
        .split("; ")
        .find((row) => row.startsWith("access_token="));
    
    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  useEffect(() => {
    const fetchDropdownData = async (instituteId) => {
      setLoadingDropdowns(true);
      const token = getToken();
      if (!token) {
        router.push("/authentication/sign-in");
        return;
      }

      try {
        const [pubRes,libRes] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/publishers?institute_id=${instituteId}`, {
            headers: { Authorization: token },
          }),
          axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/libraries?institute_id=${instituteId}`, {
            headers: { Authorization: token },
          }),
        ]);

        setPublishers(pubRes.data);
        setLibrary(libRes.data)
      } catch (error) {
        if(error.response.data.error.trim() == 'Token has expired.'){
          router.push("/authentication/sign-in");
        }
        toast.error("Failed to load dropdown data.");
        
      } finally {
        setLoadingDropdowns(false);
      }
    };

    if(instituteId){
      fetchDropdownData(instituteId);
    }
  }, [instituteId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const today = new Date().toISOString().split("T")[0];
    const updatedFormData = { ...formData, [name]: value };
  
    let newErrors = { ...errors };
  
    // Clear existing errors for the field
    newErrors[name] = [];
  
    // Apply date validations
    if (name === "started_at" || name === "ended_at") {
      if (value < today) {
        newErrors[name].push("Date cannot be in the past.");
      }
  
      if (
        (name === "started_at" && value === formData.ended_at) ||
        (name === "ended_at" && value === formData.started_at)
      ) {
        newErrors["started_at"] = ["Start and End date can't be the same."];
        newErrors["ended_at"] = ["Start and End date can't be the same."];
      } else {
        // Clear same-date error if no longer same
        if (newErrors.started_at?.includes("Start and End date can't be the same.")) {
          newErrors["started_at"] = newErrors["started_at"].filter(err => err !== "Start and End date can't be the same.");
        }
        if (newErrors.ended_at?.includes("Start and End date can't be the same.")) {
          newErrors["ended_at"] = newErrors["ended_at"].filter(err => err !== "Start and End date can't be the same.");
        }
      }
    }
  
    setFormData(updatedFormData);
    setErrors(newErrors);
  };
  

  // const handleInstituteChange = async (event) => {
  //   const { name, value } = event.target;
  //   setFormData({ ...formData, [name]: value });
  //   const allChildData =  institute.find((ins) => ins.institute_id === value);
  //   if (allChildData) {
  //     setLibrary(allChildData.libraries || []);
  //     setDepartments([])
  //     setPrograms([])
  //   }
  // }

  const handleLibraryChange = async (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    const allLibrayChild =  library.find((ins) => ins.library_id === value);
    if (allLibrayChild) {
      setDepartments(allLibrayChild.departments || []);
      setPrograms(allLibrayChild.programs || []);
    }
  }


  const handleMappingsChange = (index, event) => {
    const { name, value } = event.target;
    const newMappings = [...formData.mappings];
    if (name === "department") {
      newMappings[index]["department_id"] = value;
    } else if (name === "program") {
      newMappings[index]["program_id"] = value;
    } else if (name === "library") {
      newMappings[index]["library"] = value;
    }

    setFormData({ ...formData, mappings: newMappings });
  };

  const addMappings = () => {
    setFormData({
      ...formData,
      mappings: [...formData.mappings, { department_id: "", program_id: "" }],
    });
  };

  const removeMappings = (index) => {
    if (formData.mappings.length > 1) {
      const newMappings = formData.mappings.filter((_, i) => i !== index);
      setFormData({ ...formData, mappings: newMappings });
    } else {
      // toast.warning("At least one mappings is required!");
    }
  };
  

  const handleSubmit = async (event,instituteId) => {
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
      started_at: formData.started_at,
      ended_at: formData.ended_at,
      mappings: formData.mappings.map((mapItem) => ({
        department: mapItem.department_id,
        program: mapItem.program_id,
        library: formData.library,
      })),
    };

    const programSet = new Set();
    for (let mapping of transformedData.mappings) {
        if (programSet.has(mapping.program)) {
            toast.error("Dublicate proram found");
            setIsLoading(false);
            return;
        }
        programSet.add(mapping.program);
    }

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/publisher-packages?institute_id=${instituteId}`,
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

      if (error.response?.data?.mappings) {
        const errorMessages = error.response.data.mappings
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

  console.log(library)

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
          <Form onSubmit={(e)=>handleSubmit(e,instituteId)}>
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
              {/* <Col lg={6} className="mb-3">
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
              </Col> */}

              <Col lg={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Library</Form.Label>
                  <Form.Select
                    name="library"
                    value={formData.library}
                    onChange={handleLibraryChange}
                    isInvalid={!!errors.library}
                  >
                    <option value="">Select Library</option>
                    {library && library.map((lib) => (
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
            <Row>
            <Col lg={6} className="mb-3">
                <Form.Group>
                  <Form.Label >Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="started_at"
                    value={formData.started_at}
                    onChange={handleInputChange}
                    isInvalid={!!errors.started_at}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.started_at?.join(", ")}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            <Col lg={6} className="mb-3">
                <Form.Group>
                  <Form.Label >End Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="ended_at"
                    value={formData.ended_at}
                    onChange={handleInputChange}
                    isInvalid={!!errors.ended_at}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.ended_at?.join(", ")}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            {formData.mappings.map((mappings, index) => (
              <Row key={index} className="mb-3 align-items-center">
                <Col lg={5} className="mb-3">
                  <Form.Group>
                    <Form.Label>Department</Form.Label>
                    <Form.Select
                      name="department"
                      value={mappings.department_id}
                      onChange={(e) => handleMappingsChange(index, e)}
                      isInvalid={!!errors.mappings?.[index]?.department}
                    >
                      <option value="">Select Department</option>
                      {departments.map((dept) => (
                        <option key={dept.department_id} value={dept.department_id}>
                          {dept.department_name}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.mappings?.[index]?.department?.join(", ")}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col lg={5} className="mb-3">
                  <Form.Group>
                    <Form.Label>Program</Form.Label>
                    <Form.Select
                      name="program"
                      value={mappings.program_id}
                      onChange={(e) => handleMappingsChange(index, e)}
                      isInvalid={!!errors.mappings?.[index]?.program}
                    >
                      <option value="">Select Program</option>
                      {programs.map((prog) => (
                        <option key={prog.program_id} value={prog.program_id}>
                          {prog.program_name}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.mappings?.[index]?.program?.join(", ")}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col lg={2} className="mt-4">
                  <Button
                    variant="danger"
                    onClick={() => removeMappings(index)}
                    disabled={formData.mappings.length === 1}
                  >
                    <FaMinusCircle />
                  </Button>
                </Col>
              </Row>
            ))}
            <Row>
              <Col lg={12}>
                <Button onClick={addMappings}>
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
