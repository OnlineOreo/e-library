"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { Container, Col, Row, Form, Button, Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Swal from "sweetalert2";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";

const EditPublisherPackage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    package_name: "",
    publisher: "",
    mappings: [],
  });

  const [publishers, setPublishers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [institute, setInstitute] = useState([]);
  const [library, setLibrary] = useState([]);
  const [loadingDropdowns, setLoadingDropdowns] = useState(false);

  const getToken = () => {
    const cookieString = document.cookie
        .split("; ")
        .find((row) => row.startsWith("access_token="));
    
    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoadingDropdowns(true);
      const token = getToken();
      if (!token) {
        router.push("/authentication/sign-in");
        return;
      }

      try {
        const [pubRes, deptRes, progRes, instRes, packageRes] = await Promise.all([
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
          axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/publisher-packages?package_id=${id}`, {
            headers: { Authorization: token },
          }),
        ]);

        setPublishers(pubRes.data);
        setDepartments(deptRes.data);
        setPrograms(progRes.data);
        setInstitute(instRes.data);
        setFormData({
          package_name: packageRes.data.package_name,
          publisher: packageRes.data.publisher,
          mappings: packageRes.data.mappings.map((map) => ({
            department: map.department,
            program: map.program,
            library: map.library,
            publisher_package_mapping_id:map.publisher_package_mapping_id
          })),
        });
      } catch (error) {
        if (error.response?.data?.error?.trim() === "Token has expired.") {
          router.push("/authentication/sign-in");
        }
        toast.error("Failed to load data.");
      } finally {
        setLoadingDropdowns(false);
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMappingsChange = (index, event) => {
    var libVal = formData.mappings[0].library
    const { name, value } = event.target;
    setFormData((prevState) => {
      const newMappings = [...prevState.mappings];
  
      if (newMappings[index]) {
        newMappings[index][name] = value;
      } else {
        newMappings[index] = { department: "", program: "", library: libVal };
        newMappings[index][name] = value;
      }
  
      return { ...prevState, mappings: newMappings };
    });
  };  

  const addMappings = () => {
    setFormData({
      ...formData,
      mappings: [...formData.mappings, { department: "", program: "", library: formData.mappings[0].library }],
    });
  };

  const removeMappings = (index) => {
    let deleteMappingId = formData.mappings[index].publisher_package_mapping_id;
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
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/publisher-packages?package_id=${id}&mapping_ids=${deleteMappingId}`,
              {
                headers: { Authorization: `${token}` },
              }
            );
            Swal.fire("Deleted!", "Publisher package has been deleted.", "success");
              if (formData.mappings.length > 1) {
                const newMappings = formData.mappings.filter((_, i) => i !== index);
                setFormData({ ...formData, mappings: newMappings });
              }
          } catch (error) {
            if(error?.response?.data?.message == 'Invalid UUID: undefined'){
                if (formData.mappings.length > 1) {
                    const newMappings = formData.mappings.filter((_, i) => i !== index);
                    setFormData({ ...formData, mappings: newMappings });
                }
              }
          }
        }
      });
   
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
    
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/publisher-packages?package_id=${id}`,
        formData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      Swal.fire("Success!", "Publisher package updated successfully!", "success");
      setTimeout(() => router.push("/resources/publisher-package"), 2000);
    } catch (error) {
      setErrors(error.response.data);
      toast.error("Something went wrong!");
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
            <h3 className="mb-0 text-dark">Edit package</h3>
            <Link href="../" className="btn btn-white">
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
          <Form.Label>Package Name</Form.Label>
          <Form.Control type="text" name="package_name" value={formData.package_name} onChange={handleInputChange} required />
        </Form.Group>
        </Col>
        <Col lg={6} className="mb-3">
          <Form.Group>
            <Form.Label>Publisher</Form.Label>
            <Form.Select name="publisher" value={formData.publisher} onChange={handleInputChange} required>
              <option value="">Select Publisher</option>
              {publishers.map((pub) => (
                <option key={pub.publisher_id} value={pub.publisher_id}>{pub.publisher_name}</option>
              ))}
            </Form.Select>
          </Form.Group>
          </Col>
        </Row>
        {formData.mappings.map((mapping, index) => (
          <Row className="justify-content-center align-items-center" key={index}>
            <Col lg={5} className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Select name="department" value={mapping.department} onChange={(e) => handleMappingsChange(index, e)} required>
                {departments.map((dept) => (
                  <option key={dept.department_id} value={dept.department_id}>{dept.department_name}</option>
                ))}
              </Form.Select>
            </Col>
            <Col lg={5} className="mb-3">
              <Form.Label>Program</Form.Label>
              <Form.Select name="program" value={mapping.program} onChange={(e) => handleMappingsChange(index, e)} required>
                <option value="">Select program</option>
                {programs.map((prog) => (
                  <option key={prog.program_id} value={prog.program_id}>{prog.program_name}</option>
                ))}
              </Form.Select>
            </Col>
            <Col lg={2} >
            <Button variant="danger" onClick={() => removeMappings(index)} disabled={formData.mappings.length === 1}>
                  <FaMinusCircle />
            </Button>
            </Col>
          </Row>
        ))}
        <Col lg={12} className="mb-3">
          <Button onClick={addMappings}>
            <FaPlusCircle /> Add
          </Button>
        </Col>
        <Button type="submit" className="w-100" disabled={isLoading}>{isLoading ? "Updating..." : "Update"}</Button>
      </Form>
      </div>
      <ToastContainer />
    </Container>
    </>
  );
};

export default EditPublisherPackage;
