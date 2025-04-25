"use client";
import React, { useState, useMemo, useEffect } from "react";
import { IoChevronDown } from "react-icons/io5";
import AZFilter from "./AZFilter";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import "@/i18n"; // cleaner using path alias @
import Link from "next/link";

const DropdownMenu = ({
  title,
  items,
  isPublisher = false,
  show,
  isImportantLink = true,  // Make sure this prop is passed correctly
  setShow,
  handlePublisherClick,
}) => {
  const [search, setSearch] = useState("");
  const { t, i18n } = useTranslation();
  // const filteredAndSortedItems = useMemo(() => {
  //   if (!isPublisher) return items;

  //   return items
  //     .filter((item) =>
  //       (item.publisher_name || "").toLowerCase().includes(search.toLowerCase())
  //     )
  //     .sort((a, b) =>
  //       (a.publisher_name || "").localeCompare(b.publisher_name || "")
  //     );
  // }, [search]);

  const getToken = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));
    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(getToken());
  }, []);

  const mediaMapping = {
    eBooks: "/search/e-resources?q=resource_types_string%3A(e-book)",
    "Video Resources": "/search/multimedia?q=resource_types_string%3A(Video)",
    "Audio Resources": "/search/multimedia?q=resource_types_string%3A(audio)",
    "Print Collection":
      "/search/print-collection?q=resource_types_string%3A(book)",
    eJournals: "/search/e-resources?q=resource_types_string%3A(e-journals)",
  };

  const categoriesMapping = {
    BioTechnology:
      "/search/print-collection?q=college_category%3A(biotechnology)",
    Chemical: "/search/print-collection?q=college_category%3A(chemical)",
    "Civil Engineering":
      "/search/print-collection?q=college_category%3A(civil)",
    "Computer Engineering":
      "/search/print-collection?q=college_category%3A(computer)",
    "Electrical Engineering":
      "/search/print-collection?q=college_category%3A(electrical)",
    "Electronics Engineering":
      "/search/print-collection?q=college_category%3A(electronics)",
    "Finance Management":
      "/search/print-collection?q=college_category%3A(finance)",
    "Human Resource Management":
      "/search/print-collection?q=college_category%3A(human)",
    Law: "/search/print-collection?q=college_category%3A(law)",
    "Management (General)":
      "/search/print-collection?q=college_category%3A(management)",
    "Marketing Management":
      "/search/print-collection?q=college_category%3A(marketing)",
    Mathematics: "/search/print-collection?q=college_category%3A(mathematics)",
    "Mechanical Engineering":
      "/search/print-collection?q=college_category%3A(mechanical)",
    "Philosophy, Psychology & Religion":
      "/search/print-collection?q=college_category%3A(philosophy)",
    Physics: "/search/print-collection?q=college_category%3A(physics)",
    "Production & Operations Management":
      "/search/print-collection?q=college_category%3A(production)",
    "Social Science": "/search/print-collection?q=college_category%3A(social)",
  };

  // Added debug to check if isImportantLink is being passed and used correctly
  useEffect(() => {
    console.log("isImportantLink:", isImportantLink);  // Debugging line
  }, [isImportantLink]);

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
              <div className="px-3 fw-bold">{t("Publisher")}</div>
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

            <div
              className="nav_dropdown_dropdown"
              style={{
                maxHeight: "40vh",
                overflow: "hidden",
                overflowY: "scroll",
              }}
            >
              <div className="nav_menu">
                {items.map((item,index) => (
                  <div key={index} className="nav publisher_nav">
                    <span
                      className="dropdown-link pe-auto one_line_ellipses cursor_pointer_underline"
                      style={{ cursor: "pointer" }}
                      onClick={() => handlePublisherClick(item)}
                    >
                      <img
                        src={item.image || "/images/avatar/saved_icon.png"}
                        alt={item.publisher_name}
                        width={25}
                        height={25}
                        onError={(e) => {
                          e.target.onerror = null; // Prevent infinite loop
                          e.target.src = "/images/avatar/navbar-default.jpeg";
                        }}
                        style={{
                          objectFit: "contain",
                          objectPosition: "center",
                          marginRight: 6,
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

        {/* Render block for isImportantLink */}
        {isImportantLink && (
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
                <a
                  className="dropdown-link cursor_pointer_underline"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();

                    const href =
                      (item.configuration_category_id &&
                        categoriesMapping[item.category_name]) ||
                      (item.configuration_media_id &&
                        mediaMapping[item.media_name]) ||
                      item.link_url ||
                      (item.page_id && `/dynamic-page/${item.page_id}`) ||
                      item.href ||
                      "#";

                    if (token) {
                      // If user is logged in, open the link in a new tab
                      window.open(href, '_blank');
                    } else {
                      // Show login modal and store redirect
                      setShow(true);
                      const encodedRedirect = encodeURIComponent(href);
                      window.history.replaceState(
                        null,
                        "",
                        `?extra=${encodedRedirect}`
                      );
                    }
                  }}
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

        {/* Default rendering if it's not Publisher or Important Link */}
        {!isPublisher && !isImportantLink && (
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
                <Link
                  className="dropdown-link cursor_pointer_underline"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();

                    const href =
                      (item.configuration_category_id &&
                        categoriesMapping[item.category_name]) ||
                      (item.configuration_media_id &&
                        mediaMapping[item.media_name]) ||
                      item.link_url ||
                      (item.page_id && `/dynamic-page/${item.page_id}`) ||
                      item.href ||
                      "#";

                    if (token) {
                      window.location.href = href;
                    } else {
                      setShow(true);
                      const encodedRedirect = encodeURIComponent(href);
                      window.history.replaceState(
                        null,
                        "",
                        `?q=${encodedRedirect}`
                      );
                    }
                  }}
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
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default DropdownMenu;
