"use client"
import { useState, useEffect } from 'react';
import { Form, Dropdown, Button } from 'react-bootstrap';
import { useRouter, useSearchParams } from "next/navigation";
import { IoMdCloseCircleOutline } from "react-icons/io";
import SideFilterSkelton from './SideFilterSkelton';
import PublisherSideFilter from './PublisherSideFilter';
import AuthorSideFilter from './AuthorSideFilter';
import DateSideFilter from './DateSideFilter';
import ResourcesTypeSideFilter from './ResourcesTypeSideFilter';

const SearchSideFilter = (props) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [solrCore, setSolrCore] = useState(props.catalogCore || "Print-collection")

    useEffect(() => {
        setSolrCore(props.catalogCore || "Print-collection");
    }, [ props.catalogCore]);

    const solrCoreArr = {
        "Print-collection": "print-collection",
        "e-resources": "e-resources",
        "e-collection": "e-collection",
        "multimedia-n": "multimedia"
    }

    const [parsedUrl, setParsedUrl] = useState([])
    // console.log("solrCore", props.catalogCore);
    // console.log("url params : ", encodeURIComponent(urlParams));
    function parseSolrQuery(query) {
        const filters = {};
        const parts = query.split(" AND ");

        parts.forEach(part => {
            const [field, valuePart] = part.split(":");
            if (!field || !valuePart) return;

            // Remove parentheses and quotes
            const valuesString = valuePart.trim().replace(/^\(|\)$/g, "");

            const values = valuesString
                .split(" OR ")
                .map(v => v.trim().replace(/^"|"$/g, ""));

            filters[field] = values;
        });

        return filters;
    }

    useEffect(() => {
        const urlParams = searchParams.get("q");
        const decoded = decodeURIComponent(urlParams);
        const parsed = parseSolrQuery(decoded);
        setParsedUrl(parsed)
        // console.log("parsed url ", parsed);
        // console.log("parsed url length",Object.keys(parsed).length);
    }, [searchParams, router])


    const [showPDropdown, setShowPDropdown] = useState(false);
    const [showADropdown, setShowADropdown] = useState(false);
    const [showDDropdown, setShowDDropdown] = useState(false);

    const handleApply = () => {
        filterChange();
        setShowPDropdown(false);
        setShowADropdown(false);
        setShowDDropdown(false);
    };

    const filterChange = () => {
        props.setIsLoading(true)
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

        const fullQuery = decodeURIComponent(searchParams.get("q") || "");

        const baseMatch = fullQuery.match(/^([a-zA-Z0-9_*]+:(\([^)]+\)|[^ ]+))/);
        const baseQuery = baseMatch ? baseMatch[1] : "";

        const filterConditions = Object.entries(filterMap)
            .map(([type, values]) => {
                const joinedValues = values
                    .map((v) => `"${v.replace(/"/g, '\\"')}"`) // Escape quotes inside labels
                    .join(" OR ");
                return `${encodeURIComponent(type)}:${encodeURIComponent(`(${joinedValues})`)}`;
            })
            .join(" AND ");

        const encodedBaseQuery = encodeURIComponent(baseQuery);
        const filterUrl = filterConditions
            ? `${encodedBaseQuery} AND ${encodeURIComponent(filterConditions)}`
            : encodedBaseQuery;

        router.push(`/search/${solrCoreArr[solrCore]}?q=${filterUrl}`);
    };


    const handelClearFilter = () => {
        const fullQuery = decodeURIComponent(searchParams.get("q") || "");

        const baseMatch = fullQuery.match(/^([a-zA-Z0-9_*]+:(\([^)]+\)|[^ ]+))/);
        const baseQuery = baseMatch ? baseMatch[1] : "";

        const parsed = parseSolrQuery(baseQuery);
        console.log("parsed after clear:", parsed);

        setParsedUrl(parsed);
        router.push(`/search/${solrCoreArr[solrCore]}?q=${encodeURIComponent(baseQuery)}`);
    };

    return (
        <>
            <div className='border rounded mb-5'>
                <div className="text-center py-3 border-bottom bg-light d-flex justify-content-between align-items-center px-3">
                    <h5 className="fw-bold mb-0">Filter</h5>
                    {Object.keys(parsedUrl).length > 1 && (
                        <button className='btn btn-danger btn-sm' onClick={handelClearFilter}>
                            <IoMdCloseCircleOutline size={15} /> Clear Filter
                        </button>
                    )}
                </div>

                {(props.dc_publishers_string || props.datacite_creators_string) ? (
                    <div className="filters">
                        <Form>
                            {/* Publishers Filter */}
                            <PublisherSideFilter
                                publishers={props.dc_publishers_string || []}
                                setShowPDropdown={setShowPDropdown}
                                showPDropdown={showPDropdown}
                                handleApply={handleApply}
                                parsedUrl={parsedUrl}
                                filterChange={filterChange}
                            />

                            {/* Content */}
                            <ResourcesTypeSideFilter
                                resourcetypes={props.resource_types_string || []}
                                parsedUrl={parsedUrl}
                                filterChange={filterChange}
                            />

                            {/* Author Filter */}
                            <AuthorSideFilter
                                creators={props.datacite_creators_string || []}
                                setShowADropdown={setShowADropdown}
                                showADropdown={showADropdown}
                                handleApply={handleApply}
                                parsedUrl={parsedUrl}
                                filterChange={filterChange}
                            />

                            {/* Publish Year */}
                            {solrCore !== "multimedia-n" && (
                                <DateSideFilter
                                    dates={props.dc_date || []}
                                    setShowDDropdown={setShowDDropdown}
                                    showDDropdown={showDDropdown}
                                    handleApply={handleApply}
                                    parsedUrl={parsedUrl}
                                    filterChange={filterChange}
                                />
                            )}
                        </Form>
                    </div>
                ) : (
                    <SideFilterSkelton />
                )}

            </div>
        </>
    );
};

export default SearchSideFilter;
