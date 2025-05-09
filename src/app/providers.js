// app/providers.jsx
"use client";

import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import store from "@/redux/store";
import { fetchInstituteId } from "@/redux/slices/instituteSlice";
import { landingPageData } from "@/redux/slices/landingPageData";

function InitData({ instituteId }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch Institute ID if not passed in props
    if (!instituteId) {
      dispatch(fetchInstituteId());
    }
    // Dispatch landing page data
    dispatch(landingPageData());
  }, [instituteId, dispatch]);

  return null;
}

export default function Providers({ children, instituteId }) {
  return (
    <Provider store={store}>
      <InitData instituteId={instituteId} />
      {children}
    </Provider>
  );
}
