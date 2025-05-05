import React from 'react'
import { useState, useEffect } from 'react';
import { Form, Dropdown, Button } from 'react-bootstrap';

const DateSideFilter = ({ dates, setShowDDropdown, showDDropdown, handleApply, parsedUrl, filterChange, reset }) => {
    const [dcDate, setDcDate] = useState(dates || []);
    const [selectedDate, setSelectedDate] = useState([])

    useEffect(() => {
        setDcDate(dates || []);
    }, [dates]);

    const [searchTermD, setSearchTermD] = useState("");

    const filteredDates = dcDate.filter(item =>
        item?.name?.toLowerCase().includes(searchTermD.toLowerCase())
    );

    const inputDateChange = (e) => {
        const label = e.target.dataset.label;
        if (e.target.checked) {
            setSelectedDate(prev => [...prev, label]);
        } else {
            setSelectedDate(prev => prev.filter(item => item !== label));
        }
    };

    useEffect(() => {
        setSelectedDate([]);
    }, [reset])
    return (
        <Form.Group className="border-bottom p-3">
            <div className="d-flex justify-content-between align-items-center mb-2" style={{ position: "relative" }}>
                <Form.Label className="fw-bold mb-0">Publish Year</Form.Label>
                <span className='fw-bold cursor_pointer_underline' onClick={() => setShowDDropdown(pre => !pre)} >View All</span>

                <div className={`shadow card ${showDDropdown === false ? "d-none" : ""}`}
                    style={{ position: "absolute", top: "150%", zIndex: "999", maxHeight: "50vh", width: "50vw", overflowY: "auto" }}
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
                        {filteredDates.filter(item => !parsedUrl?.dc_date?.includes(item?.name)).map((item, index) => (
                            <div
                                className="d-flex justify-content-between text-secondary ms-4"
                                style={{ width: "200px", fontSize: "11pt" }}
                                key={index}
                            >
                                <Form.Check
                                    type="checkbox"
                                    className="one_line_ellipses thats_filter"
                                    style={{ width: "90%" }}
                                    label={item?.name || "Unknown"}
                                    data-filtertype="dc_date"
                                    data-label={item?.name || ""}
                                    onChange={inputDateChange}
                                    checked={selectedDate.includes(item?.name)}
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
            {dcDate.slice(0, 5).map((item, index) => {
                const id = `dc-date-${index}`;
                return (
                    <div className="d-flex justify-content-between" key={id}>
                        <Form.Check
                            type="checkbox"
                            id={id}
                            className="thats_filter"
                            style={{ width: "90%" }}
                            label={
                                <label htmlFor={id} style={{ cursor: 'pointer', width: "100%" }}>
                                    {item?.name || "Unknown"}
                                </label>
                            }
                            data-filtertype="dc_date"
                            data-label={item?.name || "Unknown"}
                            onChange={filterChange}
                            checked={parsedUrl.dc_date?.includes(item?.name) ?? false}
                        />
                        <span className="text-secondary">{item?.count || 0}</span>
                    </div>
                );
            })}

        </Form.Group>
    )
}

export default DateSideFilter