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
import { useTranslation } from "react-i18next";
import "@/i18n"; // cleaner using path alias `@`

const Navbar = ({ show, setShow }) => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const landingPageData = useSelector((state) => state.landingPageDataSlice);
  const instituteId = useSelector((state) => state.institute.instituteId);
  const [token, setToken] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const getBaseDomain = () => {
    const hostname =
      typeof window !== "undefined" ? window.location.hostname : "";
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

  const handleLogout = async (institute_id, setShow) => {
    const token = getToken();
    const session_id = getSession();
    const userId = getUserId();
    if (session_id) {
      try {
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
    }
    document.cookie =
      "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "user_role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "session_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setShow = false;
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
        text: "Publisher not available!",
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

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const navItems = [
    { type: "link", title: t("Home"), href: "/" },
    // {
    //   type: "dropdown",
    //   title: t("eResources"),
    //   items: landingPageData?.landingPageData?.publishers || [],
    //   isPublisher: true,
    // },
    // {
    //   type: "dropdown",
    //   title: t("Categories"),
    //   items: [
    //     {
    //       configuration_category_id: "a15ed045-a3ba-46ea-b480-088061f2a34a",
    //       category_name: "Biotechnology",
    //       image: `${baseUrl}/api/media/configuration_category/image_a15ed045-a3ba-46ea-b480-088061f2a34a.png`,
    //       description: "",
    //       created_at: "2025-04-24T06:14:49.752734Z",
    //       updated_at: "2025-04-24T06:14:49.752767Z",
    //     },
    //     {
    //       configuration_category_id: "e86eda5b-7e10-49de-8628-0b25458292be",
    //       category_name: "Chemical Engineering",
    //       image: `${baseUrl}/api/media/configuration_category/image_e86eda5b-7e10-49de-8628-0b25458292be.png`,
    //       description: "",
    //       created_at: "2025-04-24T06:14:50.891779Z",
    //       updated_at: "2025-04-24T06:14:50.891818Z",
    //     },
    //     {
    //       configuration_category_id: "5116e43b-cebd-44df-a7ee-0bcf8f2c364c",
    //       category_name: "Civil Engineering",
    //       image: `${baseUrl}/api/media/configuration_category/image_5116e43b-cebd-44df-a7ee-0bcf8f2c364c.png`,
    //       description: "",
    //       created_at: "2025-04-24T06:14:50.968288Z",
    //       updated_at: "2025-04-24T06:14:50.968319Z",
    //     },
    //     {
    //       configuration_category_id: "095e10a7-4e72-4447-90ff-1dd64626f011",
    //       category_name: "Computer Sciences",
    //       image: `${baseUrl}/api/media/configuration_category/image_095e10a7-4e72-4447-90ff-1dd64626f011.png`,
    //       description: "",
    //       created_at: "2025-04-24T06:14:50.700319Z",
    //       updated_at: "2025-04-24T06:14:50.700377Z",
    //     },
    //     {
    //       configuration_category_id: "b15177a0-155b-448e-9af7-22bad7137337",
    //       category_name: "Electrical Engineering",
    //       image: `${baseUrl}/api/media/configuration_category/image_b15177a0-155b-448e-9af7-22bad7137337.png`,
    //       description: "",
    //       created_at: "2025-04-24T06:14:50.601327Z",
    //       updated_at: "2025-04-24T06:14:50.601357Z",
    //     },
    //     {
    //       configuration_category_id: "7efe319f-2b25-4c2b-8b1b-267780ac9ba7",
    //       category_name: "Electronics & Communicatiion",
    //       image: `${baseUrl}/api/media/configuration_category/image_7efe319f-2b25-4c2b-8b1b-267780ac9ba7.png`,
    //       description: "",
    //       created_at: "2025-04-24T06:14:50.290363Z",
    //       updated_at: "2025-04-24T06:14:50.290395Z",
    //     },
    //     {
    //       configuration_category_id: "429ea20e-059e-43c9-8ccc-2e231dc6fb5f",
    //       category_name: "Finance Management",
    //       image: `${baseUrl}/api/media/configuration_category/image_429ea20e-059e-43c9-8ccc-2e231dc6fb5f.png`,
    //       description: "",
    //       created_at: "2025-04-24T06:14:50.272801Z",
    //       updated_at: "2025-04-24T06:14:50.272832Z",
    //     },
    //     {
    //       configuration_category_id: "e175d31d-acef-43a3-bf35-2e830c500d02",
    //       category_name: "Human Resource Management",
    //       image: `${baseUrl}/api/media/configuration_category/image_e175d31d-acef-43a3-bf35-2e830c500d02.png`,
    //       description: "",
    //       created_at: "2025-04-24T06:14:51.184513Z",
    //       updated_at: "2025-04-24T06:14:51.184543Z",
    //     },
    //     {
    //       configuration_category_id: "ef7ff645-588f-4d29-9c59-2eb6ccd7c18c",
    //       category_name: "Law",
    //       image: `${baseUrl}/api/media/configuration_category/image_ef7ff645-588f-4d29-9c59-2eb6ccd7c18c.png`,
    //       description: "",
    //       created_at: "2025-04-24T06:14:51.101574Z",
    //       updated_at: "2025-04-24T06:14:51.101607Z",
    //     },
    //     {
    //       configuration_category_id: "9e2dca3c-224a-4e9b-aad6-314ca15d7e35",
    //       category_name: "Management (General)",
    //       image: `${baseUrl}/api/media/configuration_category/image_9e2dca3c-224a-4e9b-aad6-314ca15d7e35.png`,
    //       description: "",
    //       created_at: "2025-04-24T06:14:51.168081Z",
    //       updated_at: "2025-04-24T06:14:51.168112Z",
    //     },
    //     {
    //       configuration_category_id: "2808ec19-33e0-4739-ac4b-39f43e704051",
    //       category_name: "Marketing Management",
    //       image: `${baseUrl}/api/media/configuration_category/image_2808ec19-33e0-4739-ac4b-39f43e704051.png`,
    //       description: "",
    //       created_at: "2025-04-24T06:14:50.151202Z",
    //       updated_at: "2025-04-24T06:14:50.151237Z",
    //     },
    //     {
    //       configuration_category_id: "8819c97f-49b3-484f-bdba-3b5ba8e1578d",
    //       category_name: "Mathematics",
    //       image: `${baseUrl}/api/media/configuration_category/image_8819c97f-49b3-484f-bdba-3b5ba8e1578d.png`,
    //       description: "",
    //       created_at: "2025-04-24T06:14:50.108208Z",
    //       updated_at: "2025-04-24T06:14:50.108271Z",
    //     },
    //     {
    //       configuration_category_id: "6e97a822-87e3-4602-86b6-43474bbbe7ff",
    //       category_name: "Mechanical Engineering ",
    //       image: `${baseUrl}/api/media/configuration_category/image_6e97a822-87e3-4602-86b6-43474bbbe7ff.png`,
    //       description: "",
    //       created_at: "2025-04-24T06:14:50.951155Z",
    //       updated_at: "2025-04-24T06:14:50.951185Z",
    //     },
    //     {
    //       configuration_category_id: "5807826e-4acb-4ba7-aa9f-4e7a02ad670e",
    //       category_name: "Philosophy, Religion",
    //       image: `${baseUrl}/api/media/configuration_category/image_5807826e-4acb-4ba7-aa9f-4e7a02ad670e.png`,
    //       description: "",
    //       created_at: "2025-04-24T06:14:50.508140Z",
    //       updated_at: "2025-04-24T06:14:50.508184Z",
    //     },
    //     {
    //       configuration_category_id: "7ecab279-f00e-4c79-acf3-5d3d634608d7",
    //       category_name: "Physics",
    //       image: `${baseUrl}/api/media/configuration_category/image_7ecab279-f00e-4c79-acf3-5d3d634608d7.png`,
    //       description: "",
    //       created_at: "2025-04-24T06:14:50.258146Z",
    //       updated_at: "2025-04-24T06:14:50.258176Z",
    //     },
    //     {
    //       configuration_category_id: "7596fc4a-23fe-4d30-8fa3-63cb46ea4332",
    //       category_name: "Production & Operations Management",
    //       image: `${baseUrl}/api/media/configuration_category/image_7596fc4a-23fe-4d30-8fa3-63cb46ea4332.png`,
    //       description: "",
    //       created_at: "2025-04-24T06:14:50.543058Z",
    //       updated_at: "2025-04-24T06:14:50.543087Z",
    //     },
    //     {
    //       configuration_category_id: "2dcbc16e-fdc9-4cc2-9461-64fac094ac3d",
    //       category_name: "Social Science",
    //       image: `${baseUrl}/api/media/configuration_category/image_2dcbc16e-fdc9-4cc2-9461-64fac094ac3d.png`,
    //       description: "",
    //       created_at: "2025-04-24T06:14:50.075448Z",
    //       updated_at: "2025-04-24T06:14:50.075478Z",
    //     },
    //   ],
    // },
    {
      type: "dropdown",
      title: t("Media"),
      items: landingPageData?.landingPageData?.medias || [],
    },
    // {
    //   type: "dropdown",
    //   title: t("Collection"),
    //   items: landingPageData?.landingPageData?.collections || [],
    // },
    {
      type: "dropdown",
      title: t('Important Link'),
      href: "/",
      items: [
        ...(landingPageData?.landingPageData?.metas || []),
        ...(landingPageData?.landingPageData?.dynamic_page || []),
      ],
    },
    {
      type: "dropdown",
      title: t("Account"),
      items: [
        {
          image: "/images/avatar/saved_icon.png",
          name: t("Saved Article"),
          href: "/saved-catalog/print-collection",
        },
        {
          image: "/images/avatar/search_history_icon.png",
          name: t("Search History"),
          href: "#",
        },
        {
          image: "/images/avatar/read_history.png",
          name: t("Read History"),
          href: "#",
        },
      ],
    },
  ];

  const visibleNavItems = navItems.filter((item) =>
    item.type === "dropdown"
      ? Array.isArray(item.items) && item.items.length > 0
      : true
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
                        `${
                          landingPageData?.landingPageData?.configurations?.[0]?.latest_logos.find(
                            (config) => config.is_active
                          )?.logo
                        }` || "default"
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
                        landingPageData?.landingPageData?.configurations?.[0]
                          ?.logo || "default"
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
                                <Link
                                  className="nav-link nav-btn"
                                  href={item.href}
                                >
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
                        handleLogout={() => handleLogout(instituteId, setShow)}
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
      <MobileNav
        menuOpen={menuOpen}
        publisherUrls={publisherUrls}
        toggleMenu={toggleMenu}
      />
    </>
  );
};

export default Navbar;
