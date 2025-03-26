"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  const pathname = usePathname();

  const allowedRoutes = ["/", "/about"];

  const showLayout = allowedRoutes.includes(pathname);

  return (
    <>
      {showLayout && <Navbar />}
      {children}
      {showLayout && <Footer />}
    </>
  );
}
