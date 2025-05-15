"use client";
import { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
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
import { Loader } from "react-feather";

const EditUser = () => {
  const router = useRouter();
  const { id } = useParams();
  const successToaster = (text) => toast(text);
  const errorToaster = (text) => toast.error(text);
  const instituteIds = useSelector((state) => state.institute.instituteId);
  const [image2, setImage2] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [insertImage2, setInsertImage2] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);
  const [step, setStep] = useState(1);
  const [serviceGroup, setServiceGroup] = useState([]);
  const [contentGroup, setContentGroup] = useState([]);
  const [userType, setUserType] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [institute, setInstitute] = useState([]);
  const [library, setLibrary] = useState([]);
  const [instituteId, setInstituteId] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    role: "",
    user_u_id: "",
    address: "",
    admission_year: "",
    institute: "",
    designation: "",
    gender: "",
    mappings: [],
  });

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/authentication/sign-in");
      return;
    }

    const fetchData = async (instituteIds, id) => {
      try {
        const [
          userRes,
          instituteRes,
          serviceGroupRes,
          contentGroupRes,
          userTypeRes,
          depRes,
          proRes,
        ] = await Promise.all([
          axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users?user_id=${id}`,
            {
              headers: { Authorization: `${token}` },
            }
          ),
          axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/institutes`, {
            headers: { Authorization: `${token}` },
          }),
          axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/service-groups?institute_id=${instituteIds}`,
            {
              headers: { Authorization: `${token}` },
            }
          ),
          axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/content-groups?institute_id=${instituteIds}`,
            {
              headers: { Authorization: `${token}` },
            }
          ),
          axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user-types?institute_id=${instituteIds}`,
            {
              headers: { Authorization: `${token}` },
            }
          ),
          axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/departments?institute_id=${instituteIds}`,
            {
              headers: { Authorization: `${token}` },
            }
          ),
          axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/programs?institute_id=${instituteIds}`,
            {
              headers: { Authorization: `${token}` },
            }
          ),
        ]);

        setFormData(userRes.data);
        setPreviewUrl(userRes.data.image);
        setInstitute(instituteRes.data);
        setServiceGroup(serviceGroupRes.data);
        setContentGroup(contentGroupRes.data);
        setUserType(userTypeRes.data);
        setInstituteId(userRes.data.mappings[0].institute);

        const initialInstitute = instituteRes.data.find(
          (ins) => ins.institute_id === userRes.data.mappings[0].institute
        );
        setLibrary(initialInstitute?.libraries || []);

        // const initialLibrary = initialInstitute?.libraries.find(
        //   (lib) => lib.library_id === userRes.data.mappings[0].library
        // );
        setDepartments(depRes.data || []);
        setPrograms(proRes.data || []);
      } catch (error) {
        errorToaster("Failed to fetch data!");
      }
    };
    if (instituteIds && id) {
      fetchData(instituteIds, id);
    }
  }, [instituteIds, id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const getToken = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));

    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsUpdating(true);
    const token = getToken();
    if (!token) {
      errorToaster("Authentication required!");
      return;
    }
  
    try {
      // Create a shallow copy and remove 'image' property
      const { image, ...restFormData } = formData;
  
      const normalizedFormData = {
        ...restFormData,
        mappings: restFormData.mappings.map((mapping) => ({
          ...mapping,
          institute: mapping.institute || instituteId,
          library: mapping.library || library?.[0]?.library_id || "",
        })),
      };
  
      // PUT request for user update without image
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users?user_id=${id}`,
        normalizedFormData,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      // PATCH request for image upload (only if image was selected)
      if (insertImage2 && image2) {
        const imageFormData = new FormData();
        imageFormData.append("image", image2);
  
        const hostname =
          typeof window !== "undefined" ? window.location.hostname : "";
  
        await axios.patch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users?user_id=${id}&sub_domain=${hostname}`,
          imageFormData,
          {
            headers: {
              Authorization: `${token}`,
              // Let the browser automatically set Content-Type for FormData
            },
          }
        );
      }
  
      if (response.status === 200) {
        Swal.fire("Success!", "User updated successfully!", "success");
        setIsUpdating(false);
        router.push("/user-management/users");
      } else {
        errorToaster("Something went wrong!");
        setIsUpdating(false);
      }
    } catch (error) {
      setIsUpdating(false);
      errorToaster(
        error.response?.data?.message ||
          error.response?.data?.mappings ||
          error.response?.data?.mappings?.[0]
      );
    }
  };
  


  const handleMappingChange = (event, index) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData };

      if (name === "institute") {
        setInstituteId(value);

        const selectedInstitute = institute.find(
          (ins) => ins.institute_id === value
        );
        const firstLibrary =
          selectedInstitute?.libraries?.[0]?.library_id || "";

        setLibrary(selectedInstitute?.libraries || []);
        setDepartments([]);
        setPrograms([]);

        updatedFormData.mappings[index] = {
          ...updatedFormData.mappings[index],
          institute: value,
          library: firstLibrary,
          department: "",
          program: "",
        };

        return updatedFormData;
      }

      if (name === "library") {
        const selectedLibrary = library.find((lib) => lib.library_id === value);
        updatedFormData.mappings[index] = {
          ...updatedFormData.mappings[index],
          library: value,
          department: "",
          program: "",
          institute: updatedFormData.mappings[index].institute || instituteId,
        };

        return updatedFormData;
      }

      // Default case: update field normally
      updatedFormData.mappings[index] = {
        ...updatedFormData.mappings[index],
        [name]: value,
        institute: updatedFormData.mappings[index].institute || instituteId,
        library: updatedFormData.mappings[index].library || "",
      };

      return updatedFormData;
    });
  };
  
  const addNewMapping = () => {
    const selectedInstitute = institute.find(
      (ins) => ins.institute_id === instituteId
    );
    const firstLibrary = selectedInstitute?.libraries?.[0]?.library_id || "";

    setFormData((prevFormData) => ({
      ...prevFormData,
      mappings: [
        ...prevFormData.mappings,
        {
          institute: instituteId,
          department: "",
          program: "",
        },
      ],
    }));
  };

  const removeMapping = async (index, mapping_id, user_id) => {
    if (mapping_id != undefined) {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to remove this mapping?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        try {
          const token = getToken();

          await axios.delete(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users?user_id=${user_id}&mapping_ids=${mapping_id}`,
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          );

          // Remove from local state
          setFormData((prevFormData) => ({
            ...prevFormData,
            mappings: prevFormData.mappings.filter((_, i) => i !== index),
          }));

          Swal.fire("Deleted!", "The mapping has been removed.", "success");
        } catch (error) {
          console.error("Failed to delete mapping:", error);
          Swal.fire("Error", "Something went wrong while deleting.", "error");
        }
      }
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        mappings: prevFormData.mappings.filter((_, i) => i !== index),
      }));
    }
  };

  console.log(previewUrl)

  return (
    <Fragment>
      <div className="bg-primary pt-10 pb-21"></div>
      <Container fluid className="mt-n22 px-6">
        <Row>
          <Col lg={12} md={12} xs={12}>
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="mb-0 text-dark">Edit User</h3>
              <Link href="../" className="btn btn-white">
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

                <Form.Group className="mb-3" controlId="formGender">
                  <Form.Label>Gender</Form.Label>
                  <div>
                    {["MALE", "FEMALE", "Other"].map((gender) => (
                      <Form.Check
                        inline
                        key={gender}
                        label={gender}
                        id={`gender-${gender}`} // give unique ID
                        name="gender"
                        type="radio"
                        value={gender}
                        checked={formData.gender === gender}
                        onChange={handleInputChange}
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
                    required
                  />
                </Form.Group>
              </>
            )}
            {step === 4 && (
              <Row>
                {/* <Col lg={12} className="mb-5">
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
                </Col> */}
                <Form.Group className="mb-3" controlId="formImage">
                  <Form.Label>Change Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setImage2(file);
                        setPreviewUrl(URL.createObjectURL(file));
                        setInsertImage2(true);
                      }
                    }}
                  />
                  {previewUrl && (
                    <div
                      className="mt-3 position-relative"
                      style={{ maxWidth: "100px" }}
                    >
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
                    </div>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Library</Form.Label>
                  <Form.Select
                    name="library"
                    disabled={true}
                    className="no-arrow-select"
                    value={formData.mappings?.[0].library || ""}
                    onChange={(e) => handleMappingChange(e)}
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
                <style jsx>
                  {`
                    .no-arrow-select {
                      appearance: none;
                      -webkit-appearance: none;
                      -moz-appearance: none;
                    }
                  `}
                </style>
                {formData.mappings?.map((mapping, index) => (
                  <Fragment key={index}>
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
                        controlId={`formDepartment${index}`}
                      >
                        <Form.Label title={mapping.department || ""}>
                          Department
                        </Form.Label>
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
                          className="position-absolute"
                          style={{ right: "-10px", top: "-20px" }}
                          onClick={() =>
                            removeMapping(index, mapping.user_mapping_id, id)
                          }
                        >
                          <ImCross />
                        </Button>
                      )}
                    </Col>
                    <div className="w-100 border mb-5"></div>
                  </Fragment>
                ))}

                <Col lg={2}>
                  <Button variant="primary" onClick={addNewMapping}>
                    Add Mapping
                  </Button>
                </Col>
              </Row>
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

              {step === 4 && (
                <Button variant="primary" type="submit" disabled={isUpdating}>
                  {isUpdating ? <Loader /> : "Update"}
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

export default EditUser;
