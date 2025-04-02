"use client";
import { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Container, Col, Row, Form, Button, ProgressBar,} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { FaMinusCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Swal from "sweetalert2";


const Home = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const successToaster = (text) => toast(text);
  const errorToaster = (text) => toast.error(text);

  const [step, setStep] = useState(1);
  const [serviceGroup, setServiceGroup] = useState([]);
  const [contentGroup, setContentGroup] = useState([]);
  const [userType, setUserType] = useState([]);

  const [departments, setDepartments] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [institute, setInstitute] = useState([]);
  const [library, setLibrary] = useState([]);
  const [instituteId , setInstituteId] = useState('')

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    role: "",
    address:'',
    gender: "",
    user_u_id: "",
    designation: "",
    institute:'',
    admission_year: "",
    mappings: [],
  });

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/authentication/sign-in");
      return;
    }

    const fetchData = async () => {
      try {
        const [instituteRes, serviceGroupRes, contentGroupRes, userTypeRes] =
          await Promise.all([
            axios.get(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/institutes`,
              {
                headers: { Authorization: `${token}` },
              }
            ),
            axios.get(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/service-groups`,
              {
                headers: { Authorization: `${token}` },
              }
            ),
            axios.get(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/content-groups`,
              {
                headers: { Authorization: `${token}` },
              }
            ),
            axios.get(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user-types`,
              {
                headers: { Authorization: `${token}` },
              }
            ),
          ]);

        setInstitute(instituteRes.data);
        setServiceGroup(serviceGroupRes.data);
        setContentGroup(contentGroupRes.data);
        setUserType(userTypeRes.data);
      } catch (error) {
        errorToaster("Failed to fetch data!");
      }
    };

    fetchData();
  }, []);

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
      // console.log(formData);
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
    setLoading(true)
    const token = getToken();
    if (!token) {
      errorToaster("Authentication required!");
      return;
    }

    // const formDataToSend = formData;

    const formDataToSend = new FormData();

    // Append all form fields
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "image" && value instanceof File) {
        formDataToSend.append(key, value);
      } else if (key === "image") {
        formDataToSend.append(key, new Blob([])); 
      } else if (key === "mappings" && Array.isArray(value)) {
        value.forEach((item, index) => {
          Object.entries(item).forEach(([subKey, subValue]) => {
            formDataToSend.append(`${key}[${index}][${subKey}]`, subValue); 
          });
        });
      } else {
        formDataToSend.append(key, value);
      }
    });

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users`,
        formDataToSend,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
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
          address:'',
          gender: "",
          user_u_id: "",
          designation: "",
          institute:'',
          admission_year: "",
          mappings: [],
        });
        setLoading(false)
        }
        
        router.push("/user-management/users");
    } catch (error) {
      const errorData = error.response?.data;
      if (typeof errorData === "object") {
        Object.keys(errorData).forEach((key) => {
          let message = Array.isArray(errorData[key])
            ? errorData[key].join(", ")
            : errorData[key];
          
          if (message === "\"\" is not a valid choice.") {
            message = `${key} cannot be empty or is invalid`;
          }
        
          errorToaster(message);
        });        
      } else {
        errorToaster(errorData.message || "Something went wrong!");
      }
      setLoading(false)
    }
  };

  const handleMappingChange = (event, index) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => {
        const updatedFormData = { ...prevFormData };

        if (!updatedFormData.mappings) {
            updatedFormData.mappings = [];
        }

        if (name === "institute") {
            setInstituteId(value)
            const allChildData = institute.find((ins) => ins.institute_id === value);
            
            if (allChildData) {
                setLibrary(allChildData.libraries || []);
                setDepartments([]);
                setPrograms([]);

                // Update every mapping with the selected institute
                updatedFormData.mappings = updatedFormData.mappings.map((mapping) => ({
                    ...mapping,
                    institute: instituteId,
                    library: allChildData.libraries.length > 0 ? allChildData.libraries[0].library_id : "",
                }));
            }
        } 

        if (name === "library") {
            const allLibrayChild = library.find((lib) => lib.library_id === value);
            if (allLibrayChild) {
                setDepartments(allLibrayChild.departments || []);
                setPrograms(allLibrayChild.programs || []);
            }
        }

        // Ensure index exists before updating (if new, create a new object)
        if (!updatedFormData.mappings[index]) {
            updatedFormData.mappings[index] = {};
        }

        // Update the specific mapping
        updatedFormData.mappings[index] = {
            ...updatedFormData.mappings[index],
            [name]: value,
            institute: instituteId,
        };

        return updatedFormData;
    });

};



  const addNewMapping = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      mappings: [...(prevFormData.mappings || []), {}],
    }));
  };

  const removeMapping = (index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      mappings: prevFormData.mappings.filter((_, i) => i !== index),
    }));
  };

  return (
    <Fragment>
      <div className="bg-primary pt-10 pb-21"></div>
      <Container fluid className="mt-n22 px-6">
        <Row>
          <Col lg={12} md={12} xs={12}>
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="mb-0 text-dark">Add User</h3>
              <Link
                href="./"
                className="btn btn-white"
              >
                <FaMinusCircle /> Back
              </Link>
            </div>
          </Col>
        </Row>
        <div className="card p-6 mt-5">
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <ProgressBar now={(step / 4) * 100} className="mb-3" />
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
                {/* <Form.Group className="mb-3" controlId="formImage">
                  <Form.Label>Upload Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleInputChange}
                  />
                </Form.Group> */}

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
                <Row>
                  <Col lg={12} className="mb-5">
                    <Form.Group className="mb-3" controlId="formDesignation">
                      <Form.Label>Institute</Form.Label>
                      <Form.Select
                        name="institute"  
                        value={instituteId}
                        onChange={handleMappingChange}
                        required
                      >
                        <option value="">Select institute</option>
                        {institute.map((item, index) => {
                          return (
                            <option key={index} value={item.institute_id}>
                              {item.institute_name}
                            </option>
                          );
                        })}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  {formData.mappings?.map((mapping, index) => (
                    <>
                    <Col lg={6}>
                    <Form.Group className="mb-3" controlId="formDesignation">
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
                    <Form.Group className="mb-3" controlId="formDesignation">
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

                    <Form.Group className="mb-3" controlId="formDesignation">
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
                    <Col className="position-relative mb-5" lg={6} key={index}>
                      <Form.Group
                        className="mb-3"
                        controlId={`formLibrary${index}`}
                      >
                        <Form.Label>Library</Form.Label>
                        <Form.Select
                          name="library"
                          value={mapping.library || ""}
                          onChange={(e) => handleMappingChange(e, index)}
                          required
                        >
                          <option value="">Select library</option>
                          {library.map((item) => (
                            <option
                              key={item.library_id}
                              value={item.library_id}
                            >
                              {item.library_name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>

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

                      <Button
                        variant="danger"
                        className="position-absolute"
                        style={{ right:'-10px',top:'-20px' }}
                        onClick={() => removeMapping(index)}
                      >
                        <ImCross />
                      </Button>
                    </Col>
                    </>
                  ))}

                  <Col lg={2}>
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
              ) : ''}
              {
                step == 4 && (
                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? "Adding..." : "Submit"}
                  </Button>
                )
              }
            </div>
          </Form>
        </div>
        <ToastContainer />
      </Container>
    </Fragment>
  );
};

export default Home;
