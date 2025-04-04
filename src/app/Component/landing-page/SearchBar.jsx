'use client';

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filterType, setFilterType] = useState("datacite_titles");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const type = searchParams.get("filter_type") || "datacite_titles";
    const text = searchParams.get("search_text") || "";

    setFilterType(type);
    setSearchText(text);
  }, [searchParams]); // Runs when searchParams change

  const handleSubmit = (event) => {
    event.preventDefault();
    router.push(`/search/print-collection?filter_type=${filterType}&search_text=${encodeURIComponent(searchText)}`);
  };

  return (
    <div className="search-style-2">
      <form id="search_form" className="d-flex w-100" onSubmit={handleSubmit}>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="datacite_titles">Title</option>
          <option value="datacite_creators">Author</option>
          <option value="datacite_subject">Category</option>
        </select>
        <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
