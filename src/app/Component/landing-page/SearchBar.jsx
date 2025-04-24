'use client';

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SearchBar = ({show,setShow}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filterType, setFilterType] = useState("datacite_titles");
  const [searchText, setSearchText] = useState("");

  const getToken = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));
    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };


  useEffect(() => {
  // const searchParams = new URLSearchParams(window.location.search);
  const fullQuery = decodeURIComponent(searchParams.get("q") || "");

  const baseMatch = fullQuery.match(/^([a-zA-Z0-9_]+):\(([^)]+)\)/);

  if (baseMatch) {
    const type = baseMatch[1];
    const text = baseMatch[2]; 
    // console.log("type:", type);
    // console.log("text:", text);
    setFilterType(type);
    setSearchText(text);
  }
  }, [searchParams]);

  const handleSubmit = (event) => {
    event.preventDefault(); 
    const token = getToken();
    if(!token){
      setShow(true)
      router.push(`/?q=${filterType}%3A(${encodeURIComponent(searchText)})`);
      return 
    }
    router.push(`/search/print-collection?q=${filterType}%3A(${encodeURIComponent(searchText)})`);
  };

  return (
    <div className="search-style-2">
      <form id="search_form" className="d-flex w-100" onSubmit={handleSubmit}>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="datacite_titles">Title</option>
          <option value="datacite_creators">Author</option>
          <option value="resource_types_string">Resrorces Types</option>
          <option value="college_category">Subject</option>
        </select>
        <input type="text" value={searchText} placeholder="Search with/without any keyword" onChange={(e) => setSearchText(e.target.value)} />
        <button type="submit"><img alt="Search" src="https://wp.alithemes.com/html/evara/evara-frontend/assets/imgs/theme/icons/search.png" /></button>
      </form>
    </div>
  );
};

export default SearchBar;
