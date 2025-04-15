"use client"
import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaPlus } from "react-icons/fa";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/navigation';



const topics = ['Title', 'Author', 'Subject', 'Language', 'Publisher'];
const searchByOptions = ['Contains', 'Equals', 'Start With', 'End With', 'Not Equal'];
const sortByOptions = ['Relevance', 'Title A to Z', 'Title Z to A', 'Oldest to Newest', 'Newest to Oldest'];

export default function AdvancedSearchForm() {
    const Route = useRouter();
    const [filters, setFilters] = useState([
        { topic: 'Title', searchBy: 'Contains', text: '', logic: 'AND' },
        { topic: 'Title', searchBy: 'Contains', text: '', logic: 'AND' },
        { topic: 'Title', searchBy: 'Contains', text: '', logic: 'AND' },
    ]);

    const [startYear, setStartYear] = useState(null);
    const [endYear, setEndYear] = useState(null);
    const [sortBy, setSortBy] = useState('Relevance');

    const handleChange = (index, field, value) => {
        const newFilters = [...filters];
        newFilters[index][field] = value;
        setFilters(newFilters);
    };

    const addFilter = () => {
        if (filters.length == 5) {
            alert("You Reach maximum Number of Advance Search Filter")
            return
        }
        setFilters([...filters, { topic: 'Title', searchBy: 'Contains', text: '', logic: 'AND' }]);
        // console.log(filters.length);

    };

    const topicArray = {
        "Title": "datacite_titles",
        "Author": "datacite_creators",
        "Subject": "datacite_subject",
        "Publisher": "dc_publishers",
        "Language": "languages",
    }

    const shortByArray = {
        "Relevance": "",
        "Title A to Z'": "datacite_titles asc",
        "Title Z to A": "datacite_titles desc",
        "Oldest to Newest": "dc_date asc",
        "Newest to Oldest": "dc_date desc",
    }


    const handleSubmit = (e) => {
        e.preventDefault();
    
        let solrQuery = '';
    
        filters.forEach((item, index) => {
            solrQuery += `${topicArray[item.topic]}:`;
    
            if (item.searchBy === "Contains") {
                solrQuery += `*${item.text}*`;
            } else if (item.searchBy === "Equals") {
                solrQuery += `"${item.text}"`;
            } else if (item.searchBy === "Start With") {
                solrQuery += `${item.text}*`;
            } else if (item.searchBy === "End With") {
                solrQuery += `*${item.text}`;
            } else if (item.searchBy === "Not Equal") {
                solrQuery += `!${item.text}`;
            }
    
            if (index < filters.length - 1) {
                solrQuery += ` ${item.logic} `;
            }
        });
    
        if (startYear && endYear) {
            if (startYear > endYear) {
                alert("Please select a valid date range!");
                return;
            }
            const start = startYear.getFullYear();
            const end = endYear.getFullYear();
            solrQuery += `&fq=dc_date:[${start} TO ${end}]`;
        }
    
        const sortParam = shortByArray[sortBy] || '';
        if (sortParam) {
            solrQuery += `&sort=${sortParam}`;
        }
    
        const encodedQuery = encodeURIComponent(solrQuery);
    
        Route.push(`/advance-search/print-collection?q=${encodedQuery}`);
    };


    return (
        <Container>
            <Row>
                <Col md={9}>
                    <Form onSubmit={handleSubmit} className="p-4">
                        {filters.map((filter, index) => (
                            <Row className="mb-3" key={index}>
                                <Col md={6}>
                                    <Form.Label>Topic</Form.Label>
                                    <Form.Select
                                        value={filter.topic}
                                        onChange={(e) => handleChange(index, 'topic', e.target.value)}
                                    >
                                        {topics.map((opt) => (
                                            <option key={opt}>{opt}</option>
                                        ))}
                                    </Form.Select>
                                </Col>
                                <Col md={6}>
                                    <Form.Label>Search By</Form.Label>
                                    <Form.Select
                                        value={filter.searchBy}
                                        onChange={(e) => handleChange(index, 'searchBy', e.target.value)}
                                    >
                                        {searchByOptions.map((opt) => (
                                            <option key={opt}>{opt}</option>
                                        ))}
                                    </Form.Select>
                                </Col>
                                <Col md={12} className='mt-3'>
                                    <Form.Label>Search Text</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={filter.text}
                                        onChange={(e) => handleChange(index, 'text', e.target.value)}
                                        placeholder="Search Text"
                                    />
                                </Col>
                                <Col md={3} className="d-flex align-items-end mt-3">
                                    <Form.Check
                                        type="radio"
                                        id={`and-${index}`}
                                        label="AND"
                                        name={`logic-${index}`}
                                        value="AND"
                                        checked={filter.logic === 'AND'}
                                        onChange={(e) => handleChange(index, 'logic', e.target.value)}
                                        className="me-2"
                                    />
                                    <Form.Check
                                        type="radio"
                                        id={`or-${index}`}
                                        label="OR"
                                        name={`logic-${index}`}
                                        value="OR"
                                        checked={filter.logic === 'OR'}
                                        onChange={(e) => handleChange(index, 'logic', e.target.value)}
                                    />
                                </Col>
                            </Row>
                        ))}

                        <div className="text-end mb-4">
                            <Button variant="primary" className="rounded-circle" onClick={addFilter}>
                                <FaPlus />
                            </Button>
                        </div>

                        <h5 className="mb-3">Date Range Search</h5>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Label>Start Year:</Form.Label>
                                <DatePicker
                                    selected={startYear}
                                    onChange={(date) => setStartYear(date)}
                                    showYearPicker
                                    dateFormat="yyyy"
                                    className="form-control"
                                    placeholderText="Select year"
                                />
                            </Col>
                            <Col md={6}>
                                <Form.Label>End Year:</Form.Label>
                                <DatePicker
                                    selected={endYear}
                                    onChange={(date) => setEndYear(date)}
                                    showYearPicker
                                    dateFormat="yyyy"
                                    className="form-control"
                                    placeholderText="Select year"
                                />
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col md={6}>
                                <Form.Label>Sort By</Form.Label>
                                <Form.Select
                                    onChange={(e) => setSortBy(e.target.value)}
                                    value={sortBy}
                                >
                                    {sortByOptions.map((opt) => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Row>
                        <Row className='mt-2'>
                            <Button variant="primary" type="submit">SUBMIT</Button>
                        </Row>
                    </Form>
                </Col>
                <Col md={3}>
                    <Card className="mt-4 shadow-sm border-light">
                        <Card.Body>
                            <Card.Title className="mb-3 text-primary" style={{ fontWeight: '600' }}>
                                How Advance Search Work
                            </Card.Title>
                            <Card.Text className="text-secondary" style={{ fontSize: '0.95rem' }}>
                                The advanced search interface allows users to refine their search results with multiple criteria. Here’s how it works:
                            </Card.Text>
                            <ol className="text-secondary" style={{ fontSize: '0.95rem', paddingLeft: '1.2rem' }}>
                                <li>
                                    <strong>Topic Selection</strong>: Choose the search category (e.g., "Title, Author, Subject, Language, Publisher, Other") for each condition. This allows you to focus on specific aspects of the data.
                                </li>
                                <li>
                                    <strong>Search By</strong>: Select the type of match, such as "Contains, Equal, Start With, End With, Not Equal" to control how the search text is matched against the data.
                                </li>
                                <li>
                                    <strong>Search Text</strong>: Enter the text you want to search for. The system will filter the results based on this input.
                                </li>
                                <li>
                                    <strong>AND/OR Logic</strong>: Choose "AND" to ensure that all conditions must be met, or "OR" to return results that meet at least one condition.
                                </li>
                                <li>
                                    <strong>Submit Button</strong>: Click "Submit" to apply the filters and retrieve the refined search results.
                                </li>
                            </ol>
                            <Card.Text className="text-secondary" style={{ fontSize: '0.95rem' }}>
                                This setup provides flexibility for users to conduct complex searches by combining multiple conditions.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
} 
