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


    const [showPDropdown, setShowPDropdown] = useState(false);
    const [showADropdown, setShowADropdown] = useState(false);
    const [showDDropdown, setShowDDropdown] = useState(false);

    const handleApply = () => {
        filterChange();
        setShowPDropdown(false);
        setShowADropdown(false);
        setShowDDropdown(false);
    };
    
    const [searchTermP, setSearchTermP] = useState("");

    const filteredPublishers = dcPublisher.filter(item =>
        item?.name?.toLowerCase().includes(searchTermP.toLowerCase())
    );
    const [searchTermA, setSearchTermA] = useState("");

    const filteredCreators = dcCreators.filter(item =>
        item?.name?.toLowerCase().includes(searchTermA.toLowerCase())
    );
    const [searchTermD, setSearchTermD] = useState("");

    const filteredDates = dcDate.filter(item =>
        item?.name?.toLowerCase().includes(searchTermD.toLowerCase())
    );

    useEffect(() => {
        setDcPublisher(props.dc_publishers_string || []);
        setDcCreators(props.datacite_creators_string || []);
        setDcDate(props.dc_date || []);
        setResourceType(props.resource_types || []);
    }, [props.dc_publishers_string, props.datacite_creators_string, props.dc_date]);

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
                            <div className="d-flex justify-content-between align-items-center mb-2" style={{ position: "relative" }}>
                                <Form.Label className="fw-bold mb-0">Publishers</Form.Label>
                                    <span variant="link" className="fw-bold cursor_pointer_underline p-0"
                                    onClick={() => setShowPDropdown(prev => !prev)}
                                    >
                                        View All
                                    </span>
                                    <div
                                    style={{ position:"absolute", top:"150%", width: "50vw", maxHeight: "50vh", overflowY: "auto", padding: 0, zIndex:"99"}}
                                    className={`shadow card ${showPDropdown === false ? "d-none" : ""}`}
                                    >
                                        <div className="p-2 border-bottom bg-white sticky-top">
                                            <Form.Control
                                                type="text"
                                                placeholder="Search Publisher..."
                                                value={searchTermP}
                                                onChange={(e) => setSearchTermP(e.target.value)}
                                            />
                                        </div>

                                        <div className="px-2 pt-2 d-flex flex-wrap flex-column gap-1" style={{height:"100%", width:"100%",overflowX:"scroll"}}>
                                            {filteredPublishers.length > 0 ? (
                                                filteredPublishers.slice(0,100).map((item, index) => (
                                                    <div
                                                        key={index}
                                                        className="d-flex justify-content-between text-secondary"
                                                        style={{ fontSize: "11pt",width:"300px" }}
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
                                                ))
                                            ) : (
                                                <p className="text-muted px-2">No publishers found.</p>
                                            )}
                                        </div>

                                        <div className="p-3 d-flex justify-content-end border-top bg-white sticky-bottom">
                                            <Button
                                                variant="secondary"
                                                className="me-2"
                                                onClick={() => setShowPDropdown(prev => !prev)}
                                            >
                                                Cancel
                                            </Button>
                                            <Button variant="primary" onClick={handleApply}>
                                                Apply
                                            </Button>
                                        </div>
                                    </div>
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

                        {/* Author Filter */}
                        <Form.Group className="border-bottom p-3">
                            <div className="d-flex justify-content-between align-items-center mb-2" style={{ position: "relative" }}>
                                <Form.Label className="fw-bold mb-0">Authors</Form.Label>
                                <span className='fw-bold cursor_pointer_underline' onClick={() => setShowADropdown(pre => !pre)} >View All</span>

                                <div className={`shadow card ${showADropdown === false ? "d-none" : ""}`}
                                    style={{ position: "absolute", top: "150%", maxHeight: "50vh", width: "50vw", zIndex: "999",overflowY:"auto" }}
                                >
                                    <div className="p-2 border-bottom">
                                        <Form.Control
                                            type="text"
                                            placeholder="Search Author..."
                                            value={searchTermA}
                                            onChange={(e) => setSearchTermA(e.target.value)}
                                        />
                                    </div>

                                    <div
                                        className="px-2 pt-4 d-flex flex-column flex-wrap align-items-start gap-1"
                                        style={{ maxHeight: "100%", width: "100%", overflowX: "scroll" }}
                                    >
                                        {filteredCreators.map((item, index) => (
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
                                                    data-filtertype="datacite_creators_string"
                                                    data-label={item?.name || "Unknown"}
                                                />
                                                <span>({item?.count || 0})</span>
                                            </div>
                                        ))}
                                        {filteredCreators.length === 0 && (
                                            <p className="text-muted">No Author found.</p>
                                        )}
                                    </div>

                                    <div className="bottom p-3 d-flex justify-content-end border-top">
                                        <Button variant="secondary" className="me-2" onClick={() => setShowADropdown(pre => !pre)}>
                                            Cancel
                                        </Button>
                                        <Button variant="primary" onClick={handleApply}>
                                            Apply
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            {dcCreators.slice(0, 5).map((item, index) => (
                                <div className="d-flex justify-content-between" key={index}>
                                    <Form.Check type="checkbox" label={item?.name || "Unknown"}
                                        className='thats_filter one_line_ellipses'
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
                            <div className="d-flex justify-content-between align-items-center mb-2" style={{position:"relative"}}>
                                <Form.Label className="fw-bold mb-0">Publish Year</Form.Label>
                                <span className='fw-bold cursor_pointer_underline' onClick={() => setShowDDropdown(pre => !pre)} >View All</span>

                                <div className={`shadow card ${showDDropdown === false ? "d-none" : ""}`}
                                    style={{ position: "absolute", top: "150%", zIndex: "999", maxHeight: "50vh", width: "50vw", overflowY:"auto" }}
                                >
                                    <div className="p-2 border-bottom">
                                        <Form.Control
                                            type="text"
                                            placeholder="Search Year..."
                                            value={searchTermD}
                                            onChange={(e) => setSearchTermD(e.target.value)}
                                        />
                                    </div>

                                    <div
                                        className="px-2 pt-4 d-flex flex-column flex-wrap align-items-start gap-1"
                                        style={{ height: "100%", width: "100%", overflowX: "scroll" }}
                                    >
                                        {filteredDates.map((item, index) => (
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
                                                    data-filtertype="dc_date"
                                                    data-label={item?.name || "Unknown"}
                                                />
                                                <span>({item?.count || 0})</span>
                                            </div>
                                        ))}
                                        {filteredDates.length === 0 && (
                                            <p className="text-muted">This Year Data Not found.</p>
                                        )}
                                    </div>

                                    <div className="bottom p-3 d-flex justify-content-end border-top">
                                        <Button variant="secondary" className="me-2" onClick={() => setShowDDropdown(pre => !pre)}>
                                            Cancel
                                        </Button>
                                        <Button variant="primary" onClick={handleApply}>
                                            Apply
                                        </Button>
                                    </div>
                                </div>
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
