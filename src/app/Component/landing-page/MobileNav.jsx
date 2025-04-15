import { useState, useEffect } from "react";
import Link from "next/link";
import { FaAngleDown } from "react-icons/fa6";
import { useSelector } from "react-redux";

const MobileNav = ({ menuOpen, toggleMenu }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const getToken = () => {
      const cookieString = document.cookie
        .split("; ")
        .find((row) => row.startsWith("access_token="));
      return cookieString
        ? decodeURIComponent(cookieString.split("=")[1])
        : null;
    };
    setToken(getToken());
  }, []);

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const landingPageData = useSelector((state) => state.landingPageDataSlice);

  const bannerData = landingPageData?.instituteId?.configurations?.[0] || [];

  const publisherUrls = {
    "EBSCO Academic Collection": `https://research-ebsco-com.mriirs.libvirtuua.com:8811/login.aspx?authtype=ip,uid&custid=ns193200&groupid=main&profile=ehost&defaultdb=bsh&token=${token}`,
    Manupatra: `https://www-manupatrafast-in.mriirs.libvirtuua.com:8811/LoginSwitch/ipRedirect.aspx?token=${token}`,
  };

  const sections = [
    {
      key: "publishers",
      label: "eResources",
      data: landingPageData?.instituteId?.publishers || [],
      field: "publisher_name",
    },
    {
      key: "categories",
      label: "Categories",
      data: landingPageData?.instituteId?.categories || [],
      field: "category_name",
    },
    {
      key: "media",
      label: "Media",
      data: landingPageData?.instituteId?.medias || [],
      field: "media_name",
    },
    {
      key: "collections",
      label: "Collections",
      data: landingPageData?.instituteId?.collections || [],
      field: "collection_name",
    },
  ];

  return (
    <div
      className={`offcanvas offcanvas-start ${menuOpen ? "show" : ""}`}
      tabIndex="-1"
    >
      <div
        className="offcanvas-header text-white"
        style={{ backgroundColor: bannerData?.color1 }}
      >
        <h5 className="offcanvas-title text-dark">LibVirtuUa</h5>
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
          <li>
            {/* <button 
              className="btn w-100 text-start px-3 py-2 d-block fw-normal text-dark text-decoration-underline" 
              onClick={() => toggleDropdown("resources")}
              style={{ background: "none", border: "none" }}
            >
              eResources <FaAngleDown className="ms-1" />
            </button> */}
            {/* {activeDropdown === "resources" && (
              <ul className="list-unstyled ms-3">
                <li>
                  <Link href="/check-auth" className="nav-link px-3 py-1 d-block text-muted">
                    Academic Journals
                  </Link>
                </li>
              </ul>
            )} */}
          </li>

          {sections.map(
            ({ key, label, data, field }) =>
              data.length > 0 && (
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
                            <a
                              href={publisherUrls[item[field]]}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted"
                            >
                              {item[field]}
                            </a>
                          ) : (
                            item[field]
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
          )}
          <li>
            <Link
              href="/advance-search"
              className="nav-link px-3 py-2 d-block text-dark fw-normal text-decoration-underline"
            >
              Advance Search
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileNav;
