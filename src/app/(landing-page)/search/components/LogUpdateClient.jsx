"use client";

import { useEffect } from "react";
import axios from "axios";
import { useSelector } from 'react-redux';

const LogUpdateClient = ({
  path,
  status_code,
  initialResults,
  error_trace = "",
}) => {
  const instituteId = useSelector((state) => state.institute.instituteId);
  // Safely get access_token from cookies
  const getToken = () => {
    if (typeof document === "undefined") return null;

    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));

    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  // Safely get user_id from cookies
  const getUserID = () => {
    if (typeof document === "undefined") return null;

    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("user_id="));

    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  useEffect(() => {
    if (instituteId) {
      const token = getToken();
      const userId = getUserID();

      if (!token || !userId || !instituteId) {
        console.warn("Log skipped due to missing token, user ID, or institute ID.");
        return;
      }
      console.log("run this");


      const formdata = new FormData();
      formdata.append("method", "get");
      formdata.append("path", path);
      formdata.append("status_code", status_code);
      formdata.append("user", userId);
      formdata.append("institute", instituteId);
      formdata.append("request_body", "");
      formdata.append("response_body", JSON.stringify(initialResults));
      formdata.append("error_trace", error_trace);

      axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/log`, formdata, {
        headers: { Authorization: token },
      })
        .catch((error) => {
          console.error("Log API Error:", error);
        });
    }
  }, [path, status_code, initialResults, error_trace, instituteId]);

  return null; // no UI rendering
};

export default LogUpdateClient;
