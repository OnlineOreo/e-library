'use client'

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Banner({ bannerData }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filterType, setFilterType] = useState("datacite_titles");
  const [searchText, setSearchText] = useState("");

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
    router.push(
      `/search/print-collection?q=${filterType}%3A(${encodeURIComponent(
        searchText
      )})`
    );
  };
  return (
    <>
      <style jsx>{`
        .custom-banner {
          background-color: ${bannerData?.color2};
          font-size: ${bannerData?.font_size}px !important;
        }
      `}</style>

      <div
        className="w-100 pt-3"
        style={{ backgroundColor: bannerData?.color1 }}
      >
        <div className="container-fluid hero-header text-white d-flex align-items-center justify-content-center min-vh-50 py-4">
          <div className="container text-center w-50 px-sm-3">
            <h2 className="fw-bold text-dark fs-md-2 fs-lg-3">
              {bannerData?.cover_headline?.firstQuote || ""}
            </h2>
            <p className="lead text-white fw-semibold px-1 px-sm-4 py-3  rounded-3 d-md-inline-block d-none mt-3 shadow-sm custom-banner">
              {bannerData?.cover_headline?.subHeadline || ""}
            </p>
            <div className="d-inline-block d-md-none">
              <form className="d-flex gap-2" onSubmit={handleSubmit}>
                <select
                  name="searchType"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  style={{
                    border: "none",
                    borderRadius: "4px",
                    outline: "none",
                    backgroundColor: "white",
                  }}
                >
                  <option value="datacite_titles">Title</option>
                  <option value="datacite_creators">Author</option>
                  <option value="datacite_subject">Category</option>
                </select>

                <input
                  type="text"
                  value={searchText}
                  className="form-control"
                  name="searchQuery"
                  placeholder="Search..."
                  onChange={(e) => setSearchText(e.target.value)}
                />

                <button
                  type="submit"
                  className="btn btn-outline-primary btn-sm"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
