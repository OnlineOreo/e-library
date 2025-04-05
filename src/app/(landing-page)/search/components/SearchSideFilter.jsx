"use client"
import { useState, useEffect } from 'react';
import { Form, Dropdown, Button } from 'react-bootstrap';
import { useRouter, useSearchParams } from "next/navigation";

const SearchSideFilter = (props) => {
    const router = useRouter();
    const [dcPublisher, setDcPublisher] = useState(props.dc_publishers_string || []);
    const [dcCreators, setDcCreators] = useState(props.datacite_creators_string || []);
    const [dcDate, setDcDate] = useState(props.dc_date || []);
    const [resourceTypes, setResourceType] = useState(props.dc_date || []);

    const searchParams = useSearchParams();
    const urlParams = searchParams.get("q");


    const [showDropdown, setShowDropdown] = useState(false);

    const handleApply = () => {
        filterChange();
        setShowDropdown(false);
    };

    const handleCancel = () => {
        setShowDropdown(false);
    };


    useEffect(() => {
        setDcPublisher(props.dc_publishers_string || []);
        setDcCreators(props.datacite_creators_string || []);
        setDcDate(props.dc_date || []);
        setResourceType(props.resource_types || []);
    }, [props.dc_publishers_string, props.datacite_creators_string, props.dc_date]);

    const [searchTerm, setSearchTerm] = useState("");

    const filteredPublishers = dcPublisher.filter(item =>
        item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filterChange = () => {
        const filterMap = {};

        const checkboxes = document.querySelectorAll('.thats_filter input[type="checkbox"]:checked');

        checkboxes.forEach((checkbox) => {
            const label = checkbox.dataset.label;
            const filterType = checkbox.dataset.filtertype;

            if (!filterMap[filterType]) {
                filterMap[filterType] = [];
            }
            filterMap[filterType].push(label);
        });

        const searchParams = new URLSearchParams(window.location.search);
        const fullQuery = decodeURIComponent(searchParams.get("q") || "");

        const baseMatch = fullQuery.match(/^([a-zA-Z0-9_]+:\([^)]+\))/);
        const baseQuery = baseMatch ? baseMatch[1] : "";

        const filterConditions = Object.entries(filterMap)
            .map(([type, values]) => {
                const joinedValues = values.map((v) => `"${v}"`).join(" OR ");
                return `${encodeURIComponent(type)}%3A(${encodeURIComponent(joinedValues)})`;
            })
            .join("%20AND%20");

        const encodedBaseQuery = encodeURIComponent(baseQuery);
        const filterUrl = filterConditions
            ? `${encodedBaseQuery}%20AND%20${filterConditions}`
            : encodedBaseQuery;

        console.log("Filter URL:", filterUrl);

        router.push(`/search/print-collection?q=${filterUrl}`);
    };



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
                                <Dropdown show={showDropdown} onToggle={() => setShowDropdown(!showDropdown)}>
                                    <Dropdown.Toggle
                                        as={"div"}
                                        id="dropdown-basic"
                                        className="curser_pointer text-success"
                                    >
                                        View All
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu className="shadow">
                                        <div className="p-2 border-bottom">
                                            <Form.Control
                                                type="text"
                                                placeholder="Search Publisher..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                        </div>

                                        <div
                                            className="px-2 pt-4 d-flex flex-column flex-wrap align-items-start gap-1"
                                            style={{ height: "40vh", width: "50vw", overflowY: "auto" }}
                                        >
                                            {filteredPublishers.map((item, index) => (
                                                <div
                                                    className="d-flex justify-content-between text-secondary ms-4 thats_filter"
                                                    style={{ width: "300px", fontSize: "11pt" }}
                                                    key={index}
                                                >
                                                    <Form.Check
                                                        type="checkbox"
                                                        className="one_line_ellipses"
                                                        style={{ width: "90%" }}
                                                        label={item?.name || "Unknown"}
                                                        data-filtertype="dc_publishers_string"
                                                        data-label={item?.name || "Unknown"}
                                                    />
                                                    <span>({item?.count || 0})</span>
                                                </div>
                                            ))}
                                            {filteredPublishers.length === 0 && (
                                                <p className="text-muted">No publishers found.</p>
                                            )}
                                        </div>

                                        <div className="bottom p-3 d-flex justify-content-end border-top">
                                            <Button variant="secondary" className="me-2" onClick={handleCancel}>
                                                Cancel
                                            </Button>
                                            <Button variant="primary" onClick={handleApply}>
                                                Apply
                                            </Button>
                                        </div>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                            {dcPublisher.slice(0, 5).map((item, index) => (
                                <div className="d-flex justify-content-between" key={index}>
                                    <Form.Check type="checkbox" className='one_line_ellipses thats_filter'
                                        style={{ width: "90%" }} label={item?.name || "Unknown"}
                                        data-filtertype="dc_publishers_string"
                                        data-label={item?.name || "Unknown"}
                                        onChange={filterChange}
                                    />
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
                            {resourceTypes.slice(0, 5).map((item, index) => (
                                <div className="d-flex justify-content-between" key={index}>
                                    <Form.Check type="checkbox" className='one_line_ellipses thats_filter'
                                        style={{ width: "90%" }} label={item?.name || "Unknown"}
                                        data-filtertype="resource_types"
                                        data-label={item?.name || "Unknown"}
                                        onChange={filterChange}
                                    />
                                    <span className="text-secondary">{item?.count || 0}</span>
                                </div>
                            ))}
                        </Form.Group>

                        {/* Authors Filter */}
                        <Form.Group className="border-bottom p-3">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <Form.Label className="fw-bold mb-0">Authors</Form.Label>
                                <a href="#" className="text-success small">View All</a>
                            </div>
                            {dcCreators.slice(0, 5).map((item, index) => (
                                <div className="d-flex justify-content-between" key={index}>
                                    <Form.Check type="checkbox" label={item?.name || "Unknown"}
                                        className='thats_filter'
                                        data-filtertype="datacite_creators"
                                        data-label={item?.name || "Unknown"}
                                        onChange={filterChange}
                                    />
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
                                    <Form.Check type="checkbox" label={item?.name || "Unknown"}
                                        className='thats_filter'
                                        data-filtertype="dc_date"
                                        data-label={item?.name || "Unknown"}
                                        onChange={filterChange}
                                    />
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
