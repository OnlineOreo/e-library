"use client";
import { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Container,
  Col,
  Row,
  Form,
  Button,
  ProgressBar,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { FaMinusCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { FaTimesCircle } from "react-icons/fa";

const Home = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const successToaster = (text) => toast(text);
  const errorToaster = (text) => toast.error(text);
  var instituteId = useSelector((state) => state.institute.instituteId);
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [step, setStep] = useState(1);
  const [serviceGroup, setServiceGroup] = useState([]);
  const [contentGroup, setContentGroup] = useState([]);
  const [userType, setUserType] = useState([]);

  const [departments, setDepartments] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [library, setLibrary] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    role: "",
    address: "",
    gender: "",
    user_u_id: "",
    designation: "",
    institute: "",
    library: "",
    admission_year: "",
    mappings: [],
  });

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/authentication/sign-in");
      return;
    }

    const fetchData = async (instituteId) => {
      try {
        const [serviceGroupRes, contentGroupRes, userTypeRes, libraryRes] =
          await Promise.all([
            axios.get(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/service-groups?institute_id=${instituteId}`,
              { headers: { Authorization: `${token}` } }
            ),
            axios.get(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/content-groups?institute_id=${instituteId}`,
              { headers: { Authorization: `${token}` } }
            ),
            axios.get(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user-types?institute_id=${instituteId}`,
              { headers: { Authorization: `${token}` } }
            ),
            axios.get(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/libraries?institute_id=${instituteId}`,
              { headers: { Authorization: `${token}` } }
            ),
          ]);

        setServiceGroup(serviceGroupRes.data);
        setContentGroup(contentGroupRes.data);
        setUserType(userTypeRes.data);
        setLibrary(libraryRes.data);
      } catch (error) {
        errorToaster("Failed to fetch data!");
      }
    };

    if (instituteId) {
      fetchData(instituteId);
    }
  }, [instituteId]);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleInputChange = (event) => {
    const { name, value, type, files } = event.target;

    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const getToken = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));

    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const token = getToken();
    if (!token) {
      errorToaster("Authentication required!");
      return;
    }

    const formDataToSend = new FormData();

    // Enrich mappings with fallback/defaults
    const enrichedMappings = formData.mappings.map((mapping) => ({
      content_group: mapping.content_group || "",
      user_type: mapping.user_type || "",
      service_group: mapping.service_group || "",
      department: mapping.department || "",
      program: mapping.program || "",
      institute: instituteId || formData.institute || "",
      library: formData.library || "",
    }));

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "image" && value instanceof File) {
        formDataToSend.append(key, value);
      } else if (key === "image") {
        formDataToSend.append(key, new Blob([]));
      } else if (key !== "mappings") {
        formDataToSend.append(key, value);
      }
    });

    // Use enrichedMappings instead of formData.mappings
    enrichedMappings.forEach((item, index) => {
      Object.entries(item).forEach(([subKey, subValue]) => {
        formDataToSend.append(`mappings[${index}][${subKey}]`, subValue);
      });
    });

    // Append subdomain
    var hostname =
      typeof window !== "undefined" ? window.location.hostname : "";
    formDataToSend.append("sub_domain", hostname);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users`,
        formDataToSend,
        {
          headers: {
            Authorization: `${token}`,
            "Content-type": "application/json",
            // Don't set Content-Type manually when using FormData
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        const userId = response.data?.user_id;

        if (image) {
          const imageFormData = new FormData();
          imageFormData.append("image", image);
          // image.append

          await axios.patch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users?user_id=${userId}&sub_domain=${hostname}`,
            imageFormData,
            {
              headers: {
                Authorization: `${token}`,
                // "Content-Type": "multipart/form-data",
              },
            }
          );
        }

        Swal.fire({
          title: "Success!",
          text: "User added successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });

        setFormData({
          name: "",
          email: "",
          phone_number: "",
          role: "",
          address: "",
          gender: "",
          user_u_id: "",
          designation: "",
          institute: "",
          library: "",
          admission_year: "",
          mappings: [],
        });

        router.push("/user-management/users");
      }
    } catch (error) {
      const errorData = error.response?.data;
      if (typeof errorData === "object") {
        Object.keys(errorData).forEach((key) => {
          let message = Array.isArray(errorData[key])
            ? errorData[key].join(", ")
            : errorData[key];

          if (message === '"" is not a valid choice.') {
            message = `${key} cannot be empty or is invalid`;
          } else if (message === "This field may not be blank.") {
            message = `${key} may not be blank`;
          }

          errorToaster(message);
        });
      } else {
        errorToaster(errorData?.message || "Something went wrong!");
      }
      setLoading(false);
    }
  };

  const handleLibraryChange = (event) => {
    const { name, value } = event.target;
    const allLibrayChild = library.find((lib) => lib.library_id === value);
    setDepartments(allLibrayChild.departments || []);
    setPrograms(allLibrayChild.programs || []);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleMappingChange = (event, index) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => {
      const updatedMappings = [...prevFormData.mappings];
      updatedMappings[index] = {
        ...updatedMappings[index],
        [name]: value,
      };
      return {
        ...prevFormData,
        mappings: updatedMappings,
      };
    });
  };

  const addNewMapping = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      mappings: [...(prevFormData.mappings || []), {}],
    }));
  };

  const removeMapping = (index) => {
    if (index != 0) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        mappings: prevFormData.mappings.filter((_, i) => i !== index),
      }));
    }
  };

  return (
    <Fragment>
      <div className="bg-primary pt-10 pb-21"></div>
      <Container fluid className="mt-n22 px-6">
        <Row>
          <Col lg={12} md={12} xs={12}>
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="mb-0 text-dark">Add User</h3>
              <Link href="./" className="btn btn-white">
                <FaMinusCircle /> Back
              </Link>
            </div>
          </Col>
        </Row>
        <div className="card p-6 mt-5">
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <ProgressBar now={(step / 4) * 100} className="mb-4" />
            {/* Step 1 - Basic Information */}
            {step === 1 && (
              <>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    placeholder="Enter address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formNumber">
                  <Form.Label>Number</Form.Label>
                  <Form.Control
                    type="number"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    required
                  />
                </Form.Group>
              </>
            )}

            {/* Step 2 - Role, Image, Gender */}
            {step === 2 && (
              <>
                <Form.Group className="mb-3" controlId="formRole">
                  <Form.Label>Role</Form.Label>
                  <Form.Select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="STUDENT">Student</option>
                    <option value="FACULTY">Faculty</option>
                    <option value="STAFF">Staff</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGender">
                  <Form.Label>Gender</Form.Label>
                  <div>
                    {["MALE", "FEMALE", "OTHER"].map((gender) => (
                      <Form.Check
                        inline
                        key={gender}
                        label={gender}
                        id={gender}
                        name="gender"
                        type="radio"
                        value={gender}
                        checked={formData.gender === gender}
                        onChange={(e) => handleInputChange(e)}
                      />
                    ))}
                  </div>
                </Form.Group>
              </>
            )}

            {/* Step 3 - User Metadata */}
            {step === 3 && (
              <>
                <Form.Group className="mb-3" controlId="formUserUID">
                  <Form.Label>User Unique ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="user_u_id"
                    value={formData.user_u_id}
                    onChange={handleInputChange}
                    placeholder="Enter user unique ID"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDesignation">
                  <Form.Label>Designation</Form.Label>
                  <Form.Select
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Designation</option>
                    <option value="Manager">Manager</option>
                    <option value="Team Lead">Team Lead</option>
                    <option value="Developer">Developer</option>
                    <option value="Intern">Intern</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formAdmissionYear">
                  <Form.Label>Admission Year</Form.Label>
                  <Form.Control
                    type="number"
                    name="admission_year"
                    value={formData.admission_year}
                    onChange={handleInputChange}
                    placeholder="Enter admission year"
                    required
                  />
                </Form.Group>
              </>
            )}
            {step === 4 && (
              <>
                <Row className="mt-5">
                  <Form.Group className="mb-3" controlId="formImage">
                    <Form.Label>Upload Image</Form.Label>
                    <Form.Control
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setImage(file);
                          setPreviewUrl(URL.createObjectURL(file));
                        }
                      }}
                    />
                    {previewUrl && (
                      <div className="mt-3 position-relative" style={{ maxWidth:'100px' }}>
                        <img
                          src={previewUrl}
                          alt="Image Preview"
                          style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "10px",
                            objectFit: "cover",
                          }}
                        />
                        <Button
                          variant="link"
                          className="position-absolute"
                          style={{ fontSize: "30px", color: "red", top:'-25px', right:'-25px' }}
                          onClick={()=>{
                            setImage(null);
                            setPreviewUrl(null);
                          }}
                        >
                          <FaTimesCircle />
                        </Button>
                      </div>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Library</Form.Label>
                    <Form.Select
                      name="library"
                      value={formData.library || ""}
                      onChange={(e) => handleLibraryChange(e)}
                      required
                    >
                      <option value="">Select library</option>
                      {library.map((item) => (
                        <option key={item.library_id} value={item.library_id}>
                          {item.library_name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  {formData.mappings?.map((mapping, index) => (
                    <Fragment key={index}>
                      <Col lg={6}>
                        <Form.Group
                          className="mb-3"
                          controlId="formDesignation"
                        >
                          <Form.Label>Content Group</Form.Label>
                          <Form.Select
                            name="content_group"
                            value={mapping.content_group}
                            onChange={(e) => handleMappingChange(e, index)}
                            required
                          >
                            <option value="">Select Content group</option>
                            {contentGroup.map((item, index) => {
                              return (
                                <option key={index} value={item.cg_id}>
                                  {item.content_name}
                                </option>
                              );
                            })}
                          </Form.Select>
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="formDesignation"
                        >
                          <Form.Label>User Type</Form.Label>
                          <Form.Select
                            name="user_type"
                            value={mapping.user_type}
                            onChange={(e) => handleMappingChange(e, index)}
                            required
                          >
                            <option value="">Select User Type</option>
                            {userType.map((item, index) => {
                              return (
                                <option key={index} value={item.user_type_id}>
                                  {item.type_name}
                                </option>
                              );
                            })}
                          </Form.Select>
                        </Form.Group>

                        <Form.Group
                          className="mb-3"
                          controlId="formDesignation"
                        >
                          <Form.Label>Service Group</Form.Label>
                          <Form.Select
                            name="service_group"
                            value={mapping.service_group}
                            onChange={(e) => handleMappingChange(e, index)}
                            required
                          >
                            <option value="">Select service group</option>
                            {serviceGroup.map((item, index) => {
                              return (
                                <option key={index} value={item.sg_id}>
                                  {item.service_name}
                                </option>
                              );
                            })}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col
                        className="position-relative mb-5"
                        lg={6}
                        key={index}
                      >
                        <Form.Group
                          className="mb-3"
                          controlId={`formDepartment${index}`}
                        >
                          <Form.Label>Department</Form.Label>
                          <Form.Select
                            name="department"
                            value={mapping.department || ""}
                            onChange={(e) => handleMappingChange(e, index)}
                            required
                          >
                            <option value="">Select department</option>
                            {departments.map((item) => (
                              <option
                                key={item.department_id}
                                value={item.department_id}
                              >
                                {item.department_name}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>

                        <Form.Group
                          className="mb-3"
                          controlId={`formProgram${index}`}
                        >
                          <Form.Label>Program</Form.Label>
                          <Form.Select
                            name="program"
                            value={mapping.program || ""}
                            onChange={(e) => handleMappingChange(e, index)}
                            required
                          >
                            <option value="">Select program</option>
                            {programs.map((item) => (
                              <option
                                key={item.program_id}
                                value={item.program_id}
                              >
                                {item.program_name}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>

                        {index !== 0 && (
                          <Button
                            variant="danger"
                            size="sm"
                            className="position-absolute top-0 end-0"
                            onClick={() => removeMapping(index)}
                          >
                            <ImCross /> Remove
                          </Button>
                        )}
                      </Col>
                    </Fragment>
                  ))}

                  <Col lg={3}>
                    <Button variant="primary" onClick={addNewMapping}>
                      Add Mapping
                    </Button>
                  </Col>
                </Row>
              </>
            )}

            {/* Navigation Buttons */}
            <div className="d-flex justify-content-between mt-3">
              {step > 1 && (
                <Button variant="secondary" onClick={handlePrevious}>
                  Previous
                </Button>
              )}
              {step < 4 ? (
                <Button variant="primary" onClick={handleNext}>
                  Next
                </Button>
              ) : (
                ""
              )}
              {step == 4 && (
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? "Adding..." : "Submit"}
                </Button>
              )}
            </div>
          </Form>
        </div>
        <ToastContainer />
      </Container>
    </Fragment>
  );
};

export default Home;
