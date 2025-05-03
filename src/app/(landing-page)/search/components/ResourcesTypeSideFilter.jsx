import React from 'react'
import { useState, useEffect } from 'react';
import { Form, Dropdown, Button } from 'react-bootstrap';

const ResourcesTypeSideFilter = ({ resourcetypes, parsedUrl, filterChange }) => {
    const [resourceTypes, setResourceType] = useState(resourcetypes || []);

        useEffect(() => {
            setResourceType(resourcetypes || []);
        }, [resourcetypes]);

    return (
        <Form.Group className="border-bottom p-3">
            <Form.Label className="fw-bold mb-2">Content</Form.Label>
            {resourceTypes.map((item, index) => {
                const id = `resource-type-${index}`;
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
                            data-filtertype="resource_types_string"
                            data-label={item?.name || ""}
                            onChange={filterChange}
                            checked={parsedUrl?.resource_types_string?.includes(item?.name) ?? false}
                        />
                        <span className="text-secondary">{item?.count || 0}</span>
                    </div>
                );
            })}
        </Form.Group>
    )
}

export default ResourcesTypeSideFilter