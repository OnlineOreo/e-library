"use client";

import { Provider } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import store from "../redux/store";
import { fetchInstituteId } from "../redux/slices/instituteSlice";

function FetchInstitute() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInstituteId()); // Fetch institute ID on startup
  }, [dispatch]);

  return null; // This component just triggers the API call
}

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <FetchInstitute /> {/* API call happens here */}
      {children}
    </Provider>
  );
}
