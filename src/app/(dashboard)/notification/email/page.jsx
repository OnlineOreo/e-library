'use client';
import { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import Swal from "sweetalert2";

export default function SendEmail() {
    const [filterMethod, setFilterMethod] = useState('library');
    const [libraries, setLibraries] = useState([]);
    const [selectedLibraryId, setSelectedLibraryId] = useState('');
    const [departments, setDepartments] = useState([]);
    const [programs, setPrograms] = useState([]);

    const getToken = () => {
        const cookieString = document.cookie
            .split("; ")
            .find((row) => row.startsWith("access_token="));

        return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
    };

    useEffect(() => {
        loadLibraries();
    }, []);

    const loadLibraries = async () => {
        const token = getToken();
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/libraries`, {
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
        const libId = e.target.value;
        setSelectedLibraryId(libId);

        const selectedLib = libraries.find(lib => lib.library_id === libId);
        setDepartments(selectedLib?.departments || []);
        setPrograms(selectedLib?.programs || []);
    };

    const handelSubmit = (e) => {
        e.preventDefault();
    
        const formData = new FormData(e.target);
        const filterMethod = formData.get('filterMethod');
        const library = formData.get('library');
        const department = formData.get('department');
        const program = formData.get('program');
        const subject = formData.get('subject');
        const content = formData.get('content');
        const files = formData.getAll('file');
    
        const payload = {
            filterMethod,
            library,
            department: filterMethod === 'department' ? department : null,
            program: filterMethod === 'program' ? program : null,
            subject,
            content,
        };
    
        console.log('Payload:', payload);
        console.log('Files:', files);
    
        const token = getToken();
    
        axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/send-email`, formData, {
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'multipart/form-data',
            }
        })
        .then((res) => {
            console.log('Email Sent:', res.data);
            Swal.fire({
            title: "Success!",
            text: "Library added successfully!",
            icon: "success",
            confirmButtonText: "OK",
            });
        })
        .catch((err) => {
            console.error('Error Sending Email:', err);
            Swal.fire({
                title: "Error!",
                text: "Something Went Wrong!",
                icon: "error",
                confirmButtonText: "OK",
                });
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
                                    checked={filterMethod === 'library'}
                                    onChange={(e) => setFilterMethod(e.target.value)}
                                />
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="By Department"
                                    name="filterMethod"
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

                        {departments.length > 0 && filterMethod == "department" && (
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold">Department</Form.Label>
                                <Form.Select name='department'>
                                    <option value="">Select a Department</option>
                                    {departments.map((dept) => (
                                        <option key={dept.department_id} value={dept.department_id}>
                                            {dept.department_name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        )}

                        {programs.length > 0 && filterMethod == "program"  && (
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
                        )}

                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">Email Subject:</Form.Label>
                            <Form.Control type="text" name='subject' placeholder="Enter Email Subject" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">Email Content:</Form.Label>
                            <Form.Control as="textarea" rows={5} name='content' placeholder="Enter Email Content" />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="fw-semibold">Attachments:</Form.Label>
                            <Form.Control type="file" multiple name='file' />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="px-4 py-2">
                            SEND EMAILS
                        </Button>
                    </Form>
                </Card>
            </Container>
        </>
    );
}
