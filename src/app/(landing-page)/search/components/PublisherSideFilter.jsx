import React from 'react'
import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const PublisherSideFilter = ({ publishers, setShowPDropdown, showPDropdown, handleApply, parsedUrl, filterChange, reset }) => {
    const [dcPublisher, setDcPublisher] = useState(publishers || []);
    const [selectedPublishers, setSelectedPublishers] = useState([]);

    // console.log("publisher : ", publishers);

    useEffect(() => {
        setDcPublisher(publishers || []);
    }, [publishers]);

    const [searchTermP, setSearchTermP] = useState("");

    const filteredPublishers = dcPublisher.filter(item =>
        item?.name?.toLowerCase().includes(searchTermP.toLowerCase())
    );

    const inputPubChange = (e) => {
        const label = e.target.dataset.label;
        if (e.target.checked) {
            setSelectedPublishers(prev => [...prev, label]);
        } else {
            setSelectedPublishers(prev => prev.filter(item => item !== label));
        }
    };

    useEffect(() => {
        setSelectedPublishers([]);
    }, [reset])

    return (
        <Form.Group className="border-bottom p-3">
            <div className="d-flex justify-content-between align-items-center mb-2" style={{ position: "relative" }}>
                <Form.Label className="fw-bold mb-0">Publishers</Form.Label>
                <span variant="link" className="fw-bold cursor_pointer_underline p-0"
                    onClick={() => setShowPDropdown(prev => !prev)}
                >
                    View All
                </span>
                <div
                    style={{ position: "absolute", top: "150%", width: "50vw", maxHeight: "50vh", overflowY: "auto", padding: 0, zIndex: "99" }}
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

                    <div className="px-2 pt-2 d-flex flex-wrap flex-column gap-1" style={{ height: "100%", width: "100%", overflowX: "scroll" }}>
                        {filteredPublishers.length > 0 ? (
                            filteredPublishers.filter(item => !parsedUrl?.dc_publishers_string?.includes(item?.name)).map((item, index) => (
                                <div
                                    key={index}
                                    className="d-flex justify-content-between text-secondary"
                                    style={{ fontSize: "11pt", width: "300px" }}
                                >
                                    <Form.Check
                                        type="checkbox"
                                        className="one_line_ellipses thats_filter"
                                        style={{ width: "90%" }}
                                        label={item?.name || "Unknown"}
                                        data-filtertype="dc_publishers_string"
                                        data-label={item?.name || "Unknown"}
                                        onChange={inputPubChange}
                                        checked={selectedPublishers.includes(item?.name)}
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
            {parsedUrl?.dc_publishers_string?.length > 0 ? (
                parsedUrl.dc_publishers_string.map((selectedName, index) => {
                    const matched = dcPublisher.find(pub => pub.name === selectedName);
                    const id = `selected-${index}`;

                    return (
                        <div className="d-flex justify-content-between" key={id}>
                            <Form.Check
                                type="checkbox"
                                id={id}
                                className="one_line_ellipses thats_filter"
                                style={{ width: "90%" }}
                                label={
                                    <label htmlFor={id} style={{ cursor: 'pointer', width: "100%" }}>
                                        {selectedName || "Unknown"}
                                    </label>
                                }
                                data-filtertype="dc_publishers_string"
                                data-label={selectedName || "Unknown"}
                                onChange={filterChange}
                                checked
                            />
                            <span className="text-secondary">{matched?.count || 0}</span>
                        </div>
                    );
                })
            ) : (
                dcPublisher.slice(0, 5).map((item, index) => {
                    const id = `unselected-${index}`;

                    return (
                        <div className="d-flex justify-content-between" key={id}>
                            <Form.Check
                                type="checkbox"
                                id={id}
                                className="one_line_ellipses thats_filter"
                                style={{ width: "90%" }}
                                label={
                                    <label htmlFor={id} style={{ cursor: 'pointer', width: "100%" }}>
                                        {item?.name || "Unknown"}
                                    </label>
                                }
                                data-filtertype="dc_publishers_string"
                                data-label={item?.name || ""}
                                onChange={filterChange}
                                checked={false}
                            />
                            <span className="text-secondary">{item?.count || 0}</span>
                        </div>
                    );
                })
            )}
        </Form.Group>
    )
}

export default PublisherSideFilter