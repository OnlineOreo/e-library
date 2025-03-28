import React from "react";

const MobileNav = ()=> {
    return (
        <>
        <div className="mobile-header-active mobile-header-wrapper-style ">
  <div className="mobile-header-wrapper-inner">
    <div className="mobile-header-top">
      <div className="mobile-header-logo">
        <a href="/">
          <img
            src="http://mriirs.libvirtuua.com:8000/storage/landing_page/elib_transparent_logo.png"
            alt="App Icon"
          />
        </a>
      </div>
      <div className="mobile-menu-close close-style-wrap close-style-position-inherit">
        <button className="close-style search-close">
          <i className="icon-top" />
          <i className="icon-bottom" />
        </button>
      </div>
    </div>
    <div className="mobile-header-content-area">
      <div className="mobile-search search-style-3 mobile-header-border">
        <form
          action="http://mriirs.libvirtuua.com:8000/search"
          id="search_form"
          method="GET"
          className="d-flex w-100"
        >
          <input type="text" placeholder="Enter title…" name="search_text" />
          <button type="submit">
            <i className="fa fa-search" />
          </button>
        </form>
      </div>
      <div className="mobile-menu-wrap mobile-header-border">
        <nav>
          <ul className="mobile-menu">
            <li className="menu-item-has-children active">
              <span className="menu-expand">
                <i className="fi-rs-angle-small-down" />
              </span>
              <span className="menu-expand" />
              <a href="/">Home</a>
            </li>
            <li className="menu-item-has-children ">
              <span className="menu-expand">
                <i className="fa fa-angle-down" />
              </span>
              <span className="menu-expand" />
              <a href="javascript:void(0)">eResources</a>
              <ul className="dropdown" style={{ display: "none" }}>
                <li>
                  <div className="nav publisher_nav">
                    <span
                      className="dropdown-link pe-auto one_line_ellipses  "
                      style={{ cursor: "pointer" }}
                      forward="/check-auth"
                    onClick={() => window.open('/check-auth', '_blank')}
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
                    onClick={() => window.open('/check-auth', '_blank')}
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
                    onClick={() => window.open('/check-auth', '_blank')}
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
                    onClick={() => window.open('/check-auth', '_blank')}
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
                    onClick={() => window.open('/check-auth', '_blank')}
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
                    onClick={() => window.open('/check-auth', '_blank')}
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
                    onClick={() => window.open('/check-auth', '_blank')}
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
                    onClick={() => window.open('/check-auth', '_blank')}
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
                    onClick={() => window.open('/check-auth', '_blank')}
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
                    onClick={() => window.open('/check-auth', '_blank')}
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
                    onClick={() => window.open('/check-auth', '_blank')}
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
                    onClick={() => window.open('/check-auth', '_blank')}
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
                    onClick={() => window.open('/check-auth', '_blank')}
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
                    onClick={() => window.open('/check-auth', '_blank')}
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
                    onClick={() => window.open('/check-auth', '_blank')}
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
                    onClick={() => window.open('/check-auth', '_blank')}
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
                    onClick={() => window.open('/check-auth', '_blank')}
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
                    onClick={() => window.open('/check-auth', '_blank')}
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
                    onClick={() => window.open('/check-auth', '_blank')}
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
                    onClick={() => window.open('/check-auth', '_blank')}
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
                    onClick={() => window.open('/check-auth', '_blank')}
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
                    onClick={() => window.open('/check-auth', '_blank')}
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
                    onClick={() => window.open('/check-auth', '_blank')}
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
                    onClick={() => window.open('/check-auth', '_blank')}
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
                    onClick={() => window.open('/check-auth', '_blank')}
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
                    onClick={() => window.open('/check-auth', '_blank')}
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
                    onClick={() => window.open('/check-auth', '_blank')}
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
                    onClick={() => window.open('/check-auth', '_blank')}
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
                    onClick={() => window.open('/check-auth', '_blank')}
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
                    onClick={() => window.open('/check-auth', '_blank')}
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
                    onClick={() => window.open('/check-auth', '_blank')}
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
                    onClick={() => window.open('/check-auth', '_blank')}
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
                    onClick={() => window.open('/check-auth', '_blank')}
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
                    onClick={() => window.open('/check-auth', '_blank')}
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
                    onClick={() => window.open('/check-auth', '_blank')}
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
                    onClick={() => window.open('/check-auth', '_blank')}
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
                    onClick={() => window.open('/check-auth', '_blank')}
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
                    onClick={() => window.open('/check-auth', '_blank')}
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
                    onClick={() => window.open('/check-auth', '_blank')}
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
                    onClick={() => window.open('/check-auth', '_blank')}
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
                    onClick={() => window.open('/check-auth', '_blank')}
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
                    onClick={() => window.open('/check-auth', '_blank')}
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
                    onClick={() => window.open('/check-auth', '_blank')}
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
                    onClick={() => window.open('/check-auth', '_blank')}
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
                    onClick={() => window.open('/check-auth', '_blank')}
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
                    onClick={() => window.open('/check-auth', '_blank')}
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
                    onClick={() => window.open('/check-auth', '_blank')}
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
                    onClick={() => window.open('/check-auth', '_blank')}
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
                    onClick={() => window.open('/check-auth', '_blank')}
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
                    onClick={() => window.open('/check-auth', '_blank')}
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
                    onClick={() => window.open('/check-auth', '_blank')}
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
                    onClick={() => window.open('/check-auth', '_blank')}
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
                    onClick={() => window.open('/check-auth', '_blank')}
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
                </li>
              </ul>
            </li>
            <li className="menu-item-has-children">
              <span className="menu-expand">
                <i className="fa fa-angle-down" />
              </span>
              <span className="menu-expand" />
              <a href="javascript:void(0)">Categories</a>
              <ul className="dropdown" style={{ display: "none" }}>
                <li>
                  <div className="nav" style={{ minWidth: "33%" }}>
                    <a className="dropdown-link" href="#adobe-xd">
                      <img
                        src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/a0d7d295-92fc-48b9-8576-029512be22c9.png "
                        alt=""
                        style={{ width: 25, height: 25, objectFit: "cover" }}
                      />
                      Chemical Engineering
                    </a>
                  </div>
                  <div className="nav" style={{ minWidth: "33%" }}>
                    <a className="dropdown-link" href="#adobe-xd">
                      <img
                        src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/61f88728-c961-4add-8681-99de9001a812.png "
                        alt=""
                        style={{ width: 25, height: 25, objectFit: "cover" }}
                      />
                      Civil Engineering
                    </a>
                  </div>
                  <div className="nav" style={{ minWidth: "33%" }}>
                    <a className="dropdown-link" href="#adobe-xd">
                      <img
                        src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/88f3a9ef-f7b1-4aa8-b41f-b52dfef002ab.jpg "
                        alt=""
                        style={{ width: 25, height: 25, objectFit: "cover" }}
                      />
                      Computer Science &amp; IT
                    </a>
                  </div>
                  <div className="nav" style={{ minWidth: "33%" }}>
                    <a className="dropdown-link" href="#adobe-xd">
                      <img
                        src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/8ed8ee3c-7ec2-478a-aa4c-547e94b82ce3.png "
                        alt=""
                        style={{ width: 25, height: 25, objectFit: "cover" }}
                      />
                      Electrical Engineering
                    </a>
                  </div>
                  <div className="nav" style={{ minWidth: "33%" }}>
                    <a className="dropdown-link" href="#adobe-xd">
                      <img
                        src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/ba00cbf6-22dc-4b13-be89-a5dbc0203d32.png "
                        alt=""
                        style={{ width: 25, height: 25, objectFit: "cover" }}
                      />
                      Electronics &amp; Comminication
                    </a>
                  </div>
                  <div className="nav" style={{ minWidth: "33%" }}>
                    <a className="dropdown-link" href="#adobe-xd">
                      <img
                        src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/e6b7f683-ed78-4a26-8068-aff3c0fcdbfc.png "
                        alt=""
                        style={{ width: 25, height: 25, objectFit: "cover" }}
                      />
                      Finance Management
                    </a>
                  </div>
                  <div className="nav" style={{ minWidth: "33%" }}>
                    <a className="dropdown-link" href="#adobe-xd">
                      <img
                        src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/54882c82-d351-406e-8f7f-b1f8248d5382.png "
                        alt=""
                        style={{ width: 25, height: 25, objectFit: "cover" }}
                      />
                      Human Resource Management
                    </a>
                  </div>
                  <div className="nav" style={{ minWidth: "33%" }}>
                    <a className="dropdown-link" href="#adobe-xd">
                      <img
                        src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/6f6ca1d1-0eed-40ba-aaaa-682f2a7561c9.png "
                        alt=""
                        style={{ width: 25, height: 25, objectFit: "cover" }}
                      />
                      Law
                    </a>
                  </div>
                  <div className="nav" style={{ minWidth: "33%" }}>
                    <a className="dropdown-link" href="#adobe-xd">
                      <img
                        src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/56867f44-6820-48ee-af25-10ef4537041f.png "
                        alt=""
                        style={{ width: 25, height: 25, objectFit: "cover" }}
                      />
                      Management (Genral)
                    </a>
                  </div>
                  <div className="nav" style={{ minWidth: "33%" }}>
                    <a className="dropdown-link" href="#adobe-xd">
                      <img
                        src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/d4deec61-7848-4366-9b5c-7caf2f6c2375.png "
                        alt=""
                        style={{ width: 25, height: 25, objectFit: "cover" }}
                      />
                      Marketing Management
                    </a>
                  </div>
                  <div className="nav" style={{ minWidth: "33%" }}>
                    <a className="dropdown-link" href="#adobe-xd">
                      <img
                        src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/35c3b20a-3a0b-4047-bcbf-63d7510dc2d7.png "
                        alt=""
                        style={{ width: 25, height: 25, objectFit: "cover" }}
                      />
                      Mathematics
                    </a>
                  </div>
                  <div className="nav" style={{ minWidth: "33%" }}>
                    <a className="dropdown-link" href="#adobe-xd">
                      <img
                        src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/a11c7e79-b3a1-4235-9913-8394bd878f0c.png "
                        alt=""
                        style={{ width: 25, height: 25, objectFit: "cover" }}
                      />
                      Machenical Engineering
                    </a>
                  </div>
                  <div className="nav" style={{ minWidth: "33%" }}>
                    <a className="dropdown-link" href="#adobe-xd">
                      <img
                        src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/6b6bdc1e-3931-40dc-b67b-629ee77dfbcf.png "
                        alt=""
                        style={{ width: 25, height: 25, objectFit: "cover" }}
                      />
                      Philosphy, Psycology &amp; Religion
                    </a>
                  </div>
                  <div className="nav" style={{ minWidth: "33%" }}>
                    <a className="dropdown-link" href="#adobe-xd">
                      <img
                        src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/7fe33cb5-1377-4c80-b044-ed6d41f05623.jpg "
                        alt=""
                        style={{ width: 25, height: 25, objectFit: "cover" }}
                      />
                      Physics
                    </a>
                  </div>
                  <div className="nav" style={{ minWidth: "33%" }}>
                    <a className="dropdown-link" href="#adobe-xd">
                      <img
                        src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/c2802765-0f0a-4a8d-aa38-64dd1dccaa50.png "
                        alt=""
                        style={{ width: 25, height: 25, objectFit: "cover" }}
                      />
                      Production &amp; Opration Management
                    </a>
                  </div>
                  <div className="nav" style={{ minWidth: "33%" }}>
                    <a className="dropdown-link" href="#adobe-xd">
                      <img
                        src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/12612978-ac4a-46b9-b8d4-0af803a9ecee.png "
                        alt=""
                        style={{ width: 25, height: 25, objectFit: "cover" }}
                      />
                      Social Science
                    </a>
                  </div>
                </li>
              </ul>
            </li>
            <li className="menu-item-has-children">
              <span className="menu-expand">
                <i className="fa fa-angle-down" />
              </span>
              <span className="menu-expand" />
              <a href="javascript:void(0)">Media</a>
              <ul className="dropdown" style={{ display: "none" }}>
                <li>
                  <div className="nav" style={{ minWidth: "33%" }}>
                    <a className="dropdown-link" href="#adobe-xd">
                      <img
                        src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/a0c91278-d53e-4a05-8219-0b59e2974843.png "
                        alt=""
                        style={{ width: 25, height: 25, objectFit: "cover" }}
                      />
                      LIBVERTUA Theses
                    </a>
                  </div>
                  <div className="nav" style={{ minWidth: "33%" }}>
                    <a className="dropdown-link" href="#adobe-xd">
                      <img
                        src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/338df54c-1b32-48c8-b950-2fb20958d0fa.png "
                        alt=""
                        style={{ width: 25, height: 25, objectFit: "cover" }}
                      />
                      Video Lectures
                    </a>
                  </div>
                  <div className="nav" style={{ minWidth: "33%" }}>
                    <a className="dropdown-link" href="#adobe-xd">
                      <img
                        src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/de91f597-7cb1-49e0-abd8-9d0b142a1978.png "
                        alt=""
                        style={{ width: 25, height: 25, objectFit: "cover" }}
                      />
                      eBooks
                    </a>
                  </div>
                  <div className="nav" style={{ minWidth: "33%" }}>
                    <a className="dropdown-link" href="#adobe-xd">
                      <img
                        src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/315bd757-79d1-49e6-a255-cd013ce11af3.png "
                        alt=""
                        style={{ width: 25, height: 25, objectFit: "cover" }}
                      />
                      eJournals
                    </a>
                  </div>
                  <div className="nav" style={{ minWidth: "33%" }}>
                    <a className="dropdown-link" href="#adobe-xd">
                      <img
                        src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/449cc049-2b4f-4c98-bcef-72a940b75b90.png "
                        alt=""
                        style={{ width: 25, height: 25, objectFit: "cover" }}
                      />
                      eTheses
                    </a>
                  </div>
                  <div className="nav" style={{ minWidth: "33%" }}>
                    <a className="dropdown-link" href="#adobe-xd">
                      <img
                        src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/4f70a168-9957-41de-8235-7330b92e18b8.png "
                        alt=""
                        style={{ width: 25, height: 25, objectFit: "cover" }}
                      />
                      Printing Holding
                    </a>
                  </div>
                  <div className="nav" style={{ minWidth: "33%" }}>
                    <a className="dropdown-link" href="#adobe-xd">
                      <img
                        src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon "
                        alt=""
                        style={{ width: 25, height: 25, objectFit: "cover" }}
                      />
                      gh
                    </a>
                  </div>
                </li>
              </ul>
            </li>
            <li className="menu-item-has-children">
              <span className="menu-expand">
                <i className="fa fa-angle-down" />
              </span>
              <span className="menu-expand" />
              <a href="javascript:void(0)">Collection</a>
              <ul className="dropdown" style={{ display: "none" }}>
                <li>
                  <div className="nav" style={{ minWidth: "33%" }}>
                    <a className="dropdown-link" href="#adobe-xd">
                      <img
                        src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/ac260711-2018-4298-87b3-55e398976822.png "
                        alt=""
                        style={{ width: 25, height: 25, objectFit: "cover" }}
                      />
                      Doctoral Theses
                    </a>
                  </div>
                  <div className="nav" style={{ minWidth: "33%" }}>
                    <a className="dropdown-link" href="#adobe-xd">
                      <img
                        src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/f5415117-bc45-4f62-8840-9fe82a01316c.png "
                        alt=""
                        style={{ width: 25, height: 25, objectFit: "cover" }}
                      />
                      Electronics Theses
                    </a>
                  </div>
                  <div className="nav" style={{ minWidth: "33%" }}>
                    <a className="dropdown-link" href="#adobe-xd">
                      <img
                        src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/f5415117-bc45-4f62-8840-9fe82a01316c.png "
                        alt=""
                        style={{ width: 25, height: 25, objectFit: "cover" }}
                      />
                      Master Theses
                    </a>
                  </div>
                  <div className="nav" style={{ minWidth: "33%" }}>
                    <a className="dropdown-link" href="#adobe-xd">
                      <img
                        src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/e7ca95cf-fa1b-44f9-be44-13610b7c58dd.png "
                        alt=""
                        style={{ width: 25, height: 25, objectFit: "cover" }}
                      />
                      MPhil Theses
                    </a>
                  </div>
                  <div className="nav" style={{ minWidth: "33%" }}>
                    <a className="dropdown-link" href="#adobe-xd">
                      <img
                        src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon/bc3c1e8e-5e99-4023-8c6d-7c376a85cd2e.avif "
                        alt=""
                        style={{ width: 25, height: 25, objectFit: "cover" }}
                      />
                      Libvertua in Print Media
                    </a>
                  </div>
                  <div className="nav" style={{ minWidth: "33%" }}>
                    <a className="dropdown-link" href="#adobe-xd">
                      <img
                        src="http://mriirs.libvirtuua.com:8000/storage/navlink_icon "
                        alt=""
                        style={{ width: 25, height: 25, objectFit: "cover" }}
                      />
                    </a>
                  </div>
                </li>
              </ul>
            </li>
            <li className="menu-item-has-children active">
              <span className="menu-expand">
                <i className="fi-rs-angle-small-down" />
              </span>
              <span className="menu-expand" />
              <a href="/">About Library</a>
            </li>
            <li className="menu-item-has-children">
              <span className="menu-expand">
                <i className="fa fa-angle-down" />
              </span>
              <span className="menu-expand" />
              <a href="javascript:void(0)">Account </a>
              <ul className="dropdown" style={{ display: "none" }}>
                <li>
                  <div className="nav" style={{ minWidth: "33%" }}>
                    <a className="dropdown-link" href="#adobe-xd">
                      <img
                        src="http://mriirs.libvirtuua.com:8000/landingPageAsset/img/profile_icon.svg"
                        alt=""
                        style={{ width: 25, height: 25, objectFit: "cover" }}
                      />
                      Profile
                    </a>
                  </div>
                  <div className="nav" style={{ minWidth: "33%" }}>
                    <a
                      className="dropdown-link"
                      href="http://mriirs.libvirtuua.com:8000/user_saved_articles"
                    >
                      <img
                        src="http://mriirs.libvirtuua.com:8000/landingPageAsset/img/saved_icon.png"
                        alt=""
                        style={{ width: 25, height: 25, objectFit: "cover" }}
                      />
                      Saved Articles
                    </a>
                  </div>
                  <div className="nav" style={{ minWidth: "33%" }}>
                    <a
                      className="dropdown-link"
                      href="http://mriirs.libvirtuua.com:8000/search_history"
                    >
                      <img
                        src="http://mriirs.libvirtuua.com:8000/landingPageAsset/img/search_icon.webp"
                        alt=""
                        style={{ width: 25, height: 25, objectFit: "cover" }}
                      />
                      Search History
                    </a>
                  </div>
                  <div className="nav" style={{ minWidth: "33%" }}>
                    <a
                      className="dropdown-link"
                      href="http://mriirs.libvirtuua.com:8000/news_clipping"
                    >
                      <img
                        src="http://mriirs.libvirtuua.com:8000/landingPageAsset/img/search_icon.webp"
                        alt=""
                        style={{ width: 25, height: 25, objectFit: "cover" }}
                      />
                      News Clipping
                    </a>
                  </div>
                  <div className="nav" style={{ minWidth: "33%" }}>
                    <a
                      className="dropdown-link"
                      href="http://mriirs.libvirtuua.com:8000/user_reading_history"
                    >
                      <img
                        src="http://mriirs.libvirtuua.com:8000/landingPageAsset/img/search_icon.webp"
                        alt=""
                        style={{ width: 25, height: 25, objectFit: "cover" }}
                      />
                      Read History
                    </a>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        {/* mobile menu end */}
      </div>
    </div>
  </div>
</div>

        </>
    )
}

export default MobileNav;
