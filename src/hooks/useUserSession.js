"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startSession, endSession } from "../redux/slices/userVisitSlice";
import { v4 as uuidv4 } from "uuid";

export const useUserSession = () => {
  const dispatch = useDispatch();
  const { sessionId } = useSelector((state) => state.userVisit);

  // const getToken = () => {
  //   const cookieString = document.cookie
  //     .split("; ")
  //     .find((row) => row.startsWith("access_token="));
  //   return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  // };

  function getBrowserName() {
    const ua = navigator.userAgent;
    if (ua.includes("Firefox/")) return "Firefox";
    if (ua.includes("Edg/")) return "Edge";
    if (ua.includes("OPR/") || ua.includes("Opera")) return "Opera";
    if (ua.includes("Chrome/") && !ua.includes("Edg/") && !ua.includes("OPR/"))
      return "Chrome";
    if (ua.includes("Safari/") && !ua.includes("Chrome")) return "Safari";
    return "Unknown";
  }

  useEffect(() => {
    // const token = getToken();

    // if(token) return;

    let id = sessionId || sessionStorage.getItem("user-session");

    if (!id) {
      const newId = uuidv4();
      const startTime = new Date().toISOString();
      dispatch(startSession({ sessionId: newId, startTime }));
      sessionStorage.setItem("user-session", newId);

      const device = /Mobi|Android/i.test(navigator.userAgent)
        ? "Mobile"
        : "Desktop";
      fetch("https://api.ipify.org?format=json")
        .then((res) => res.json())
        .then((data) => {
          const payload = {
            session_id: newId,
            ip_address: data.ip,
            browser_name: getBrowserName(),
            device_type: device,
            created_at: startTime,
          };

          fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user-visit`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
        });
    }

    const handleBeforeUnload = () => {
      const activeSessionId = sessionStorage.getItem("user-session");
      if (activeSessionId) {
        const endTime = new Date().toISOString();
        const payload = JSON.stringify({ ended_at: endTime });

        sessionStorage.setItem("above-api", "some value");
        const result = navigator.sendBeacon(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user-visit?session_id=${activeSessionId}&is_patch=true`,
          new Blob([payload], { type: "application/json" })
        );
        dispatch(endSession());
        sessionStorage.removeItem("user-session");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [dispatch, sessionId]);
};
