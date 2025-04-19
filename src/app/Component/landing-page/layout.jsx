"use client";
import { useState } from "react";
import "../styles/theme.scss";

import NavbarTop from "@/layouts/navbars/NavbarTop";
import NavbarVertical from "@/layouts/navbars/NavbarVertical";

import "../../../../public/landingPageAsset/css/style2.css";
import "../../../../public/landingPageAsset/css/header.css";

export default function DashboardLayout({ children }) {

  return (
      <div>
        {children}
      </div>
  );
}
