"use client";

import { Provider } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import store from "../redux/store";
import { fetchInstituteId } from "../redux/slices/instituteSlice";
import { landingPageData } from "../redux/slices/landingPageData";

function FetchInstitute() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInstituteId()); // Fetch institute ID on startup
    dispatch(landingPageData()); // landing page data
  }, [dispatch]);

  return null; 
}

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <FetchInstitute /> 
      {children}
    </Provider>
  );
}
