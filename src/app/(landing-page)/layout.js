import { Suspense } from 'react';
import MainNavbar from "../Component/landing-page/Navbar";
import './search.css';
import '../dynamic.css';
import Footer from '../Component/landing-page/Footer';

export default async function Layout({ children }) {
  return (
    <div>
      <Suspense fallback={<div>Loading Navbar...</div>}>
        <MainNavbar />
      </Suspense>
      {children}
      <Footer />
    </div>
  );
}
