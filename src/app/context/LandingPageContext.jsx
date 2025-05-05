"use client";

import { createContext, useContext } from "react";

export const LandingPageContext = createContext(null);

export function useLandingPageData() {
  return useContext(LandingPageContext);
}