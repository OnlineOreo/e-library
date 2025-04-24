"use client";
import React, { useState, useMemo } from "react";
import { IoChevronDown } from "react-icons/io5";
import AZFilter from "./AZFilter";
import Image from "next/image";

const DropdownMenu = ({
  title,
  items,
  isPublisher = false,
  handlePublisherClick,
}) => {
  const [search, setSearch] = useState("");

  const filteredAndSortedItems = useMemo(() => {
    if (!isPublisher) return items;

    return items
      .filter((item) =>
        (item.publisher_name || "").toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) =>
        (a.publisher_name || "").localeCompare(b.publisher_name || "")
      );
  }, [items, isPublisher, search]);

  const mediaMapping = {
    "eBooks":"/search/e-resources?q=resource_types_string%3A(e-book)",
    "Video Resources":"/search/multimedia?q=resource_types_string%3A(Video)",
    "Audio Resources":"/search/multimedia?q=resource_types_string%3A(audio)",
    "Print Collection":"/search/print-collection?q=resource_types_string%3A(book)",
    "eJournals":"/search/e-resources?q=resource_types_string%3A(e-journals)",
  }

  const categoriesMapping = {
    "Biotechnology" : "/search/print-collection?q=college_category%3A(biotechnology)",
    "Chemical Engineering" : "/search/print-collection?q=college_category%3A(chemical)",
    "Civil Engineering" : "/search/print-collection?q=college_category%3A(civil)",
    "Computer Sciences" : "/search/print-collection?q=college_category%3A(computer)",
    "Electrical Engineering" : "/search/print-collection?q=college_category%3A(electrical)",
    "Electronics & Communicatiion" : "/search/print-collection?q=college_category%3A(electronics)",
    "Finance Management" : "/search/print-collection?q=college_category%3A(finance)",
    "Human Resource Management" : "/search/print-collection?q=college_category%3A(human)",
    "Law" : "/search/print-collection?q=college_category%3A(law)",
    "Management (General)" : "/search/print-collection?q=college_category%3A(management)",
    "Marketing Management" : "/search/print-collection?q=college_category%3A(marketing)",
    "Mathematics" : "/search/print-collection?q=college_category%3A(mathematics)",
    "Mechanical Engineering " : "/search/print-collection?q=college_category%3A(mechanical)",
    "Philosophy, Religion" : "/search/print-collection?q=college_category%3A(philosophy)",
    "Physics" : "/search/print-collection?q=college_category%3A(physics)",
    "Production & Operations Management" : "/search/print-collection?q=college_category%3A(production)",
    "Social Science" : "/search/print-collection?q=college_category%3A(social)",
  }

  return (
    <>
      <button className="nav-link dropdown-btn nav-btn">
        {title}
        <IoChevronDown />
      </button>

      <div className="nav_dropdown flex-column">
        {isPublisher && (
          <>
            <div className="d-flex align-items-center justify-content-between">
              <div className="px-3 fw-bold">Publisher</div>
              <div className="px-3 pb-2">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search Publisher..."
                  className="form-control mt-2"
                  style={{ fontSize: "0.9rem" }}
                />
              </div>
            </div>

            {/* Search Input */}

            <div
              className="nav_dropdown_dropdown"
              style={{
                maxHeight: "40vh",
                overflow: "hidden",
                overflowY: "scroll",
              }}
            >
              <div className="nav_menu">
                {filteredAndSortedItems.map((item) => (
                  <div key={item.publisher_id} className="nav publisher_nav">
                    <span
                      className="dropdown-link pe-auto one_line_ellipses cursor_pointer_underline"
                      style={{ cursor: "pointer" }}
                      onClick={() => handlePublisherClick(item)}
                    >
                      <Image
                        src={item.image}
                        alt={item.publisher_name}
                        style={{
                          objectFit: "contain",
                          objectPosition: "center",
                        }}
                        width={25}
                        height={25}
                        onError={(e) => {
                          e.target.src = "/images/avatar/navbar-default.jpeg";
                          e.target.alt = "Image";
                        }}
                      />
                      {item.publisher_name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <AZFilter />
          </>
        )}

        {!isPublisher && (
          <div
            className="nav_menu"
            style={{
              height: title === "Categories" ? "50vh" : "auto",
              overflowY: title === "Categories" ? "scroll" : "visible",
              paddingBottom: title === "Media" ? 20 : 0,
            }}
          >
            {items.map((item) => (
              <div
                key={
                  item.publisher_id ||
                  item.configuration_category_id ||
                  item.configuration_media_id ||
                  item.configuration_collection_id ||
                  item.configuration_meta_id ||
                  item.page_id ||
                  item.name
                }
                className="nav"
                style={{ minWidth: "33%" }}
              >
                <a className="dropdown-link cursor_pointer_underline" 
                href=  {
                  item.configuration_category_id && categoriesMapping[item.category_name] ||
                  item.configuration_media_id && mediaMapping[item.media_name] ||
                  item.link_url ||
                  (item.page_id  && `/dynamic-page/${item.page_id}`)||
                  item.href ||
                  "#"
                }
                  >
                  <img
                    src={item.image || item.page_image}
                    alt=""
                    style={{
                      width: 25,
                      height: 25,
                      objectFit: "cover",
                    }}
                  />
                  {item.publisher_name ||
                    item.category_name ||
                    item.media_name ||
                    item.collection_name ||
                    item.list ||
                    item.page_name ||
                    item.name}
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default DropdownMenu;
