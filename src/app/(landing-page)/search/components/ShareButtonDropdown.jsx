"use client"
import React, { useState, useRef, useEffect } from "react";
import {
  FaShareAlt,
  FaRegBookmark,
  FaFileDownload,
  FaFacebookSquare,
  FaLinkedin,
  FaTwitterSquare,
} from "react-icons/fa";
import { IoMail } from "react-icons/io5";

const ShareButtonDropdown = ({ id, catalogType }) => {
  const [shareDropdown, setShareDropdown] = useState(false);
  const containerRef = useRef(null);

  const baseShareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/search?filter_type=id&search_text=${id}`
      : "";

  const encodedUrl = encodeURIComponent(baseShareUrl);
  const text = encodeURIComponent("Check out this amazing book!");
  const emailSubject = encodeURIComponent("Check out this book!");
  const emailBody = encodeURIComponent(`I found this amazing book: ${baseShareUrl}`);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShareDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className=""
      style={{ position: "relative" }}
      ref={containerRef}
    >
      {/* Share icon */}
      <FaShareAlt
        size={20}
        className="me-3 cursor_pointer"
        onClick={() => setShareDropdown((prev) => !prev)}
      />

      {/* Dropdown */}
      <div
        className={`share_dropdown card transition-all position-absolute ${shareDropdown ? "show" : "hide"
          }`}
        style={{
          top: "150%",
          zIndex: 99,
          backgroundColor: "#fdfdfd",
          minWidth: "200px",
        }}
      >
        <div className="fw-bold border-bottom px-3 py-1">Share Catalog</div>
        <div className="d-flex gap-3 px-3 py-2 text-secondary">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor_pointer"
          >
            <FaFacebookSquare size={20} className="cursor-pointer" />
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor_pointer"
          >
            <FaLinkedin size={20} className="cursor-pointer" />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${text}`}
            target="_blank"
            rel="noopener noreferrer"
              className="cursor_pointer"
          >
            <FaTwitterSquare size={20} className="cursor-pointer" />
          </a>
          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=&su=${emailSubject}&body=${emailBody}`}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor_pointer"
          >
            <IoMail size={20} className="cursor-pointer" />
          </a>
        </div>
      </div>

      {/* Other Icons */}


      {/* Animation styles */}
      <style jsx>{`
        .transition-all {
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .show {
          opacity: 1;
          transform: scale(1);
          pointer-events: auto;
        }
        .hide {
          opacity: 0;
          transform: scale(0.95);
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default ShareButtonDropdown;
