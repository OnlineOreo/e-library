'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();
  const [filterType, setFilterType] = useState("datacite_titles");
  const [searchText, setSearchText] = useState("");

  const filterOptions = [
    { value: "datacite_titles", label: "Title" },
    { value: "datacite_creators", label: "Author" },
    { value: "datacite_subject", label: "Category" },
    { value: "languages", label: "Language" },
    { value: "dc_publishers", label: "Publisher" },
    { value: "dc_description", label: "Description" },
    { value: "resource_types", label: "Resource Type" },
    { value: "ISBN", label: "ISBN" },
    { value: "url", label: "URL" },
    { value: "datacite_titles", label: "A-Z Filter" }
  ];

  const handleFilterSelect = (event) => {
    setFilterType(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    router.push(`/search/print-collection?filter_type=${filterType}&search_text=${encodeURIComponent(searchText)}`);
  };

  return (
    <div className="search-style-2">
      <form id="search_form" className="d-flex w-100" onSubmit={handleSubmit}>
        <select
          id="filterType"
          name="filter_type"
          className="select-active"
          value={filterType}
          onChange={handleFilterSelect}
        >
          {filterOptions.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <input
          type="text"
          id="searchInput"
          placeholder="Search with/without any keywords"
          name="search_text"
          value={searchText}
          onChange={handleSearchChange}
        />
        <button type="submit">
          <img
            src="https://wp.alithemes.com/html/evara/evara-frontend/assets/imgs/theme/icons/search.png"
            alt="Search"
          />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
