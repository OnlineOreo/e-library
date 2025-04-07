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
    router.push(`/search/print-collection?q=${filterType}%3A(${encodeURIComponent(searchText)})`);
  };

  return (
    <div className="search-style-2">
      <form id="search_form" className="d-flex w-100" onSubmit={handleSubmit}>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="datacite_titles">Title</option>
          <option value="datacite_creators">Author</option>
          <option value="datacite_subject">Category</option>
        </select>
        <input type="text" value={searchText} placeholder="Search with/without any keyword" onChange={(e) => setSearchText(e.target.value)} />
        <button type="submit"><img alt="Search" src="https://wp.alithemes.com/html/evara/evara-frontend/assets/imgs/theme/icons/search.png" /></button>
      </form>
    </div>
  );
};

export default SearchBar;
