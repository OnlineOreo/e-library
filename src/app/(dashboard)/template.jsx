"use client";

import NavbarTop from "@/layouts/navbars/NavbarTop";
import { useState } from "react";
import "../styles/theme.scss";

export default function Template({ children }) {
  const [showMenu, setShowMenu] = useState(true);

  const toggleMenu = () => setShowMenu((prev) => !prev);

  return (
    <div id="dashboard-template">
      {/* Top Navbar */}
      <div className="header">
        <NavbarTop
          data={{
            showMenu,
            SidebarToggleMenu: toggleMenu,
          }}
        />
      </div>

      {/* Page Content */}
      <main className="p-4">{children}</main>
    </div>
  );
}
