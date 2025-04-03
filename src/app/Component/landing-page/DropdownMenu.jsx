// components/DropdownMenu.js
'use client'
import React from "react";
import { IoChevronDown } from "react-icons/io5";
import AZFilter from "./AZFilter";
import Image from "next/image";

const DropdownMenu = ({ 
  title, 
  items, 
  isPublisher = false, 
  handlePublisherClick 
}) => {
  return (
    <>
      <button className="nav-link dropdown-btn nav-btn">
        {title}
        <IoChevronDown />
      </button>
      <div className="nav_dropdown flex-column">
        {isPublisher && (
          <>
            <div className="px-3 pt-3 fw-bold">Publisher</div>
            <div
              className="nav_dropdown_dropdown"
              style={{
                maxHeight: "40vh",
                overflow: "hidden",
                overflowY: "scroll",
              }}
            >
              <div className="nav_menu">
                {items.map((item) => (
                  <div key={item.publisher_id || item.configuration_category_id || item.configuration_media_id } className="nav publisher_nav">
                    <span
                      className="dropdown-link pe-auto one_line_ellipses"
                      style={{ cursor: "pointer" }}
                      onClick={() => isPublisher && handlePublisherClick(item)}
                    >
                      <Image
                        src={item.image}
                        alt={item.image}
                        style={{
                          objectFit: isPublisher ? "contain" : "cover",
                          objectPosition: "center",
                        }}
                        width={25}
                        height={25}
                        onError={(e) => {
                          e.target.src = "/images/avatar/navbar-default.jpeg";
                          e.target.alt = "Image";
                        }}
                      />

                      {item.publisher_name || item.category_name || item.media_name}
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
              paddingBottom: title === "Media" ? 20 : 0
            }}
          >
            {items.map((item) => (
              <div
                key={item.publisher_id || item.configuration_category_id || item.configuration_media_id}
                className="nav"
                style={{ minWidth: "33%" }}
              >
                <a className="dropdown-link" href="javascript:void(0)">
                  <img
                    src={item.image}
                    alt=""
                    style={{
                      width: 25,
                      height: 25,
                      objectFit: "cover",
                    }}
                  />
                  {item.publisher_name || item.category_name || item.media_name}
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