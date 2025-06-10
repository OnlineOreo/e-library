"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { LuSlidersHorizontal } from "react-icons/lu";
import "../../../../public/landingPageAsset/css/style2.css";
import "../../../../public/landingPageAsset/css/header.css";

const Navbar = ({show, setShow}) => {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  // const [show, setShow] = useState(false)

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const navItems = [
    { type: "link", title: "Home", href: "/" },
    {
      type: "dropdown",
      title: "eResources",
      items: [],
      isPublisher: true,
    },
    {
      type: "dropdown",
      title: "Categories",
      items:  [],
    },
    {
      type: "dropdown",
      title: "Media",
      items:  [],
    },
    {
      type: "dropdown",
      title: "Important Link",
      href: "/",
      items: [
        ...( []),
        ...( []),
      ],
      isImportantLink: true,
    },
    {
      type: "link",
      title: "E-news-clipping",
      href: "/e-news-clipping", // Change this to your actual path
    },
  ];


  const visibleNavItems = navItems.filter((item) =>
    item.type === "dropdown"
      ? Array.isArray(item.items) && item.items.length > 0
      : true
  );

  const handleAdvanceSearch = (e)=> {
      if(!token){
        e.preventDefault();
        setShow(true);
        const searchParam = new URLSearchParams();
        searchParam.set("search", '/advance-search-filter');
        router.push(`/?${searchParam.toString()}`);
      }
  }

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
                      src={`/public/images/avatar/elib_logo.png` }
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
                    onClick={handleAdvanceSearch}
                  >
                    <LuSlidersHorizontal />
                  </Link>
                </div>
                {/* <UserProfile handleLogout={handleLogout} instituteId={instituteId} setShow={setShow}/> */}
                {/* {!token && (
                  <div className="mx-2">
                    <Link
                      href="/student-profile"
                      className="mx-1 hover-underline"
                      title="Profile"
                    >
                      Admin
                    </Link>
                  </div>
                )} */}
              </div>
            </div>
          </div>
          <div className="header-bottom header-bottom-bg-color">
            <div className="container-xxl">
              <div className="header-wrap header-space-between position-relative">
                <div className="logo logo-width-1 d-block d-lg-none">
                  <Link href="/">
                    <img
                      src={"/public/images/avatar/elib_logo.png"}
                      alt="App Icon"
                    />
                  </Link>
                </div>
                <div className="d-flex justify-content-sm-between justify-content-end w-100">
                  <div className="header-nav d-none d-lg-flex">
                    <div className="main-menu main-menu-padding-1 main-menu-lh-2 d-none d-lg-block">
                      <nav className="menu">
                        <ul
                          className="menu-bar menu_bar_a navbar-nav flex-row"
                          style={{ height: 35 }}
                        >
                        </ul>
                      </nav>
                    </div>
                  </div>
                  <div className="header-action-right">
                    <div className="header-action-2">
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
    </>
  );
};

export default Navbar;
