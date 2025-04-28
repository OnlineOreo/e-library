import { useState } from "react";
import Link from "next/link";
import { FaAngleDown } from "react-icons/fa6";
import { useSelector } from "react-redux";

const MobileNav = ({
  menuOpen,
  toggleMenu,
  publisherUrls,
  setShow,
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
                    {data.map((item, index) => (
                      <li key={index} className="px-3 py-1 text-muted">
                        {publisherUrls[item[field]] ? (
                          field === "publisher_name" ? (
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handlePublisherClick(item);
                              }}
                              className="text-muted"
                            >
                              {item[field]}
                            </a>
                          ) : (
                            <a
                              href={publisherUrls[item[field]]}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted"
                            >
                              {item[field]}
                            </a>
                          )
                        ) : (
                          // item[field]
                          <a
                              href='##'
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted"
                              onClick={(e) => {
                                e.preventDefault();
                                handlePublisherClick(item);
                              }}
                            >
                              {item[field]}
                            </a>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ) : null
          )}

          <li>
            <Link
              href="/advance-search"
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
