import { useState } from "react";
import Link from "next/link";
import { FaAngleDown } from "react-icons/fa6";
import { useSelector } from "react-redux";

const MobileNav = ({
  menuOpen,
  toggleMenu,
  publisherUrls,
  show,
  setShow,
  setMenuOpen,
  handleLogout,
  handlePublisherClick,
  token,
}) => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const landingPageData = useSelector((state) => state.landingPageDataSlice);
  const bannerData = landingPageData?.landingPageData?.configurations?.[0] || [];

  const mediaMapping = {
    "eBooks": "/search/e-resources?q=resource_types_string%3A(e-book)",
    "Video Resources": "/search/multimedia?q=resource_types_string%3A(Video)",
    "Audio Resources": "/search/multimedia?q=resource_types_string%3A(audio)",
    "Print Collection": "/search/print-collection?q=resource_types_string%3A(book)",
    "eJournals": "/search/e-resources?q=resource_types_string%3A(e-journals)",
  };

  const categoriesMapping = {
    "BioTechnology": "/search/print-collection?q=college_category%3A(biotechnology)",
    "Chemical": "/search/print-collection?q=college_category%3A(chemical)",
    "Civil Engineering": "/search/print-collection?q=college_category%3A(civil)",
    "Computer Engineering": "/search/print-collection?q=college_category%3A(computer)",
    "Electrical Engineering": "/search/print-collection?q=college_category%3A(electrical)",
    "Electronics Engineering": "/search/print-collection?q=college_category%3A(electronics)",
    "Finance Management": "/search/print-collection?q=college_category%3A(finance)",
    "Human Resource Management": "/search/print-collection?q=college_category%3A(human)",
    "Law": "/search/print-collection?q=college_category%3A(law)",
    "Management (General)": "/search/print-collection?q=college_category%3A(management)",
    "Marketing Management": "/search/print-collection?q=college_category%3A(marketing)",
    "Mathematics": "/search/print-collection?q=college_category%3A(mathematics)",
    "Mechanical Engineering": "/search/print-collection?q=college_category%3A(mechanical)",
    "Philosophy, Psychology & Religion": "/search/print-collection?q=college_category%3A(philosophy)",
    "Physics": "/search/print-collection?q=college_category%3A(physics)",
    "Production & Operations Management": "/search/print-collection?q=college_category%3A(production)",
    "Social Science": "/search/print-collection?q=college_category%3A(social)",
  };

  const sections = [
    {
      key: "publishers",
      label: "eResources",
      data: landingPageData?.landingPageData?.publishers || [],
      field: "publisher_name",
    },
    {
      key: "categories",
      label: "Categories",
      data: landingPageData?.landingPageData?.categories || [],
      field: "category_name",
    },
    {
      key: "media",
      label: "Media",
      data: landingPageData?.landingPageData?.medias || [],
      field: "media_name",
    },
    {
      key: "Important link",
      label: "Important Link",
      href: "/",
      data: [
        ...(landingPageData?.landingPageData?.metas || []),
        ...(landingPageData?.landingPageData?.dynamic_page || []),
      ],
      field: "important_link",
    },
    // {
    //   key: "collections",
    //   label: "Collections",
    //   data: landingPageData?.landingPageData?.collections || [],
    //   field: "collection_name",
    // },
  ];

  return (
    <div className={`offcanvas offcanvas-start ${menuOpen ? "show" : ""}`} tabIndex="-1">
      <div className="offcanvas-header text-white" style={{ backgroundColor: bannerData?.color1 }}>
        <div className="logo logo-width-1 d-block d-lg-none">
          <Link href="/">
            <img
              src={
                `${landingPageData?.landingPageData?.configurations?.[0]?.latest_logos.find(
                  (config) => config.is_active
                )?.logo}` || "default"
              }
              alt="App Icon"
            />
          </Link>
        </div>
        <button
          type="button"
          className="btn-close btn-close-dark"
          onClick={toggleMenu}
        ></button>
      </div>

      <div className="offcanvas-body p-3">
        <ul className="list-unstyled">
          <li>
            <Link
              href="/"
              className="nav-link px-3 py-2 d-block text-dark fw-normal text-decoration-underline"
            >
              Home
            </Link>
          </li>

          {sections.map(({ key, label, data, field }) =>
            data.length > 0 ? (
              <li key={key}>
                <button
                  className="btn w-100 text-start px-3 py-2 d-block fw-normal text-dark text-decoration-underline"
                  onClick={() => toggleDropdown(key)}
                  style={{ background: "none", border: "none" }}
                >
                  {label} <FaAngleDown className="ms-1" />
                </button>

                {activeDropdown === key && (
                  <ul className="list-unstyled ms-3">
                    {data.map((item, index) => {
                      const value = item[field];
                      const knownUrl = publisherUrls[value];

                      let href = null;
                      if (!knownUrl) {
                        if (label === "Categories") {
                          href = categoriesMapping[value] || null;
                        } else if (label === "Media") {
                          href = mediaMapping[value] || null;
                        }
                      }

                      return (
                        <li key={index} className="px-3 py-1 text-muted">
                          {
                          // publisherUrls[item[field]] ? (
                          //   label === "eResources" ? (
                          //     <a
                          //       href="#"
                          //       onClick={(e) => {
                          //         e.preventDefault();
                          //         handlePublisherClick(item);
                          //       }}
                          //       className="text-muted"
                          //     >
                          //       {value}
                          //     </a>
                          //   ) : (
                          //     <a
                          //       href={knownUrl}
                          //       target="_blank"
                          //       rel="noopener noreferrer"
                          //       className="text-muted"
                          //     >
                          //       {value}
                          //     </a>
                          //   )
                          // ) : 
                          href ? (
                            <a
                              href="#"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted"
                              onClick={(e) => {
                                e.preventDefault();
                                if (token) {
                                  if (
                                    href === "https://bestbookbuddies.com/index.php/contact" ||
                                    href === "https://bestbookbuddies.com/index.php/aboutus"
                                  ) {
                                    window.open(href, "_blank");
                                  } else {
                                    router.push(href);
                                  }
                                } else {
                                  setShow(true);
                                  setMenuOpen(false)
                                  const encodedRedirect = encodeURIComponent(href);
                                  window.history.replaceState(null, "", `?extra=${encodedRedirect}`);
                                }
                              }}
                            >
                              {value}
                            </a>
                          ) : (
                            <span className="text-muted"
                            onClick={(e) => {
                              e.preventDefault();
                              handlePublisherClick(item);
                            }}
                            >{value}</span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            ) : null
          )}


          <li>
            <Link
              href="/advance-search-filter"
              className="nav-link px-3 py-2 d-block text-dark fw-normal text-decoration-underline"
            >
              Advance Search
            </Link>
          </li>

          {token && (
            <li>
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}
                className="nav-link px-3 py-2 d-block text-dark fw-normal text-decoration-underline"
              >
                Log Out
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MobileNav;
