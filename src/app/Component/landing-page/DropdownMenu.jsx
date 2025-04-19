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
                      className="dropdown-link pe-auto one_line_ellipses"
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
                  item.configuration_meta_id
                }
                className="nav"
                style={{ minWidth: "33%" }}
              >
                <a className="dropdown-link one_line_ellipses" href="#">
                  <img
                    src={item.image}
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
                    item.list}
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
