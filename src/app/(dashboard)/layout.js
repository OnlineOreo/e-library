"use client";
import { useState } from "react";
import "../styles/theme.scss";

import NavbarTop from "@/layouts/navbars/NavbarTop";
import NavbarVertical from "@/layouts/navbars/NavbarVertical";

export default function DashboardLayout({ children }) {
  const [showMenu, setShowMenu] = useState(true);
  const ToggleMenu = () => {
    return setShowMenu(!showMenu);
  };

  return (
    <div id="db-wrapper" className={`${showMenu ? "" : "toggled"}`}>
      <div className="navbar-vertical navbar">
        <NavbarVertical
          showMenu={showMenu}
          onClick={(value) => setShowMenu(value)}
        />
      </div>
      <div id="page-content">
        {children}
      </div>
    </div>
  );
}
