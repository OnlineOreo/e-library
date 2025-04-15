import { Geist, Geist_Mono } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "LibVirtuUa app",
    statusBarStyle: "default",
  },
  themeColor: "#ffffff",
  // title: "LibVirtuUa app",
  description: "Discovery search",
  icons: {
    icon: "/favicon.ico", 
    apple: "/apple-touch-icon.png", 
    shortcut: "/favicon-32x32.png", 
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html> 
  );
}
