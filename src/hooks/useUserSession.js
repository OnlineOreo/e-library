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

  useEffect(() => {
    const existing = sessionStorage.getItem("user-session");
    if (!existing) {
      const startTime = new Date().toISOString();
      const id = uuidv4();

      dispatch(startSession({ startTime, sessionId: id }));
      sessionStorage.setItem("user-session", id);

      // Get browser/device info
      const browser = navigator.userAgent;
      const device = /Mobi|Android/i.test(browser) ? "Mobile" : "Desktop";

      // Get IP address via external API
      fetch("https://api.ipify.org?format=json")
        .then((res) => res.json())
        .then((data) => {
          const payload = {
            session_id: id,
            ip_address: data.ip,
            browser,
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
          const endTime = new Date().toISOString();
      
          const payload = {
            ended_at: endTime,
          };
      
          fetch(`http://192.168.1.59:8080/api/user-visit/${sessionId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
            keepalive: true,
          });
      
          dispatch(endSession());
          sessionStorage.removeItem("user-session");
        }
      };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [dispatch, sessionStarted, sessionStartTime, sessionId]);
};
