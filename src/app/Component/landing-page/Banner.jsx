"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from 'react-i18next';
import '@/i18n'; // cleaner using path alias `@`

export default function Banner({ bannerData, show, setShow }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation();

  const [filterType, setFilterType] = useState("datacite_titles");
  const [searchText, setSearchText] = useState(filterType === "resource_types_string" ? "book" : "");

  const getToken = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));
    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  useEffect(() => {
    const fullQuery = searchParams.get("q") || "";
    const baseMatch = fullQuery.match(/^([a-zA-Z0-9_]+):\(([^)]+)\)/);

    if (baseMatch) {
      const type = baseMatch[1];
      setFilterType(type);
      const text = baseMatch[2];
      setSearchText(text);
    }
  }, [searchParams]);

  useEffect(() => {
    if (filterType === "resource_types_string") {
      setSearchText("book");
    } else {
      setSearchText("");
    }
  }, [filterType])

  const handleSubmit = (event) => {
    event.preventDefault();

    let catalogCore = "print-collection";
    if (filterType === "resource_types_string") {
      switch (searchText) {
        case "book":
          catalogCore = "print-collection";
          break;
        case "e-book":
        case "e-journals":
          catalogCore = "e-resources";
          break;
        case "Video":
        case "audio":
          catalogCore = "multimedia";
          break;
        default:
          catalogCore = "print-collection";
      }
    }

    const token = getToken();

    const query = `${filterType}%3A(${encodeURIComponent(searchText === "" ? "*:*" : searchText)})`;

    if (!token) {
       setShow(true);
      router.push(`/?search=/search/${catalogCore}?q=${query}`);
      return;
    }

    router.push(`/search/${catalogCore}?q=${query}`);
  };
  return (
    <>
      <style jsx>{`
        .custom-banner {
          background-color: ${bannerData?.cover_headline?.background_color ||
        "inherit"};
          font-size: ${bannerData?.cover_headline?.banner_font_size ||
        "inherit"}px !important;
          color: ${bannerData?.cover_headline?.banner_text_color ||
        "inherit"} !important;
        }
      `}</style>

      <div
        className="w-100 pt-3"
        style={{
          ...(bannerData?.so_banner
            ? {
              backgroundImage: `url(${bannerData?.upper_cover_image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundColor: bannerData?.color1,
            }
            : {
              backgroundColor: bannerData?.color1,
            }),
        }}
      >
        <div className="container-fluid hero-header d-flex align-items-center justify-content-center min-vh-50 py-4">
          <div className="container text-center w-50 px-sm-3">
            <h2
              className="fw-bold fs-md-2 fs-lg-3"
              style={{
                color: bannerData?.cover_headline?.banner_font_color || "",
              }}
            >
              {bannerData?.cover_headline?.firstQuote || ""}
            </h2>
            <p className="lead fw-semibold px-1 px-sm-4 py-3  rounded-3 d-md-inline-block d-none mt-3 shadow-sm custom-banner">
              {bannerData?.cover_headline?.subHeadline || ""}
            </p>
            <div className="d-inline-block d-md-none">
              <form className="d-flex gap-2" onSubmit={handleSubmit}>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  style={{
                    border: "none",
                    borderRadius: "4px",
                    outline: "none",
                    backgroundColor: "white",
                  }}
                >
                  <option value="datacite_titles">{t('Title')}</option>
                  <option value="datacite_creators">{t('Author')}</option>
                  <option value="resource_types_string">{t('Resource Types')}</option>
                  <option value="college_category">{t('Subject')}</option>
                </select>

                {filterType === "resource_types_string" ? (
                  <select value={searchText} onChange={(e) => setSearchText(e.target.value)} style={{ width: "60%" }}>
                    <option value="book">{t('Print Collection')}</option>
                    <option value="e-book">{t('e-book')}</option>
                    <option value="e-journals">{t('e-journals')}</option>
                    <option value="Video">{t('Video')}</option>
                    <option value="audio">{t('Audio')}</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    value={searchText}
                    placeholder={t('Search...')}
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{ width: "60%" }}
                  />
                )}

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
