import { Geist, Geist_Mono } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import Providers from "./providers";
<<<<<<< HEAD
import Layout from "./Component/landing-page/Layout";
=======
>>>>>>> feature/landing-page

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
         <Layout>
          {children}
          </Layout>
        </Providers>
      </body>
    </html>
  );
}
