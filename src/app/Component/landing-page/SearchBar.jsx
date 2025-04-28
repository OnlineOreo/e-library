'use client';

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from 'react-i18next';
import '@/i18n'; // cleaner using path alias `@`

const SearchBar = ({ show, setShow }) => {
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

  useEffect(()=>{
    if (filterType === "resource_types_string") {
      setSearchText("book"); 
    }else {
      setSearchText("");
    }
  },[filterType])

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
    <div className="search-style-2">
      <form id="search_form" className="d-flex w-100" onSubmit={handleSubmit}>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
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
            placeholder={t('Search with/without any keyword')}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: "60%" }}
          />
        )}

        <button type="submit">
          <img
            alt="Search"
            src="https://wp.alithemes.com/html/evara/evara-frontend/assets/imgs/theme/icons/search.png"
          />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
