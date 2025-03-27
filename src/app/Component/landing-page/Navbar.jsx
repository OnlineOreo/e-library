'use client'
import React from "react";
import MobileNav from "./MobileNav";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { IoChevronDown } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SignIn from "./SignIn";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const landingPageData = useSelector((state) => state.landingPageDataSlice);
  const publishersArray = landingPageData?.instituteId?.publishers;
  const [token, setToken] = useState(null);

  const handleFilterSelect = () => {};

  const getToken = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));
    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  const handleLogout = () => {
    setToken(null);
    document.cookie = `access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  };

  useEffect(() => {
    const token = getToken();
    setToken(token);
  }, [token]);

  const handlePublisherClick = (publisher) => {
    const token = getToken();
    if (!token) {
      router.push("/authentication/sign-in");
      return;
    }

    let url = "";

    if (publisher.publisher_name === "EBSCO Academic Collection") {
      url =
        "https://research-ebsco-com.mriirs.libvirtuua.com:8833/login.aspx?authtype=ip,uid&custid=ns193200&groupid=main&profile=ehost&defaultdb=bsh";
    } else if (publisher.publisher_name === "Manupatra") {
      url =
        "https://www-manupatrafast-in.mriirs.libvirtuua.com:8833/LoginSwitch/ipRedirect.aspx";
    }

    if (url) {
      window.open(url + `&token=${token}`, "_blank");
    }
  };

  return (
    <>
      <div className="container-fluid bg-white p-0">
        <header className="header-area  header-style-4 header-height-2">
          <div className="header-middle sticky-bar header-middle-ptb-1 d-none d-lg-block">
            <div className="container">
              <div className="header-wrap">
                <div className="logo logo-width-1">
                  <Link href="/">
                    <img
                      src="http://demo.libvirtuua.com:8000/storage/landing_page/elib_transparent_logo.png"
                      alt="App Icon"
                    />
                  </Link>
                </div>
                <div className="header-right">
                  <h6 className="nav-heading pt-1" style={{ color: "#6f6f6f" }}>
                    Welcome To BestBook Buddies eLibrary
                  </h6>
                </div>
                <div className="header-action-right" style={{ width: 600 }}>
                  <div className="search-style-2">
                    <form
                      action="http://demo.libvirtuua.com:8000/search"
                      id="search_form"
                      method="GET"
                      className="d-flex w-100"
                    >
                      <select
                        id="filterType"
                        name="filter_type"
                        className="select-active"
                        value={"datacite_titles"}
                        onChange={handleFilterSelect}
                      >
                        <option value="datacite_titles">Title</option>
                        <option value="datacite_creators">Author</option>
                        <option value="datacite_subject">Category</option>
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
                        id="searchInput"
                        placeholder="Search with/without any keywords"
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
              </div>
            </div>
          </div>
          <div className="header-bottom header-bottom-bg-color ">
            <div className="container-xxl">
              <div className="header-wrap header-space-between position-relative">
                <div className="logo logo-width-1 d-block d-lg-none">
                  <Link href="/">
                    <img
                      src="http://demo.libvirtuua.com:8000/storage/landing_page/elib_transparent_logo.png"
                      alt="App Icon"
                    />
                  </Link>
                </div>
                <div className="d-flex justify-content-between w-100">
                  <div className="header-nav d-none d-lg-flex">
                    <div className="main-menu main-menu-padding-1 main-menu-lh-2 d-none d-lg-block">
                      <nav className="menu">
                        <ul
                          className="menu-bar menu_bar_a navbar-nav"
                          style={{ height: 35 }}
                        >
                          <li>
                            <Link className="nav-link nav-btn" href="/">
                              Home
                            </Link>
                          </li>
                          <li>
                            <button className="nav-link dropdown-btn nav-btn">
                              eResources
                              <IoChevronDown />
                            </button>
                            <div
                              id="dropdown1"
                              className="nav_dropdown flex-column"
                            >
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
                                  {landingPageData?.instituteId?.publishers.map(
                                    (publisher) => {
                                      return (
                                          <div
                                            key={publisher.publisher_id}
                                            className="nav publisher_nav"
                                          >
                                            <span
                                              className="dropdown-link pe-auto one_line_ellipses"
                                              style={{ cursor: "pointer" }}
                                              onClick={() =>
                                                handlePublisherClick(publisher)
                                              }
                                            >
                                              <img
                                                src={publisher.image}
                                                alt={publisher.image}
                                                style={{
                                                  width: 25,
                                                  height: 25,
                                                  objectFit: "contain",
                                                  objectPosition: "center",
                                                }}
                                              />
                                              {publisher.publisher_name}
                                            </span>
                                          </div>
                                      );
                                    }
                                  )}
                                </div>
                              </div>
                              <div className="a_to_z px-3 pb-3 mt-2">
                                <div className="head mb-2">Search A To Z</div>
                                <div className="d-flex flex-wrap gap-2">
                                  <Link href="http://demo.libvirtuua.com:8000/aToZ_Filter?filter_type=datacite_titles&first_text=A">
                                    <span>A</span>
                                  </Link>
                                  <Link href="http://demo.libvirtuua.com:8000/aToZ_Filter?filter_type=datacite_titles&first_text=B">
                                    <span>B</span>
                                  </Link>
                                  <Link href="http://demo.libvirtuua.com:8000/aToZ_Filter?filter_type=datacite_titles&first_text=C">
                                    <span>C</span>
                                  </Link>
                                  <Link href="http://demo.libvirtuua.com:8000/aToZ_Filter?filter_type=datacite_titles&first_text=D">
                                    <span>D</span>
                                  </Link>
                                  <Link href="http://demo.libvirtuua.com:8000/aToZ_Filter?filter_type=datacite_titles&first_text=E">
                                    <span>E</span>
                                  </Link>
                                  <Link href="http://demo.libvirtuua.com:8000/aToZ_Filter?filter_type=datacite_titles&first_text=F">
                                    <span>F</span>
                                  </Link>
                                  <Link href="http://demo.libvirtuua.com:8000/aToZ_Filter?filter_type=datacite_titles&first_text=G">
                                    <span>G</span>
                                  </Link>
                                  <Link href="http://demo.libvirtuua.com:8000/aToZ_Filter?filter_type=datacite_titles&first_text=H">
                                    <span>H</span>
                                  </Link>
                                  <Link href="http://demo.libvirtuua.com:8000/aToZ_Filter?filter_type=datacite_titles&first_text=I">
                                    <span>I</span>
                                  </Link>
                                  <Link href="http://demo.libvirtuua.com:8000/aToZ_Filter?filter_type=datacite_titles&first_text=J">
                                    <span>J</span>
                                  </Link>
                                  <Link href="http://demo.libvirtuua.com:8000/aToZ_Filter?filter_type=datacite_titles&first_text=K">
                                    <span>K</span>
                                  </Link>
                                  <Link href="http://demo.libvirtuua.com:8000/aToZ_Filter?filter_type=datacite_titles&first_text=L">
                                    <span>L</span>
                                  </Link>
                                  <Link href="http://demo.libvirtuua.com:8000/aToZ_Filter?filter_type=datacite_titles&first_text=M">
                                    <span>M</span>
                                  </Link>
                                  <Link href="http://demo.libvirtuua.com:8000/aToZ_Filter?filter_type=datacite_titles&first_text=N">
                                    <span>N</span>
                                  </Link>
                                  <Link href="http://demo.libvirtuua.com:8000/aToZ_Filter?filter_type=datacite_titles&first_text=O">
                                    <span>O</span>
                                  </Link>
                                  <Link href="http://demo.libvirtuua.com:8000/aToZ_Filter?filter_type=datacite_titles&first_text=P">
                                    <span>P</span>
                                  </Link>
                                  <Link href="http://demo.libvirtuua.com:8000/aToZ_Filter?filter_type=datacite_titles&first_text=Q">
                                    <span>Q</span>
                                  </Link>
                                  <Link href="http://demo.libvirtuua.com:8000/aToZ_Filter?filter_type=datacite_titles&first_text=R">
                                    <span>R</span>
                                  </Link>
                                  <Link href="http://demo.libvirtuua.com:8000/aToZ_Filter?filter_type=datacite_titles&first_text=S">
                                    <span>S</span>
                                  </Link>
                                  <Link href="http://demo.libvirtuua.com:8000/aToZ_Filter?filter_type=datacite_titles&first_text=T">
                                    <span>T</span>
                                  </Link>
                                  <Link href="http://demo.libvirtuua.com:8000/aToZ_Filter?filter_type=datacite_titles&first_text=U">
                                    <span>U</span>
                                  </Link>
                                  <Link href="http://demo.libvirtuua.com:8000/aToZ_Filter?filter_type=datacite_titles&first_text=V">
                                    <span>V</span>
                                  </Link>
                                  <Link href="http://demo.libvirtuua.com:8000/aToZ_Filter?filter_type=datacite_titles&first_text=W">
                                    <span>W</span>
                                  </Link>
                                  <Link href="http://demo.libvirtuua.com:8000/aToZ_Filter?filter_type=datacite_titles&first_text=X">
                                    <span>X</span>
                                  </Link>
                                  <Link href="http://demo.libvirtuua.com:8000/aToZ_Filter?filter_type=datacite_titles&first_text=Y">
                                    <span>Y</span>
                                  </Link>
                                  <Link href="http://demo.libvirtuua.com:8000/aToZ_Filter?filter_type=datacite_titles&first_text=Z">
                                    <span>Z</span>
                                  </Link>
                                  <Link
                                    href="http://demo.libvirtuua.com:8000/aToZ_Filter?filter_type=datacite_titles&first_text="
                                    className="see_all_btn mt-1"
                                  >
                                    See All
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li>
                            <button className="nav-link dropdown-btn nav-btn">
                              Categories
                              <IoChevronDown />
                            </button>
                            <div
                              id="dropdown2"
                              className="nav_dropdown"
                              style={{ paddingBottom: 20 }}
                            >
                              <div
                                className="nav_menu"
                                style={{ height: "50vh", overflowY: "scroll" }}
                              >
                                {landingPageData?.instituteId?.categories.map(
                                  (categories) => {
                                    return (
                                        <div
                                          key={
                                            categories.configuration_category_id
                                          }
                                          className="nav"
                                          style={{ minWidth: "33%" }}
                                        >
                                          <a
                                            className="dropdown-link"
                                            href="javascript:void(0)"
                                          >
                                            <img
                                              src={categories.image}
                                              alt={categories.image}
                                              style={{
                                                width: 25,
                                                height: 25,
                                                objectFit: "cover",
                                              }}
                                            />
                                            {categories.category_name}
                                          </a>
                                        </div>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          </li>
                          <li>
                            <button className="nav-link dropdown-btn nav-btn">
                              Media
                              <IoChevronDown />
                            </button>
                            <div id="dropdown3" className="nav_dropdown">
                              <div className="nav_menu">
                                {landingPageData?.instituteId?.medias.map(
                                  (media) => {
                                    return (
                                        <div
                                          key={media.configuration_media_id}
                                          className="nav"
                                          style={{ minWidth: "33%" }}
                                        >
                                          <a
                                            className="dropdown-link"
                                            href="javascript:void(0)"
                                          >
                                            <img
                                              src={media.image}
                                              alt=""
                                              style={{
                                                width: 25,
                                                height: 25,
                                                objectFit: "cover",
                                              }}
                                            />
                                            {media.media_name}
                                          </a>
                                        </div>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                  <div className="header-action-right">
                    <div className="header-action-2">
                      {token ? (
                        <>
                          <div>
                            <Link
                              href="/dashboard"
                              className="mx-1 hover-underline"
                            >
                              Dashboard
                            </Link>
                          </div>
                          <div>
                            <button
                              onClick={handleLogout}
                              className="mx-1 hover-underline"
                            >
                              Log Out
                            </button>
                          </div>
                        </>
                      ) : (
                        <div>
                          <button
                            onClick={() => setShow(true)}
                            className="mx-1 hover-underline"
                          >
                            Sign In
                          </button>
                        </div>
                      )}
                      {/* modal start */}
                      <div
                        className={`modal fade ${show ? "show d-block" : ""}`}
                        tabIndex="-1"
                      >
                        <div className="modal-dialog">
                          <div
                            className="modal-content"
                            style={{
                              backgroundColor: "#ffffff00",
                              border: "none",
                            }}
                          >
                            <div className="modal-body position-relative">
                              <button
                                className="btn-close position-absolute fs-5"
                                style={{ zIndex: "99", right: "20px" }}
                                onClick={() => setShow(false)}
                              ></button>
                              <SignIn />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Modal Backdrop */}
                      {show && (
                        <div
                          className="modal-backdrop fade show"
                          onClick={() => setShow(false)}
                        ></div>
                      )}
                      {/* modal end */}

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
          </div>
        </header>
      </div>
      <MobileNav />
    </>
  );
};

export default Navbar;
