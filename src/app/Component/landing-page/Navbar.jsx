"use client";
import React, { useEffect, useState, Suspense } from "react";
import MobileNav from "./MobileNav";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import SearchBar from "./SearchBar";
import DropdownMenu from "./DropdownMenu";
import AuthButtons from "./AuthButtons";
import Swal from "sweetalert2";
import { LuSlidersHorizontal } from "react-icons/lu";
import "../../../../public/landingPageAsset/css/style2.css";
import "../../../../public/landingPageAsset/css/header.css";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const landingPageData = useSelector((state) => state.landingPageDataSlice);
  const instituteId = useSelector((state) => state.institute.instituteId);
  const [token, setToken] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const getBaseDomain = () => {
    const hostname = typeof window !== "undefined" ? window.location.hostname : "";
    return hostname;
  };

  const getToken = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));
    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  const getSession = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("session_id="));
    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  const getUserId = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("user_id="));
    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  const handleLogout = async (institute_id) => {
    try {
      const token = getToken();
      const session_id = getSession();
      const userId = getUserId();
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user-session?session_id=${session_id}&institute_id=${institute_id}&user_id=${userId}`,
        {
          ended_at: new Date().toISOString(),
          institute: instituteId,
          user: userId,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Failed to update user session:", error);
      router.push("/");
    }
    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "user_role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "session_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    router.push("/");
  };

  const baseDomain = getBaseDomain();

  const publisherUrls = {
    "EBSCO Academic Collection": `https://research-ebsco-com.${baseDomain}/login.aspx?authtype=ip,uid&custid=ns193200&groupid=main&profile=ehost&defaultdb=bsh&token=${token}`,
    Manupatra: `https://www-manupatrafast-in.${baseDomain}/LoginSwitch/ipRedirect.aspx?token=${token}`,
  };
  // const publisherUrls = {
  //   "EBSCO Academic Collection": `https://research-ebsco-com.mriirs.libvirtuua.com:8811/login.aspx?authtype=ip,uid&custid=ns193200&groupid=main&profile=ehost&defaultdb=bsh&token=${token}`,
  //   Manupatra: `https://www-manupatrafast-in.mriirs.libvirtuua.com:8811/LoginSwitch/ipRedirect.aspx?token=${token}`,
  // };


  const handlePublisherClick = (publisher) => {
    const token = getToken();

    if (!publisherUrls[publisher.publisher_name]) {
      Swal.fire({
        title: "Warning!",
        text: "Publisher Url not found!",
        icon: "warning",
        confirmButtonText: "OK",
      });
    }

    if (publisherUrls[publisher.publisher_name]) {
      if (!token) {
        const searchParams = new URLSearchParams();
        searchParams.set("redirect", publisher.publisher_name);
        router.push(`/?${searchParams.toString()}`);
        setShow(true);
        return;
      }
      window.open(publisherUrls[publisher.publisher_name], "_blank");
    }
  };

  useEffect(() => {
    const token = getToken();
    setToken(token);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { type: "link", title: "Home", href: "/" },
    {
      type: "dropdown",
      title: "eResources",
      items: landingPageData?.landingPageData?.publishers || [],
      isPublisher: true,
    },
    {
      type: "dropdown",
      title: "Categories",
      items: landingPageData?.landingPageData?.categories || [],
    },
    {
      type: "dropdown",
      title: "Media",
      items: landingPageData?.landingPageData?.medias || [],
    },
    {
      type: "dropdown",
      title: "Collection",
      items: landingPageData?.landingPageData?.collections || [],
    },
    {
      type: "dropdown",
      title: "Important Link",
      href: "/",
      items: landingPageData?.landingPageData?.metas || [],
    },
    {
      type: "dropdown",
      title: "Account",
      items: [
        {
          image: "/images/avatar/saved_icon.png",
          name: "Saved Article",
          href: "/saved-catalog/print-collection",
        },
        {
          image: "/images/avatar/search_history_icon.png",
          name: "Search History",
          href: "#",
        },
        {
          image: "/images/avatar/read_history.png",
          name: "Read History",
          href: "#",
        },
      ],
    },
  ];
  

  const visibleNavItems = navItems.filter((item) =>
    item.type === "dropdown" ? Array.isArray(item.items) && item.items.length > 0 : true
  );

  return (
    <>
      <div className="container-fluid mt-2 bg-white p-0">
        <header
          className="header-area header-style-4 header-height-2"
          style={{
            position: isSticky ? "fixed" : "relative",
            top: 0,
            width: "100%",
            zIndex: 1000,
            backgroundColor: "white",
            boxShadow: isSticky ? "0px 2px 10px rgba(0, 0, 0, 0.1)" : "none",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <div className="header-middle sticky-top header-middle-ptb-1 d-none d-lg-block">
            <div className="container">
              <div className="header-wrap">
                <div className="logo logo-width-1">
                  <Link href="/">
                    <img
                      src={
                        landingPageData?.landingPageData?.configurations?.[0]?.logo || "default"
                      }
                      alt="App Icon"
                    />
                  </Link>
                </div>
                <div className="header-action-right" style={{ width: 600 }}>
                  <Suspense fallback={<div>Loading search...</div>}>
                    <SearchBar show={show} setShow={setShow} />
                  </Suspense>
                  <Link
                    href="/advance-search-filter"
                    title="Advance search"
                    className="fs-2 ps-5 text-dark"
                  >
                    <LuSlidersHorizontal />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="header-bottom header-bottom-bg-color">
            <div className="container-xxl">
              <div className="header-wrap header-space-between position-relative">
                <div className="logo logo-width-1 d-block d-lg-none">
                  <Link href="/">
                    <img
                      src={
                        landingPageData?.instituteId?.configurations?.[0]?.logo || "default"
                      }
                      alt="App Icon"
                    />
                  </Link>
                </div>
                <div className="d-flex justify-content-between w-100">
                  <div className="header-nav d-none d-lg-flex">
                    <div className="main-menu main-menu-padding-1 main-menu-lh-2 d-none d-lg-block">
                      <nav className="menu">
                        <ul
                          className="menu-bar menu_bar_a navbar-nav flex-row"
                          style={{ height: 35 }}
                        >
                          {visibleNavItems.map((item, index) => (
                            <li key={index}>
                              {item.type === "link" ? (
                                <Link className="nav-link nav-btn" href={item.href}>
                                  {item.title}
                                </Link>
                              ) : (
                                <DropdownMenu
                                  title={item.title}
                                  items={item.items}
                                  isPublisher={item.isPublisher}
                                  handlePublisherClick={handlePublisherClick}
                                />
                              )}
                            </li>
                          ))}
                        </ul>
                      </nav>
                    </div>
                  </div>
                  <div className="header-action-right">
                    <div className="header-action-2">
                      <AuthButtons
                        token={token}
                        setToken={setToken}
                        handleLogout={handleLogout}
                        show={show}
                        setShow={setShow}
                        publisherUrls={publisherUrls}
                      />
                      <div className="header-action-icon-2 d-block d-lg-none">
                        <div
                          className="burger-icon burger-icon-white ms-2"
                          onClick={toggleMenu}
                        >
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
      <MobileNav menuOpen={menuOpen} toggleMenu={toggleMenu} />
    </>
  );
};

export default Navbar;
