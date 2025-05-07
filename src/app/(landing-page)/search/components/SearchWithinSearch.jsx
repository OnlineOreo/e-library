import React, { useState } from 'react'
import { useRouter, useSearchParams } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { Button, Form, InputGroup } from 'react-bootstrap';

const SearchWithinSearch = () => {
    const Router = useRouter();
    const searchParams = useSearchParams();
    const urlParams = searchParams.get("q");
    const [searchWithinSearch, setSearchWithinSearch] = useState("")

    const handelSearchWithinSearch = (e) => {
        e.preventDefault()
        const searchText = searchWithinSearch;
        // console.log(searchText);
        Router.push(`?q=${urlParams}%20AND%20datacite_titles%3A(${searchText})`);
    }
    return (
        <Form onSubmit={handelSearchWithinSearch}>
            <InputGroup>
                <Form.Control placeholder="Search..." onChange={(e) => setSearchWithinSearch(e.target.value)} value={searchWithinSearch} />
                <Button type='submit' variant="outline-secondary" ><FaSearch /></Button>
            </InputGroup>
        </Form>
    )
}

export default SearchWithinSearch