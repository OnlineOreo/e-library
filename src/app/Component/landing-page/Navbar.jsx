import React from 'react'
import MobileNav from "./MobileNav";
import { FaUser } from "react-icons/fa";
import Link from 'next/link';

const Navbar = () => {
    return (
        <>
        <div className="container-fluid bg-white p-0">
            <header
  className="header-area  header-style-4 header-height-2"
  data-select2-id={9}
>
  <div
    className="header-middle sticky-bar header-middle-ptb-1 d-none d-lg-block"
    data-select2-id={8}
  >
    <div className="container">
      <div className="header-wrap">
        <div className="logo logo-width-1">
          <a href="/">
            <img
              src="http://mriirs.libvirtuua.com:8000/storage/landing_page/elib_transparent_logo.png"
              alt="App Icon"
            />
          </a>
        </div>
        <div className="header-right">
          <div className="search-style-2">
            <form
              action="http://mriirs.libvirtuua.com:8000/search"
              id="search_form"
              method="GET"
              className="d-flex w-100"
            >
              <select
                id="filterType"
                name="filter_type"
                className="select-active"
              >
                <option value="datacite_titles" selected="">
                  Title
                </option>
                <option value="datacite_creators">Author</option>
                <option value="datacite_subject">Subject</option>
                <option value="languages">Language</option>
                <option value="dc_publishers">Publisher</option>
                <option value="dc_description">Description</option>
                <option value="resource_types">Resource Type</option>
                <option value="ISBN">ISBN</option>
                <option value="url">URL</option>
                <option value="datacite_titles">A-Z Filter</option>
              </select>
              <input
                type="text"
                placeholder="Enter title..."
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
        </div>
        <div className="header-action-right">
          <div className="header-action-2">
            <div className="header-action-icon-2">
              {/* Show SignIn button if the user is logged out */}
              <Link
                href="./authentication/sign-in"
                title="Signin"
                className="btn btn-primary-gradient rounded-pill py-2 px-4 d-lg-block mb-0"
                style={{ textWrap: "nowrap" }}
              >
                <FaUser />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="header-bottom header-bottom-bg-color ">
    <div className="container-xxl">
      <div className="header-wrap header-space-between position-relative">
        <div className="logo logo-width-1 d-block d-lg-none">
          <a href="/">
            <img
              src="http://mriirs.libvirtuua.com:8000/storage/landing_page/elib_transparent_logo.png"
              alt="App Icon"
            />
          </a>
        </div>
        <div className="header-nav d-none d-lg-flex">
          <div className="main-menu main-menu-padding-1 main-menu-lh-2 d-none d-lg-block">
            <nav className="menu">
              <ul className="menu-bar menu_bar_a navbar-nav">
                <li>
                  <a className="nav-link nav-btn" href="/">
                    Home
                  </a>
                </li>
                <li>
                  <button
                    className="nav-link dropdown-btn nav-btn"
                    data-dropdown="dropdown1"
                    aria-haspopup="true"
                    aria-expanded="false"
                    aria-label="discover"
                  >
                    eResources
                    <i
                      className="fa-solid fa-angle-down fa-sm"
                      aria-hidden="true"
                    />
                  </button>
                  <div id="dropdown1" className="nav_dropdown flex-column">
                    <div className="px-3 pt-3 fw-bold">Publisher</div>
                    <div
                      className="nav_dropdown_dropdown"
                      style={{
                        maxHeight: "40vh",
                        overflow: "hidden",
                        overflowY: "scroll"
                      }}
                    >
                      <div className="nav_menu">
                        <div className="nav publisher_nav">
                          <span
                            className="dropdown-link pe-auto one_line_ellipses  "
                            style={{ cursor: "pointer" }}
                            forward="/check-auth"
                            onclick="window.open('/check-auth', '_blank')"
                          >
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/publishers "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                                objectPosition: "center"
                              }}
                            />
                            Academic Journals
                          </span>
                        </div>
                        <div className="nav publisher_nav">
                          <span
                            className="dropdown-link pe-auto one_line_ellipses  "
                            style={{ cursor: "pointer" }}
                            forward="/check-auth"
                            onclick="window.open('/check-auth', '_blank')"
                          >
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/publishers/b9c49355-de94-4031-8f0c-bc47807c4899.png "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                                objectPosition: "center"
                              }}
                            />
                            Ace Equity Nxt
                          </span>
                        </div>
                        <div className="nav publisher_nav">
                          <span
                            className="dropdown-link pe-auto one_line_ellipses  "
                            style={{ cursor: "pointer" }}
                            forward="/check-auth"
                            onclick="window.open('/check-auth', '_blank')"
                          >
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/publishers/pubs-logo-481x82-1523435513963.webp "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                                objectPosition: "center"
                              }}
                            />
                            ACS Online Database
                          </span>
                        </div>
                        <div className="nav publisher_nav">
                          <span
                            className="dropdown-link pe-auto one_line_ellipses  "
                            style={{ cursor: "pointer" }}
                            forward="/check-auth"
                            onclick="window.open('/check-auth', '_blank')"
                          >
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/publishers/AJOL_logo.png "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                                objectPosition: "center"
                              }}
                            />
                            African Journal Online
                          </span>
                        </div>
                        <div className="nav publisher_nav">
                          <span
                            className="dropdown-link pe-auto one_line_ellipses  "
                            style={{ cursor: "pointer" }}
                            forward="/check-auth"
                            onclick="window.open('/check-auth', '_blank')"
                          >
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/publishers/aps-logo.svg "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                                objectPosition: "center"
                              }}
                            />
                            AIP APS-ALL
                          </span>
                        </div>
                        <div className="nav publisher_nav">
                          <span
                            className="dropdown-link pe-auto one_line_ellipses  "
                            style={{ cursor: "pointer" }}
                            forward="/check-auth"
                            onclick="window.open('/check-auth', '_blank')"
                          >
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/publishers/51434d70-5119-45bf-93ed-57e089e5826c.png "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                                objectPosition: "center"
                              }}
                            />
                            American Mathematical Society
                          </span>
                        </div>
                        <div className="nav publisher_nav">
                          <span
                            className="dropdown-link pe-auto one_line_ellipses  "
                            style={{ cursor: "pointer" }}
                            forward="/check-auth"
                            onclick="window.open('/check-auth', '_blank')"
                          >
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/publishers/barandbench.avif "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                                objectPosition: "center"
                              }}
                            />
                            Bar &amp; Bench
                          </span>
                        </div>
                        <div className="nav publisher_nav">
                          <span
                            className="dropdown-link pe-auto one_line_ellipses  "
                            style={{ cursor: "pointer" }}
                            forward="/check-auth"
                            onclick="window.open('/check-auth', '_blank')"
                          >
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/publishers/cmie_logo.gif "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                                objectPosition: "center"
                              }}
                            />
                            Consumer Pyramidsdx
                          </span>
                        </div>
                        <div className="nav publisher_nav">
                          <span
                            className="dropdown-link pe-auto one_line_ellipses  "
                            style={{ cursor: "pointer" }}
                            forward="/check-auth"
                            onclick="window.open('/check-auth', '_blank')"
                          >
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/publishers/copernicus_log.png "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                                objectPosition: "center"
                              }}
                            />
                            Copernicans
                          </span>
                        </div>
                        <div className="nav publisher_nav">
                          <span
                            className="dropdown-link pe-auto one_line_ellipses  "
                            style={{ cursor: "pointer" }}
                            forward="/check-auth"
                            onclick="window.open('/check-auth', '_blank')"
                          >
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/publishers/corporate_law_adviser_logo.png "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                                objectPosition: "center"
                              }}
                            />
                            Corporate Law Adviser
                          </span>
                        </div>
                        <div className="nav publisher_nav">
                          <span
                            className="dropdown-link pe-auto one_line_ellipses  "
                            style={{ cursor: "pointer" }}
                            forward="/check-auth"
                            onclick="window.open('/check-auth', '_blank')"
                          >
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/publishers/5cab568e-da6c-4319-96cf-a19909b025e9.png "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                                objectPosition: "center"
                              }}
                            />
                            Dev Consort
                          </span>
                        </div>
                        <div className="nav publisher_nav">
                          <span
                            className="dropdown-link pe-auto one_line_ellipses  "
                            style={{ cursor: "pointer" }}
                            forward="/check-auth"
                            onclick="window.open('/check-auth', '_blank')"
                          >
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/publishers/06778b86-8a27-4608-9355-87709fff0d00.png "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                                objectPosition: "center"
                              }}
                            />
                            Directory of Open Access Journal (Doaj)
                          </span>
                        </div>
                        <div className="nav publisher_nav">
                          <span
                            className="dropdown-link pe-auto one_line_ellipses  "
                            style={{ cursor: "pointer" }}
                            forward="/check-auth"
                            onclick="window.open('/check-auth', '_blank')"
                          >
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/publishers/dovepress_logo.webp "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                                objectPosition: "center"
                              }}
                            />
                            Dovepress
                          </span>
                        </div>
                        <div className="nav publisher_nav">
                          <span
                            className="dropdown-link pe-auto one_line_ellipses pub_remote "
                            style={{ cursor: "pointer" }}
                            forward="/check-auth"
                            onclick="window.open('/check-auth', '_blank')"
                          >
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/publishers/c381fded-63b1-460d-a10d-e152d29c1568.jpeg "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                                objectPosition: "center"
                              }}
                            />
                            EBSCO Academic Collection
                          </span>
                        </div>
                        <div className="nav publisher_nav">
                          <span
                            className="dropdown-link pe-auto one_line_ellipses  "
                            style={{ cursor: "pointer" }}
                            forward="/check-auth"
                            onclick="window.open('/check-auth', '_blank')"
                          >
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/publishers/economic_outlook_logo.png "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                                objectPosition: "center"
                              }}
                            />
                            Economic Outlook
                          </span>
                        </div>
                        <div className="nav publisher_nav">
                          <span
                            className="dropdown-link pe-auto one_line_ellipses  "
                            style={{ cursor: "pointer" }}
                            forward="/check-auth"
                            onclick="window.open('/check-auth', '_blank')"
                          >
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/publishers/epw_research_foundation_logo.jpg "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                                objectPosition: "center"
                              }}
                            />
                            EPWRF India Time Series
                          </span>
                        </div>
                        <div className="nav publisher_nav">
                          <span
                            className="dropdown-link pe-auto one_line_ellipses  "
                            style={{ cursor: "pointer" }}
                            forward="/check-auth"
                            onclick="window.open('/check-auth', '_blank')"
                          >
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/publishers/gar-logo.svg "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                                objectPosition: "center"
                              }}
                            />
                            Global Arbitration Review (GAR)
                          </span>
                        </div>
                        <div className="nav publisher_nav">
                          <span
                            className="dropdown-link pe-auto one_line_ellipses  "
                            style={{ cursor: "pointer" }}
                            forward="/check-auth"
                            onclick="window.open('/check-auth', '_blank')"
                          >
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/publishers/cropped-HeinOnline-Logo-File.png "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                                objectPosition: "center"
                              }}
                            />
                            Heinonline
                          </span>
                        </div>
                        <div className="nav publisher_nav">
                          <span
                            className="dropdown-link pe-auto one_line_ellipses  "
                            style={{ cursor: "pointer" }}
                            forward="/check-auth"
                            onclick="window.open('/check-auth', '_blank')"
                          >
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/publishers/4e30f707-7565-4b4e-a639-05b02b530d5f.png "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                                objectPosition: "center"
                              }}
                            />
                            IEEE Xplore
                          </span>
                        </div>
                        <div className="nav publisher_nav">
                          <span
                            className="dropdown-link pe-auto one_line_ellipses  "
                            style={{ cursor: "pointer" }}
                            forward="/check-auth"
                            onclick="window.open('/check-auth', '_blank')"
                          >
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/publishers/logo_glowne_1000.png "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                                objectPosition: "center"
                              }}
                            />
                            Index Copernicus
                          </span>
                        </div>
                        <div className="nav publisher_nav">
                          <span
                            className="dropdown-link pe-auto one_line_ellipses  "
                            style={{ cursor: "pointer" }}
                            forward="/check-auth"
                            onclick="window.open('/check-auth', '_blank')"
                          >
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/publishers/Indiastat.svg "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                                objectPosition: "center"
                              }}
                            />
                            Indiastat
                          </span>
                        </div>
                        <div className="nav publisher_nav">
                          <span
                            className="dropdown-link pe-auto one_line_ellipses  "
                            style={{ cursor: "pointer" }}
                            forward="/check-auth"
                            onclick="window.open('/check-auth', '_blank')"
                          >
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/publishers/jstor_logo.svg "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                                objectPosition: "center"
                              }}
                            />
                            JSTOR
                          </span>
                        </div>
                        <div className="nav publisher_nav">
                          <span
                            className="dropdown-link pe-auto one_line_ellipses  "
                            style={{ cursor: "pointer" }}
                            forward="/check-auth"
                            onclick="window.open('/check-auth', '_blank')"
                          >
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/publishers/jus_mundi_logo.svg "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                                objectPosition: "center"
                              }}
                            />
                            Jus Mundi
                          </span>
                        </div>
                        <div className="nav publisher_nav">
                          <span
                            className="dropdown-link pe-auto one_line_ellipses  "
                            style={{ cursor: "pointer" }}
                            forward="/check-auth"
                            onclick="window.open('/check-auth', '_blank')"
                          >
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/publishers/d4a07bef-b14f-4a94-8e11-321089152a85.png "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                                objectPosition: "center"
                              }}
                            />
                            Kluwer Arbitration
                          </span>
                        </div>
                        <div className="nav publisher_nav">
                          <span
                            className="dropdown-link pe-auto one_line_ellipses  "
                            style={{ cursor: "pointer" }}
                            forward="/check-auth"
                            onclick="window.open('/check-auth', '_blank')"
                          >
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/publishers/b33c31f1-5d8e-4311-830d-3537be74a619.png "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                                objectPosition: "center"
                              }}
                            />
                            Lexis Advance
                          </span>
                        </div>
                        <div className="nav publisher_nav">
                          <span
                            className="dropdown-link pe-auto one_line_ellipses  "
                            style={{ cursor: "pointer" }}
                            forward="/check-auth"
                            onclick="window.open('/check-auth', '_blank')"
                          >
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/publishers/manupatra_logo.png "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                                objectPosition: "center"
                              }}
                            />
                            Manupatra
                          </span>
                        </div>
                        <div className="nav publisher_nav">
                          <span
                            className="dropdown-link pe-auto one_line_ellipses  "
                            style={{ cursor: "pointer" }}
                            forward="/check-auth"
                            onclick="window.open('/check-auth', '_blank')"
                          >
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/publishers/math_science_inet_logo.png "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                                objectPosition: "center"
                              }}
                            />
                            Mathscinet
                          </span>
                        </div>
                        <div className="nav publisher_nav">
                          <span
                            className="dropdown-link pe-auto one_line_ellipses  "
                            style={{ cursor: "pointer" }}
                            forward="/check-auth"
                            onclick="window.open('/check-auth', '_blank')"
                          >
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/publishers/plogo_opil_mpil.png "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                                objectPosition: "center"
                              }}
                            />
                            Max Planck Encyclopedia of Public International Law
                          </span>
                        </div>
                        <div className="nav publisher_nav">
                          <span
                            className="dropdown-link pe-auto one_line_ellipses  "
                            style={{ cursor: "pointer" }}
                            forward="/check-auth"
                            onclick="window.open('/check-auth', '_blank')"
                          >
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/publishers/nature.svg "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                                objectPosition: "center"
                              }}
                            />
                            Nature
                          </span>
                        </div>
                        <div className="nav publisher_nav">
                          <span
                            className="dropdown-link pe-auto one_line_ellipses  "
                            style={{ cursor: "pointer" }}
                            forward="/check-auth"
                            onclick="window.open('/check-auth', '_blank')"
                          >
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/publishers/76d13149-f341-485e-9472-0e7cd7bb8272.png "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                                objectPosition: "center"
                              }}
                            />
                            Open Access Journal Search Engine
                          </span>
                        </div>
                        <div className="nav publisher_nav">
                          <span
                            className="dropdown-link pe-auto one_line_ellipses  "
                            style={{ cursor: "pointer" }}
                            forward="/check-auth"
                            onclick="window.open('/check-auth', '_blank')"
                          >
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/publishers/overton_logo_navy_2x-1.png "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                                objectPosition: "center"
                              }}
                            />
                            Overton
                          </span>
                        </div>
                        <div className="nav publisher_nav">
                          <span
                            className="dropdown-link pe-auto one_line_ellipses  "
                            style={{ cursor: "pointer" }}
                            forward="/check-auth"
                            onclick="window.open('/check-auth', '_blank')"
                          >
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/publishers/oxford-academic-logo.svg "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                                objectPosition: "center"
                              }}
                            />
                            Oxford International Organizations
                          </span>
                        </div>
                        <div className="nav publisher_nav">
                          <span
                            className="dropdown-link pe-auto one_line_ellipses  "
                            style={{ cursor: "pointer" }}
                            forward="/check-auth"
                            onclick="window.open('/check-auth', '_blank')"
                          >
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/publishers/oxford-academic-logo.svg "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                                objectPosition: "center"
                              }}
                            />
                            Oxford Scholarly Authorities on International Law
                          </span>
                        </div>
                        <div className="nav publisher_nav">
                          <span
                            className="dropdown-link pe-auto one_line_ellipses  "
                            style={{ cursor: "pointer" }}
                            forward="/check-auth"
                            onclick="window.open('/check-auth', '_blank')"
                          >
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/publishers/oxford-academic-logo.svg "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                                objectPosition: "center"
                              }}
                            />
                            Oxford University Press
                          </span>
                        </div>
                        <div className="nav publisher_nav">
                          <span
                            className="dropdown-link pe-auto one_line_ellipses  "
                            style={{ cursor: "pointer" }}
                            forward="/check-auth"
                            onclick="window.open('/check-auth', '_blank')"
                          >
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/publishers/a3e59d55-a865-4344-b853-882c8deb4810.png "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                                objectPosition: "center"
                              }}
                            />
                            Proview (SAML)
                          </span>
                        </div>
                        <div className="nav publisher_nav">
                          <span
                            className="dropdown-link pe-auto one_line_ellipses  "
                            style={{ cursor: "pointer" }}
                            forward="/check-auth"
                            onclick="window.open('/check-auth', '_blank')"
                          >
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/publishers/03a723dc-56d7-4979-a376-74fe773fdaef.png "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                                objectPosition: "center"
                              }}
                            />
                            ProwessDx
                          </span>
                        </div>
                        <div className="nav publisher_nav">
                          <span
                            className="dropdown-link pe-auto one_line_ellipses  "
                            style={{ cursor: "pointer" }}
                            forward="/check-auth"
                            onclick="window.open('/check-auth', '_blank')"
                          >
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/publishers/rsc-logo.png "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                                objectPosition: "center"
                              }}
                            />
                            Royal Society Of Chemistry
                          </span>
                        </div>
                        <div className="nav publisher_nav">
                          <span
                            className="dropdown-link pe-auto one_line_ellipses  "
                            style={{ cursor: "pointer" }}
                            forward="/check-auth"
                            onclick="window.open('/check-auth', '_blank')"
                          >
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/publishers/sage-journals-logo.svg "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                                objectPosition: "center"
                              }}
                            />
                            Sage open
                          </span>
                        </div>
                        <div className="nav publisher_nav">
                          <span
                            className="dropdown-link pe-auto one_line_ellipses  "
                            style={{ cursor: "pointer" }}
                            forward="/check-auth"
                            onclick="window.open('/check-auth', '_blank')"
                          >
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/publishers/scc-logo.png "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                                objectPosition: "center"
                              }}
                            />
                            SCC Online
                          </span>
                        </div>
                        <div className="nav publisher_nav">
                          <span
                            className="dropdown-link pe-auto one_line_ellipses  "
                            style={{ cursor: "pointer" }}
                            forward="/check-auth"
                            onclick="window.open('/check-auth', '_blank')"
                          >
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/publishers/science.svg "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                                objectPosition: "center"
                              }}
                            />
                            Science Journals Current and Achieves
                          </span>
                        </div>
                        <div className="nav publisher_nav">
                          <span
                            className="dropdown-link pe-auto one_line_ellipses  "
                            style={{ cursor: "pointer" }}
                            forward="/check-auth"
                            onclick="window.open('/check-auth', '_blank')"
                          >
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/publishers/siam_logo.png "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                                objectPosition: "center"
                              }}
                            />
                            SIAM Journals
                          </span>
                        </div>
                        <div className="nav publisher_nav">
                          <span
                            className="dropdown-link pe-auto one_line_ellipses  "
                            style={{ cursor: "pointer" }}
                            forward="/check-auth"
                            onclick="window.open('/check-auth', '_blank')"
                          >
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/publishers/ssrn-logo.svg "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                                objectPosition: "center"
                              }}
                            />
                            Social science Research Network
                          </span>
                        </div>
                        <div className="nav publisher_nav">
                          <span
                            className="dropdown-link pe-auto one_line_ellipses  "
                            style={{ cursor: "pointer" }}
                            forward="/check-auth"
                            onclick="window.open('/check-auth', '_blank')"
                          >
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/publishers/Sabinet_logo.svg "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                                objectPosition: "center"
                              }}
                            />
                            South African Journals
                          </span>
                        </div>
                        <div className="nav publisher_nav">
                          <span
                            className="dropdown-link pe-auto one_line_ellipses  "
                            style={{ cursor: "pointer" }}
                            forward="/check-auth"
                            onclick="window.open('/check-auth', '_blank')"
                          >
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/publishers/logo-springerlink-39ee2a28d8.svg "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                                objectPosition: "center"
                              }}
                            />
                            SpringerLink
                          </span>
                        </div>
                        <div className="nav publisher_nav">
                          <span
                            className="dropdown-link pe-auto one_line_ellipses  "
                            style={{ cursor: "pointer" }}
                            forward="/check-auth"
                            onclick="window.open('/check-auth', '_blank')"
                          >
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/publishers/taxmann-logo.webp "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                                objectPosition: "center"
                              }}
                            />
                            Taxmann
                          </span>
                        </div>
                        <div className="nav publisher_nav">
                          <span
                            className="dropdown-link pe-auto one_line_ellipses  "
                            style={{ cursor: "pointer" }}
                            forward="/check-auth"
                            onclick="window.open('/check-auth', '_blank')"
                          >
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/publishers/taxsutra-logo.png "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                                objectPosition: "center"
                              }}
                            />
                            TaxSutra.com
                          </span>
                        </div>
                        <div className="nav publisher_nav">
                          <span
                            className="dropdown-link pe-auto one_line_ellipses  "
                            style={{ cursor: "pointer" }}
                            forward="/check-auth"
                            onclick="window.open('/check-auth', '_blank')"
                          >
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/publishers/6fef3ef9-4b26-4651-8bf8-a8dd4ac3353e.png "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                                objectPosition: "center"
                              }}
                            />
                            WestLaw Asia
                          </span>
                        </div>
                        <div className="nav publisher_nav">
                          <span
                            className="dropdown-link pe-auto one_line_ellipses  "
                            style={{ cursor: "pointer" }}
                            forward="/check-auth"
                            onclick="window.open('/check-auth', '_blank')"
                          >
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/publishers/f7e1fbe5-3a2c-4fc3-9288-2e85d57c3739.png "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                                objectPosition: "center"
                              }}
                            />
                            WestLaw Classic
                          </span>
                        </div>
                        <div className="nav publisher_nav">
                          <span
                            className="dropdown-link pe-auto one_line_ellipses  "
                            style={{ cursor: "pointer" }}
                            forward="/check-auth"
                            onclick="window.open('/check-auth', '_blank')"
                          >
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/publishers/world-scientificWSPC-LOGO-250-1541381839657.webp "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                                objectPosition: "center"
                              }}
                            />
                            World Scientific Publication Mathematics
                          </span>
                        </div>
                        <div className="nav publisher_nav">
                          <span
                            className="dropdown-link pe-auto one_line_ellipses  "
                            style={{ cursor: "pointer" }}
                            forward="/check-auth"
                            onclick="window.open('/check-auth', '_blank')"
                          >
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/publishers/e8650562-0822-414f-85d0-785ff2370212.jpeg "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                                objectPosition: "center"
                              }}
                            />
                            World Trade Law.net
                          </span>
                        </div>
                        <div className="nav publisher_nav">
                          <span
                            className="dropdown-link pe-auto one_line_ellipses  "
                            style={{ cursor: "pointer" }}
                            forward="/check-auth"
                            onclick="window.open('/check-auth', '_blank')"
                          >
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/publishers/e8650562-0822-414f-85d0-785ff2370212.jpeg "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                                objectPosition: "center"
                              }}
                            />
                            MRIIRS
                          </span>
                        </div>
                        <div className="nav publisher_nav">
                          <span
                            className="dropdown-link pe-auto one_line_ellipses  "
                            style={{ cursor: "pointer" }}
                            forward="/check-auth"
                            onclick="window.open('/check-auth', '_blank')"
                          >
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/publishers/e8650562-0822-414f-85d0-785ff2370212.jpeg "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                                objectPosition: "center"
                              }}
                            />
                            BBB
                          </span>
                        </div>
                        <div className="nav publisher_nav">
                          <span
                            className="dropdown-link pe-auto one_line_ellipses  "
                            style={{ cursor: "pointer" }}
                            forward="/check-auth"
                            onclick="window.open('/check-auth', '_blank')"
                          >
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/publishers/e8650562-0822-414f-85d0-785ff2370212.jpeg "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                                objectPosition: "center"
                              }}
                            />
                            FRI
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="a_to_z px-3 pb-3 mt-2">
                      <div className="head mb-2">Search A To Z</div>
                      <div className="d-flex flex-wrap gap-2">
                        <a href="http://mriirs.libvirtuua.com:8000/aToZ_Filter?filter_type=dc_publishers&first_text=A">
                          <span>A</span>
                        </a>
                        <a href="http://mriirs.libvirtuua.com:8000/aToZ_Filter?filter_type=dc_publishers&first_text=B">
                          <span>B</span>
                        </a>
                        <a href="http://mriirs.libvirtuua.com:8000/aToZ_Filter?filter_type=dc_publishers&first_text=C">
                          <span>C</span>
                        </a>
                        <a href="http://mriirs.libvirtuua.com:8000/aToZ_Filter?filter_type=dc_publishers&first_text=D">
                          <span>D</span>
                        </a>
                        <a href="http://mriirs.libvirtuua.com:8000/aToZ_Filter?filter_type=dc_publishers&first_text=E">
                          <span>E</span>
                        </a>
                        <a href="http://mriirs.libvirtuua.com:8000/aToZ_Filter?filter_type=dc_publishers&first_text=F">
                          <span>F</span>
                        </a>
                        <a href="http://mriirs.libvirtuua.com:8000/aToZ_Filter?filter_type=dc_publishers&first_text=G">
                          <span>G</span>
                        </a>
                        <a href="http://mriirs.libvirtuua.com:8000/aToZ_Filter?filter_type=dc_publishers&first_text=H">
                          <span>H</span>
                        </a>
                        <a href="http://mriirs.libvirtuua.com:8000/aToZ_Filter?filter_type=dc_publishers&first_text=I">
                          <span>I</span>
                        </a>
                        <a href="http://mriirs.libvirtuua.com:8000/aToZ_Filter?filter_type=dc_publishers&first_text=J">
                          <span>J</span>
                        </a>
                        <a href="http://mriirs.libvirtuua.com:8000/aToZ_Filter?filter_type=dc_publishers&first_text=K">
                          <span>K</span>
                        </a>
                        <a href="http://mriirs.libvirtuua.com:8000/aToZ_Filter?filter_type=dc_publishers&first_text=L">
                          <span>L</span>
                        </a>
                        <a href="http://mriirs.libvirtuua.com:8000/aToZ_Filter?filter_type=dc_publishers&first_text=M">
                          <span>M</span>
                        </a>
                        <a href="http://mriirs.libvirtuua.com:8000/aToZ_Filter?filter_type=dc_publishers&first_text=N">
                          <span>N</span>
                        </a>
                        <a href="http://mriirs.libvirtuua.com:8000/aToZ_Filter?filter_type=dc_publishers&first_text=O">
                          <span>O</span>
                        </a>
                        <a href="http://mriirs.libvirtuua.com:8000/aToZ_Filter?filter_type=dc_publishers&first_text=P">
                          <span>P</span>
                        </a>
                        <a href="http://mriirs.libvirtuua.com:8000/aToZ_Filter?filter_type=dc_publishers&first_text=Q">
                          <span>Q</span>
                        </a>
                        <a href="http://mriirs.libvirtuua.com:8000/aToZ_Filter?filter_type=dc_publishers&first_text=R">
                          <span>R</span>
                        </a>
                        <a href="http://mriirs.libvirtuua.com:8000/aToZ_Filter?filter_type=dc_publishers&first_text=S">
                          <span>S</span>
                        </a>
                        <a href="http://mriirs.libvirtuua.com:8000/aToZ_Filter?filter_type=dc_publishers&first_text=T">
                          <span>T</span>
                        </a>
                        <a href="http://mriirs.libvirtuua.com:8000/aToZ_Filter?filter_type=dc_publishers&first_text=U">
                          <span>U</span>
                        </a>
                        <a href="http://mriirs.libvirtuua.com:8000/aToZ_Filter?filter_type=dc_publishers&first_text=V">
                          <span>V</span>
                        </a>
                        <a href="http://mriirs.libvirtuua.com:8000/aToZ_Filter?filter_type=dc_publishers&first_text=W">
                          <span>W</span>
                        </a>
                        <a href="http://mriirs.libvirtuua.com:8000/aToZ_Filter?filter_type=dc_publishers&first_text=X">
                          <span>X</span>
                        </a>
                        <a href="http://mriirs.libvirtuua.com:8000/aToZ_Filter?filter_type=dc_publishers&first_text=Y">
                          <span>Y</span>
                        </a>
                        <a href="http://mriirs.libvirtuua.com:8000/aToZ_Filter?filter_type=dc_publishers&first_text=Z">
                          <span>Z</span>
                        </a>
                        <a
                          href="http://mriirs.libvirtuua.com:8000/aToZ_Filter?filter_type=dc_publishers&first_text="
                          className="see_all_btn mt-1"
                        >
                          See All
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <button
                    className="nav-link dropdown-btn nav-btn"
                    data-dropdown="dropdown2"
                    aria-haspopup="true"
                    aria-expanded="false"
                    aria-label="browse"
                  >
                    Categories
                    <i
                      className="fa-solid fa-angle-down fa-sm"
                      aria-hidden="true"
                    />
                  </button>
                  <div id="dropdown2" className="nav_dropdown">
                    <div className="nav_menu">
                      <div className="nav" style={{ minWidth: "33%" }}>
                        <a className="dropdown-link" href="#adobe-xd">
                          <img
                            src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/a0d7d295-92fc-48b9-8576-029512be22c9.png "
                            alt=""
                            style={{
                              width: 25,
                              height: 25,
                              objectFit: "cover"
                            }}
                          />
                          Chemical Engineering
                        </a>
                      </div>
                      <div className="nav" style={{ minWidth: "33%" }}>
                        <a className="dropdown-link" href="#adobe-xd">
                          <img
                            src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/61f88728-c961-4add-8681-99de9001a812.png "
                            alt=""
                            style={{
                              width: 25,
                              height: 25,
                              objectFit: "cover"
                            }}
                          />
                          Civil Engineering
                        </a>
                      </div>
                      <div className="nav" style={{ minWidth: "33%" }}>
                        <a className="dropdown-link" href="#adobe-xd">
                          <img
                            src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/88f3a9ef-f7b1-4aa8-b41f-b52dfef002ab.jpg "
                            alt=""
                            style={{
                              width: 25,
                              height: 25,
                              objectFit: "cover"
                            }}
                          />
                          Computer Science &amp; IT
                        </a>
                      </div>
                      <div className="nav" style={{ minWidth: "33%" }}>
                        <a className="dropdown-link" href="#adobe-xd">
                          <img
                            src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/8ed8ee3c-7ec2-478a-aa4c-547e94b82ce3.png "
                            alt=""
                            style={{
                              width: 25,
                              height: 25,
                              objectFit: "cover"
                            }}
                          />
                          Electrical Engineering
                        </a>
                      </div>
                      <div className="nav" style={{ minWidth: "33%" }}>
                        <a className="dropdown-link" href="#adobe-xd">
                          <img
                            src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/ba00cbf6-22dc-4b13-be89-a5dbc0203d32.png "
                            alt=""
                            style={{
                              width: 25,
                              height: 25,
                              objectFit: "cover"
                            }}
                          />
                          Electronics &amp; Comminication
                        </a>
                      </div>
                      <div className="nav" style={{ minWidth: "33%" }}>
                        <a className="dropdown-link" href="#adobe-xd">
                          <img
                            src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/e6b7f683-ed78-4a26-8068-aff3c0fcdbfc.png "
                            alt=""
                            style={{
                              width: 25,
                              height: 25,
                              objectFit: "cover"
                            }}
                          />
                          Finance Management
                        </a>
                      </div>
                      <div className="nav" style={{ minWidth: "33%" }}>
                        <a className="dropdown-link" href="#adobe-xd">
                          <img
                            src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/54882c82-d351-406e-8f7f-b1f8248d5382.png "
                            alt=""
                            style={{
                              width: 25,
                              height: 25,
                              objectFit: "cover"
                            }}
                          />
                          Human Resource Management
                        </a>
                      </div>
                      <div className="nav" style={{ minWidth: "33%" }}>
                        <a className="dropdown-link" href="#adobe-xd">
                          <img
                            src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/6f6ca1d1-0eed-40ba-aaaa-682f2a7561c9.png "
                            alt=""
                            style={{
                              width: 25,
                              height: 25,
                              objectFit: "cover"
                            }}
                          />
                          Law
                        </a>
                      </div>
                      <div className="nav" style={{ minWidth: "33%" }}>
                        <a className="dropdown-link" href="#adobe-xd">
                          <img
                            src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/56867f44-6820-48ee-af25-10ef4537041f.png "
                            alt=""
                            style={{
                              width: 25,
                              height: 25,
                              objectFit: "cover"
                            }}
                          />
                          Management (Genral)
                        </a>
                      </div>
                      <div className="nav" style={{ minWidth: "33%" }}>
                        <a className="dropdown-link" href="#adobe-xd">
                          <img
                            src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/d4deec61-7848-4366-9b5c-7caf2f6c2375.png "
                            alt=""
                            style={{
                              width: 25,
                              height: 25,
                              objectFit: "cover"
                            }}
                          />
                          Marketing Management
                        </a>
                      </div>
                      <div className="nav" style={{ minWidth: "33%" }}>
                        <a className="dropdown-link" href="#adobe-xd">
                          <img
                            src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/35c3b20a-3a0b-4047-bcbf-63d7510dc2d7.png "
                            alt=""
                            style={{
                              width: 25,
                              height: 25,
                              objectFit: "cover"
                            }}
                          />
                          Mathematics
                        </a>
                      </div>
                      <div className="nav" style={{ minWidth: "33%" }}>
                        <a className="dropdown-link" href="#adobe-xd">
                          <img
                            src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/a11c7e79-b3a1-4235-9913-8394bd878f0c.png "
                            alt=""
                            style={{
                              width: 25,
                              height: 25,
                              objectFit: "cover"
                            }}
                          />
                          Machenical Engineering
                        </a>
                      </div>
                      <div className="nav" style={{ minWidth: "33%" }}>
                        <a className="dropdown-link" href="#adobe-xd">
                          <img
                            src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/6b6bdc1e-3931-40dc-b67b-629ee77dfbcf.png "
                            alt=""
                            style={{
                              width: 25,
                              height: 25,
                              objectFit: "cover"
                            }}
                          />
                          Philosphy, Psycology &amp; Religion
                        </a>
                      </div>
                      <div className="nav" style={{ minWidth: "33%" }}>
                        <a className="dropdown-link" href="#adobe-xd">
                          <img
                            src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/7fe33cb5-1377-4c80-b044-ed6d41f05623.jpg "
                            alt=""
                            style={{
                              width: 25,
                              height: 25,
                              objectFit: "cover"
                            }}
                          />
                          Physics
                        </a>
                      </div>
                      <div className="nav" style={{ minWidth: "33%" }}>
                        <a className="dropdown-link" href="#adobe-xd">
                          <img
                            src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/c2802765-0f0a-4a8d-aa38-64dd1dccaa50.png "
                            alt=""
                            style={{
                              width: 25,
                              height: 25,
                              objectFit: "cover"
                            }}
                          />
                          Production &amp; Opration Management
                        </a>
                      </div>
                      <div className="nav" style={{ minWidth: "33%" }}>
                        <a className="dropdown-link" href="#adobe-xd">
                          <img
                            src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/12612978-ac4a-46b9-b8d4-0af803a9ecee.png "
                            alt=""
                            style={{
                              width: 25,
                              height: 25,
                              objectFit: "cover"
                            }}
                          />
                          Social Science
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <button
                    className="nav-link dropdown-btn nav-btn"
                    data-dropdown="dropdown3"
                    aria-haspopup="true"
                    aria-expanded="false"
                    aria-label="media"
                  >
                    Media
                    <i
                      className="fa-solid fa-angle-down fa-sm"
                      aria-hidden="true"
                    />
                  </button>
                  <div id="dropdown3" className="nav_dropdown">
                    <div className="nav_menu">
                      <div className="nav" style={{ minWidth: "33%" }}>
                        <a className="dropdown-link" href="#adobe-xd">
                          <img
                            src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/a0c91278-d53e-4a05-8219-0b59e2974843.png "
                            alt=""
                            style={{
                              width: 25,
                              height: 25,
                              objectFit: "cover"
                            }}
                          />
                          LIBVERTUA Theses
                        </a>
                      </div>
                      <div className="nav" style={{ minWidth: "33%" }}>
                        <a className="dropdown-link" href="#adobe-xd">
                          <img
                            src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/338df54c-1b32-48c8-b950-2fb20958d0fa.png "
                            alt=""
                            style={{
                              width: 25,
                              height: 25,
                              objectFit: "cover"
                            }}
                          />
                          Video Lectures
                        </a>
                      </div>
                      <div className="nav" style={{ minWidth: "33%" }}>
                        <a className="dropdown-link" href="#adobe-xd">
                          <img
                            src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/de91f597-7cb1-49e0-abd8-9d0b142a1978.png "
                            alt=""
                            style={{
                              width: 25,
                              height: 25,
                              objectFit: "cover"
                            }}
                          />
                          eBooks
                        </a>
                      </div>
                      <div className="nav" style={{ minWidth: "33%" }}>
                        <a className="dropdown-link" href="#adobe-xd">
                          <img
                            src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/315bd757-79d1-49e6-a255-cd013ce11af3.png "
                            alt=""
                            style={{
                              width: 25,
                              height: 25,
                              objectFit: "cover"
                            }}
                          />
                          eJournals
                        </a>
                      </div>
                      <div className="nav" style={{ minWidth: "33%" }}>
                        <a className="dropdown-link" href="#adobe-xd">
                          <img
                            src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/449cc049-2b4f-4c98-bcef-72a940b75b90.png "
                            alt=""
                            style={{
                              width: 25,
                              height: 25,
                              objectFit: "cover"
                            }}
                          />
                          eTheses
                        </a>
                      </div>
                      <div className="nav" style={{ minWidth: "33%" }}>
                        <a className="dropdown-link" href="#adobe-xd">
                          <img
                            src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/4f70a168-9957-41de-8235-7330b92e18b8.png "
                            alt=""
                            style={{
                              width: 25,
                              height: 25,
                              objectFit: "cover"
                            }}
                          />
                          Printing Holding
                        </a>
                      </div>
                      <div className="nav" style={{ minWidth: "33%" }}>
                        <a className="dropdown-link" href="#adobe-xd">
                          <img
                            src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon "
                            alt=""
                            style={{
                              width: 25,
                              height: 25,
                              objectFit: "cover"
                            }}
                          />
                          gh
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <button
                    className="nav-link dropdown-btn nav-btn"
                    data-dropdown="dropdown4"
                    aria-haspopup="true"
                    aria-expanded="false"
                    aria-label="collection"
                  >
                    Collection
                    <i
                      className="fa-solid fa-angle-down fa-sm"
                      aria-hidden="true"
                    />
                  </button>
                  <div id="dropdown4" className="nav_dropdown">
                    <div className="nav_menu">
                      <div className="nav" style={{ minWidth: "33%" }}>
                        <a className="dropdown-link" href="#adobe-xd">
                          <img
                            src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/ac260711-2018-4298-87b3-55e398976822.png "
                            alt=""
                            style={{
                              width: 25,
                              height: 25,
                              objectFit: "cover"
                            }}
                          />
                          Doctoral Theses
                        </a>
                      </div>
                      <div className="nav" style={{ minWidth: "33%" }}>
                        <a className="dropdown-link" href="#adobe-xd">
                          <img
                            src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/f5415117-bc45-4f62-8840-9fe82a01316c.png "
                            alt=""
                            style={{
                              width: 25,
                              height: 25,
                              objectFit: "cover"
                            }}
                          />
                          Electronics Theses
                        </a>
                      </div>
                      <div className="nav" style={{ minWidth: "33%" }}>
                        <a className="dropdown-link" href="#adobe-xd">
                          <img
                            src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/f5415117-bc45-4f62-8840-9fe82a01316c.png "
                            alt=""
                            style={{
                              width: 25,
                              height: 25,
                              objectFit: "cover"
                            }}
                          />
                          Master Theses
                        </a>
                      </div>
                      <div className="nav" style={{ minWidth: "33%" }}>
                        <a className="dropdown-link" href="#adobe-xd">
                          <img
                            src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/e7ca95cf-fa1b-44f9-be44-13610b7c58dd.png "
                            alt=""
                            style={{
                              width: 25,
                              height: 25,
                              objectFit: "cover"
                            }}
                          />
                          MPhil Theses
                        </a>
                      </div>
                      <div className="nav" style={{ minWidth: "33%" }}>
                        <a className="dropdown-link" href="#adobe-xd">
                          <img
                            src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/bc3c1e8e-5e99-4023-8c6d-7c376a85cd2e.avif "
                            alt=""
                            style={{
                              width: 25,
                              height: 25,
                              objectFit: "cover"
                            }}
                          />
                          Libvertua in Print Media
                        </a>
                      </div>
                      <div className="nav" style={{ minWidth: "33%" }}>
                        <a className="dropdown-link" href="#adobe-xd">
                          <img
                            src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon "
                            alt=""
                            style={{
                              width: 25,
                              height: 25,
                              objectFit: "cover"
                            }}
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <button
                    className="nav-link dropdown-btn nav-btn"
                    data-dropdown="dropdown5"
                    aria-haspopup="true"
                    aria-expanded="false"
                    aria-label="collection"
                  >
                    Important Links
                    <i
                      className="fa-solid fa-angle-down fa-sm"
                      aria-hidden="true"
                    />
                  </button>
                  <div id="dropdown5" className="nav_dropdown flex-column">
                    <div className="px-3 pt-3 fw-bold">Important Links</div>
                    <div className="nav_dropdown_dropdown">
                      <div className="nav_menu">
                        <div className="nav" style={{ minWidth: "33%" }}>
                          <a className="dropdown-link" href="link9">
                            <img
                              src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon "
                              alt=""
                              style={{
                                width: 25,
                                height: 25,
                                objectFit: "cover"
                              }}
                            />
                            fdddd
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="a_to_z pb-3">
                      <div className="px-3 pt-3 fw-bold">Extra Pages Link</div>
                      <div className="nav_menu"></div>
                    </div>
                  </div>
                </li>
                <li>
                  <a className="nav-link" href="/">
                    About Library
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="header-action-right d-block d-lg-none">
          <div className="header-action-2">
            <div className="header-action-icon-2">
              {/* Show SignIn button if the user is logged out */}
              <a
                href="http://mriirs.libvirtuua.com:8000/login"
                title="Signin"
                className="btn btn-primary-gradient rounded-pill py-2 px-4 d-lg-block mb-0"
                style={{ textWrap: "nowrap" }}
              >
                <i className="fa-solid fa-user fa-xl" />
              </a>
            </div>
            <div className="header-action-icon-2 d-block d-lg-none">
              <div className="burger-icon burger-icon-white">
                <span className="burger-icon-top" />
                <span className="burger-icon-mid" />
                <span className="burger-icon-bottom" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>
</div>
<MobileNav/>

        </>
    )
}

export default Navbar
