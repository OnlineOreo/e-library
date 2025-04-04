"use client"
import { width } from '@mui/system';
import { useState, useEffect } from 'react';
import { Form, Dropdown, Button } from 'react-bootstrap';

const SearchSideFilter = (props) => {
    const [dcPublisher, setDcPublisher] = useState(props.dc_publishers_string || []);
    const [dcCreators, setDcCreators] = useState(props.datacite_creators_string || []);
    const [dcDate, setDcDate] = useState(props.dc_date || []);

    useEffect(() => {
        setDcPublisher(props.dc_publishers_string || []);
        setDcCreators(props.datacite_creators_string || []);
        setDcDate(props.dc_date || []);
    }, [props.dc_publishers_string, props.datacite_creators_string, props.dc_date]);

    const [searchTerm, setSearchTerm] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);

    // Filter publishers based on search term
    const filteredPublishers = dcPublisher.filter(item =>
        item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <>
            <div className="text-center py-3 border-bottom bg-light">
                <h5 className="fw-bold mb-0">Filter</h5>
            </div>

            {dcPublisher.length > 0 || dcCreators.length > 0 || dcDate.length > 0 ? (
                <div className="filters">
                    <Form>
                        {/* Publishers Filter */}
                        <Form.Group className="border-bottom p-3">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <Form.Label className="fw-bold mb-0">Publishers</Form.Label>
                                <Dropdown>
                                    <Dropdown.Toggle as={"div"} id="dropdown-basic">
                                        View All
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <div className="p-2 border-bottom">
                                            <Form.Control
                                                type="text"
                                                placeholder="Search Publisher..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                        </div>

                                        <div className="px-4 d-flex flex-column flex-wrap align-items-start gap-1"
                                            style={{ height: "40vh", width: "50vw", overflowY: "auto" }}>
                                            {filteredPublishers.map((item, index) => (
                                                <div className="d-flex justify-content-between text-secondary"
                                                    style={{ width: "300px", fontSize: "11pt" }}
                                                    key={index}>
                                                    <Form.Check
                                                        type="checkbox"
                                                        className='one_line_ellipses'
                                                        style={{ width: "90%" }}
                                                        label={item?.name || "Unknown"}
                                                    />
                                                    <span>({item?.count || 0})</span>
                                                </div>
                                            ))}
                                            {filteredPublishers.length === 0 && (
                                                <p className="text-muted">No publishers found.</p>
                                            )}
                                        </div>
                                        <div className="bottom p-3 d-flex justify-content-end border-top">
                                            <Button variant='secondary' className='me-2'>Cancel</Button>
                                            <Button variant='primary'>Apply</Button>
                                        </div>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                            {dcPublisher.slice(0, 5).map((item, index) => (
                                <div className="d-flex justify-content-between" key={index}>
                                    <Form.Check type="checkbox" className='one_line_ellipses' style={{ width: "90%" }} label={item?.name || "Unknown"} />
                                    <span className="text-secondary">{item?.count || 0}</span>
                                </div>
                            ))}
                        </Form.Group>

                        {/* Access Type */}
                        <Form.Group className="border-bottom p-3">
                            <Form.Label className="fw-bold mb-2">Access Type</Form.Label>
                            <div className="d-flex justify-content-between">
                                <Form.Check type="checkbox" label="Subscribe" />
                                <span className="text-secondary">00</span>
                            </div>
                        </Form.Group>

                        {/* Content */}
                        <Form.Group className="border-bottom p-3">
                            <Form.Label className="fw-bold mb-2">Content</Form.Label>
                            <div className="d-flex justify-content-between">
                                <Form.Check type="checkbox" label="Book" defaultChecked />
                                <span className="text-secondary">268</span>
                            </div>
                        </Form.Group>

                        {/* Authors Filter */}
                        <Form.Group className="border-bottom p-3">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <Form.Label className="fw-bold mb-0">Authors</Form.Label>
                                <a href="#" className="text-success small">View All</a>
                            </div>
                            {dcCreators.slice(0, 5).map((item, index) => (
                                <div className="d-flex justify-content-between" key={index}>
                                    <Form.Check type="checkbox" label={item?.name || "Unknown"} />
                                    <span className="text-secondary">{item?.count || 0}</span>
                                </div>
                            ))}
                        </Form.Group>

                        {/* Publish Year */}
                        <Form.Group className="border-bottom p-3">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <Form.Label className="fw-bold mb-0">Publish Year</Form.Label>
                                <a href="#" className="text-success small">View All</a>
                            </div>
                            {dcDate.slice(0, 5).map((item, index) => (
                                <div className="d-flex justify-content-between" key={index}>
                                    <Form.Check type="checkbox" label={item?.name || "Unknown"} />
                                    <span className="text-secondary">{item?.count || 0}</span>
                                </div>
                            ))}
                        </Form.Group>
                    </Form>
                </div>
            ) : (
                <p className="text-center p-3">Loading filters...</p>
            )}
        </>
    );
};

export default SearchSideFilter;
