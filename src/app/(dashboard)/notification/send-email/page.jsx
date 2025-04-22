'use client';
import { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import axios from 'axios';
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

export default function SendEmail() {

    const [isLoading, setIsLoading] = useState(false);
    const [filterMethod, setFilterMethod] = useState('library');
    const [libraries, setLibraries] = useState([]);
    const [selectedLibraryId, setSelectedLibraryId] = useState('');
    const [departments, setDepartments] = useState([]);
    const [programs, setPrograms] = useState([]);
    const instituteId = useSelector((state) => state.institute.instituteId);


    const getToken = () => {
        const cookieString = document.cookie
            .split("; ")
            .find((row) => row.startsWith("access_token="));

        return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
    };

    useEffect(() => {
        if(instituteId){
            loadLibraries(instituteId);
        }
    }, [instituteId]);

    const loadLibraries = async (instituteId) => {
        const token = getToken();
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/libraries?institute_id=${instituteId}`, {
                headers: { Authorization: `${token}` },
            });

            if (response.status === 200) {
                setLibraries(response.data);
            }
        } catch (error) {
            console.error("Error fetching libraries:", error);
        }
    };

    const handleLibraryChange = (e) => {
        console.log('handle library change called');
        const libId = e.target.value;
        setSelectedLibraryId(libId);

        const selectedLib = libraries.find(lib => lib.library_id === libId);
        setDepartments(selectedLib?.departments || []);
        setPrograms(selectedLib?.programs || []);
        console.log('departments ', departments);
        console.log('programs', programs);  
    };


    const handelSubmit = (e) => {
        e.preventDefault();

        setIsLoading(true);
        
        const formData = new FormData(e.target);
        formData.append("institute", instituteId);
        const filterMethod = formData.get('filterMethod');
        const library = formData.get('library');
        const title = formData.get('title');
        const content = formData.get('content');

        const selectedDepartments = formData.getAll('departments[]');
        formData.append('departments', JSON.stringify(selectedDepartments));

        const selectedPrograms = formData.getAll('programs[]');
        formData.append('programs', JSON.stringify(selectedPrograms));

        const payload = {
            institute:instituteId,
            filterMethod,
            library,
            title,
            content,
        };
    
        const token = getToken();
    
        axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/send-email?institute_id=${instituteId}`, formData, {
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'multipart/form-data',
            }
        })
        .then((res) => {
            console.log('Email Sent:', res.data);
            Swal.fire({
            title: "Success!",
            text: "Mail Sent Successfully!",
            icon: "success",
            confirmButtonText: "OK",
            });
            setIsLoading(false);
        })
        .catch((err) => {
            console.error('Error Sending Email:', err);
            Swal.fire({
                title: "Error!",
                text: "Something Went Wrong!",
                icon: "error",
                confirmButtonText: "OK",
                });
                setIsLoading(false);
        });
    };
    

    return (
        <>
            <div className="bg-primary pt-10 pb-21"></div>
            <Container fluid className="mt-n22 px-6">
                <Row>
                    <Col lg={12} md={12} xs={12}>
                        <div className="d-flex justify-content-between align-items-center">
                            <h3 className="mb-0 text-dark">Send Email</h3>
                        </div>
                    </Col>
                </Row>
                <Card className='p-5 mt-5'>
                    <Form className='p-5' onSubmit={handelSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">Select Filter Method:</Form.Label>
                            <div>
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="By library"
                                    name="filterMethod"
                                    value="library"
                                    id="byLibrary"
                                    checked={filterMethod === 'library'}
                                    onChange={(e) => setFilterMethod(e.target.value)}
                                />
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="By Department"
                                    name="filterMethod"
                                    id="byDepartment"
                                    value="department"
                                    checked={filterMethod === 'department'}
                                    onChange={(e) => setFilterMethod(e.target.value)}
                                />
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="By Program"
                                    name="filterMethod"
                                    value="program"
                                    id="byProgram"
                                    checked={filterMethod === 'program'}
                                    onChange={(e) => setFilterMethod(e.target.value)}
                                />
                            </div>
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">Library</Form.Label>
                            <Form.Select name='library' onChange={handleLibraryChange} value={selectedLibraryId}>
                                <option value="">Select a Library</option>
                                {libraries.map((library) => (
                                    <option key={library.library_id} value={library.library_id}>
                                        {library.library_name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        {/* {filterMethod == "department" && (
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold">Department</Form.Label>
                                <Form.Select name='department'>
                                    <option value="">Select a Department</option>
                                    {departments.map((dept) => (
                                        <option key={dept.department_id} value={dept.department_id}>
                                            {dept.department_name} | {dept.department_id}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        )} */}
                        
                        {/* {filterMethod == "program"  && (
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold">Programs</Form.Label>
                                <Form.Select name='program'>
                                    <option value="">Select a Program</option>
                                    {programs.map((program) => (
                                        <option key={program.program_id} value={program.program_id}>
                                            {program.program_name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        )} */}

                        {filterMethod == 'department' && (
                            <Form.Group className="mb-3">
                                {departments.length > 0 && (
                                    <Form.Label className="fw-semibold">Departments</Form.Label>
                                )}
                                {departments.map((department, index) => {
                                    return (
                                        <Form.Check
                                            key={index}  
                                            type="checkbox"
                                            label={department.department_name}
                                            name="departments[]"  
                                            value={department.department_id}  
                                            id={department.department_id}
                                        />
                                    );
                                })}
                            </Form.Group>
                        )}

                        {filterMethod == 'program' && (
                            <Form.Group className="mb-3">
                                {programs.length > 0 && (
                                    <Form.Label className="fw-semibold">Programs</Form.Label>
                                )}
                                {programs.map((program, index) => {
                                        return (
                                            <Form.Check 
                                                key={index}
                                                type="checkbox"
                                                label={program.program_name}
                                                name="programs[]"
                                                value={program.program_id}
                                                id={program.program_id}
                                            />
                                        )
                                    })}
                            </Form.Group>
                        )}

                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">Email title:</Form.Label>
                            <Form.Control type="text" name='title' placeholder="Enter Email title" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">Email Content:</Form.Label>
                            <SunEditor
                                name="content"
                                height="200px"
                                placeholder="Enter Email Content"
                                onChange={(content) => {
                                    // You can handle form data update here
                                    console.log(content);
                                }}
                            />
                        </Form.Group>

                        {/* <Form.Group className="mb-4">
                            <Form.Label className="fw-semibold">Attachments:</Form.Label>
                            <Form.Control type="file" multiple name='file' />
                        </Form.Group> */}

                        <Button variant="primary" type="submit" className="px-4 py-2">
                        {" "}
                        {isLoading ? (
                            <Spinner animation="border" size="sm" />
                        ) : (
                            "SEND MAILS"
                        )}{" "}
                        </Button>
                    </Form>
                </Card>
            </Container>
        </>
    );
}
