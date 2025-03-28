// components/SearchBar.js
'use client'
import React from "react";

const SearchBar = ({ handleFilterSelect }) => {
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

  return (
    <div className="search-style-2" >
      <form
        action="http://demo.libvirtuua.com:8000/search"
        id="search_form"
        method="GET"
        className="d-flex w-100"
      >
        <select
          id="filterType"
          name="filter_type"
          className="select-active"
          value={"datacite_titles"}
          onChange={handleFilterSelect}
        >
          {filterOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <input
          type="text"
          id="searchInput"
          placeholder="Search with/without any keywords"
          name="search_text"
          defaultValue=""
        />
        <button type="submit">
          <img
            src="https://wp.alithemes.com/html/evara/evara-frontend/assets/imgs/theme/icons/search.png"
            alt=""
          />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;