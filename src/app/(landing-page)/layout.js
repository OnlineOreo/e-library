'use client'
import { Suspense } from 'react';
import { Geist, Geist_Mono } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import Providers from "../providers";
import Navbar from "../Component/landing-page/Navbar";
import Footer from "../Component/landing-page/Footer";
import '../../../public/landingPageAsset/css/style2.css';
import '../../../public/landingPageAsset/css/header.css';
import { useSelector } from "react-redux";
import './search.css';
import '../dynamic.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Layout({ children }) {
  const landingPageData = useSelector((state) => state.landingPageDataSlice);
  const configData = landingPageData?.instituteId?.configurations?.[0] || {};
  return (
    <div className={`${geistSans.variable} ${geistMono.variable}`}>
      <Suspense fallback={<div>Loading Navbar...</div>}>
        <Navbar />
      </Suspense>
      {children}
      <Footer bannerData={configData} />
    </div>
  );
}
