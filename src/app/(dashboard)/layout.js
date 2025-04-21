"use client";
import { useState } from "react";

import NavbarTop from "@/layouts/navbars/NavbarTop";
import NavbarVertical from "@/layouts/navbars/NavbarVertical";

export default function DashboardLayout({ children }) {
  const [showMenu, setShowMenu] = useState(true);

  // Simplified toggle function
  const ToggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <div id="db-wrapper" className={`${showMenu ? "" : "toggled"}`}>
      <div className="navbar-vertical navbar">
        <NavbarVertical
          showMenu={showMenu}
          onClick={ToggleMenu}
        />
      </div>
      <div id="page-content">
        {children}
      </div>
    </div>
  );
}
