// src/hooks/useUserSession.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startSession, endSession } from "../redux/slices/userVisitSlice";
import { v4 as uuidv4 } from "uuid";

export const useUserSession = () => {
  const dispatch = useDispatch();
  const { sessionStarted, sessionStartTime, sessionId } = useSelector(
    (state) => state.userVisit
  );

  function getBrowserName() {
    const userAgent = navigator.userAgent;

    if (userAgent.includes("Firefox/")) return "Firefox";
    if (userAgent.includes("Edg/")) return "Edge";
    if (userAgent.includes("OPR/") || userAgent.includes("Opera")) return "Opera";
    if (userAgent.includes("Chrome/") && !userAgent.includes("Edg/") && !userAgent.includes("OPR/"))
      return "Chrome";
    if (userAgent.includes("Safari/") && !userAgent.includes("Chrome")) return "Safari";

    return "Unknown";
  }

  useEffect(() => {
    const existing = sessionStorage.getItem("user-session");
    if (!existing) {
      const startTime = new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour12: false,
      });
      const id = uuidv4();

      dispatch(startSession({ startTime, sessionId: id }));
      sessionStorage.setItem("user-session", id);

      const device = /Mobi|Android/i.test(navigator.userAgent) ? "Mobile" : "Desktop";

      fetch("https://api.ipify.org?format=json")
        .then((res) => res.json())
        .then((data) => {
          const payload = {
            session_id: id,
            ip_address: data.ip,
            browser_name: getBrowserName(),
            device_type: device,
            visit_start_time: startTime,
          };

          fetch("http://192.168.1.59:8080/api/user-visit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
        });
    }

    const handleBeforeUnload = () => {
      if (sessionStarted && sessionStartTime) {
        const endTime = new Date().toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour12: false,
        });

        const data = JSON.stringify({ ended_at: endTime });
        const blob = new Blob([data], { type: "application/json" });

        navigator.sendBeacon(
          `http://192.168.1.59:8080/api/user-visit/${sessionId}`,
          blob
        );

        dispatch(endSession());
        sessionStorage.removeItem("user-session");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [dispatch, sessionStarted, sessionStartTime, sessionId]);
};
