import { Geist, Geist_Mono } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import Providers from "./providers";
import './globals.css';
import LandingPageProvider from "./Component/LandingPageProvider";
import { getLandingPageData } from "@/hooks/getLandingPageData";
import { getInstituteData } from "@/hooks/getInstituteData";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default async function RootLayout({ children }) {
  const landingPageData = await getLandingPageData();
  const instituteId = await getInstituteData();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <LandingPageProvider data={landingPageData}>
          <Providers instituteId={instituteId}>
            <div className="dynamic-text-style">
              {children}
            </div>
          </Providers>
        </LandingPageProvider>
      </body>
    </html>
  );
}
