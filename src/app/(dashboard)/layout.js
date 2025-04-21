"use client";
import { useState } from "react";

import NavbarTop from "@/layouts/navbars/NavbarTop";
import NavbarVertical from "@/layouts/navbars/NavbarVertical";
import "../styles/theme.scss";

export default function DashboardLayout({ children }) {
  const [showMenu, setShowMenu] = useState(true);

  // Corrected toggle function
  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <div id="db-wrapper" className={`${showMenu ? "" : "toggled"}`}>
      <div className="navbar-vertical navbar">
        <NavbarVertical showMenu={showMenu} onClick={toggleMenu} />
      </div>
      <div id="page-content">
        <div id="dashboard-template">
          <div className="header">
            <NavbarTop
              data={{
                showMenu,
                SidebarToggleMenu: toggleMenu, // corrected here
              }}
            />
          </div>
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
