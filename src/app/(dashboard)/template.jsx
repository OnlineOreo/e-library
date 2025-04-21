"use client";
import NavbarTop from "@/layouts/navbars/NavbarTop";
import { useState } from "react";
import "../styles/theme.scss";

export default function Template({ children }) {
  const [showMenu, setShowMenu] = useState(true);

  const toggleMenu = () => setShowMenu((prev) => !prev);

  return (    
      <main>{children}</main>
  );
}
