import { Suspense } from 'react';
import { Geist, Geist_Mono } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../Component/landing-page/Navbar";
import '../../../public/landingPageAsset/css/style2.css';
import '../../../public/landingPageAsset/css/header.css';
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

export default async function Layout({ children }) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} apply_color`}>
      <Suspense fallback={<div>Loading Navbar...</div>}>
        <Navbar />
      </Suspense>
      {children}
      {/* <Footer /> */}
    </div>
  );
}
