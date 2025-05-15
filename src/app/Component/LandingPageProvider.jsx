'use client';

import { LandingPageContext } from "../context/LandingPageContext";

export default function LandingPageProvider({ children, data }) {
  return (
    <LandingPageContext.Provider value={data}>
      {children}
    </LandingPageContext.Provider>
  );
}
