// app/providers.jsx
"use client";

import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import store from "@/redux/store";
import { setInstituteId } from "@/redux/slices/instituteSlice";

function InitInstitute({ instituteId }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (instituteId) {
      dispatch(setInstituteId(instituteId));
    }
  }, [instituteId, dispatch]);

  return null;
}

export default function Providers({ children, instituteId }) {
  return (
    <Provider store={store}>
      <InitInstitute instituteId={instituteId} />
      {children}
    </Provider>
  );
}
