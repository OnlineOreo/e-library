"use client";
import { Suspense } from 'react'
import './dynamic.css'

import Navbar from "./Component/landing-page/Navbar";

export default function Home() {

  return (
    <>
      <Suspense fallback={<div>Loading Navbar...</div>}>
        <Navbar />
      </Suspense>
      <h4>Hello</h4>
    </>
  );
}