import { Geist, Geist_Mono } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import Providers from "../providers";
import Navbar from "../Component/landing-page/Navbar";
import Footer from "../Component/landing-page/Footer";
import '../../../public/landingPageAsset/css/style2.css';
import '../../../public/landingPageAsset/css/header.css';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "LibVirtuUa app",
  description: "Discovery search",
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <Navbar/>
          {children}
          <Footer/>
      </body>
    </html> 
  );
}
