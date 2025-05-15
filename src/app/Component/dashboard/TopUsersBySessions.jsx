"use client";
import React, { useEffect, useState } from "react";
import { Card, Table, Spinner, Button } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import "@/i18n"; // cleaner using path alias `@`
import LanguageSelector from "@/app/Component/landing-page/languageselector";

export default function TopUsersBySessions() {
  const { t, i18n } = useTranslation();
  const [userSessions, setUserSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const instituteId = useSelector((state) => state.institute.instituteId);

  const getToken = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));
    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  useEffect(() => {
    const fetchSessions = async (instituteId) => {
      try {
        const token = getToken();
        if (!token) return;

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user-session?institute_id=${instituteId}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        const sessions = response.data || [];

        // Group by user and keep only the latest session
        const userMap = {};
        sessions.forEach((session) => {
          const userId = session.user;
          const updatedAt = new Date(session.updated_at);

          if (
            !userMap[userId] ||
            updatedAt > new Date(userMap[userId].updated_at)
          ) {
            userMap[userId] = session;
          }
        });

        // Convert to array and sort by latest login
        const uniqueLatestSessions = Object.values(userMap).sort(
          (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
        );

        setUserSessions(uniqueLatestSessions);
      } catch (error) {
        console.error("Failed to fetch sessions:", error);
      } finally {
        setLoading(false);
      }
    };

    if (instituteId) {
      fetchSessions(instituteId);
    }
  }, [instituteId]);

  // Pagination logic
  const totalPages = Math.ceil(userSessions.length / recordsPerPage);
  const startIdx = (currentPage - 1) * recordsPerPage;
  const currentRecords = userSessions.slice(
    startIdx,
    startIdx + recordsPerPage
  );

  return (
    <Card className="my-4 shadow">
      <Card.Header className="bg-white py-4 d-flex justify-content-between align-items-center">
        <h4 className="mb-0">{t("Logged In Users (Latest Sessions)")}</h4>
        <div>
          <Button
            variant="outline-secondary"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            {t("Prev")}
          </Button>{" "}
          <Button
            variant="outline-secondary"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            {t("Next")}
          </Button>
        </div>
      </Card.Header>

      {loading ? (
        <div className="text-center p-4">
          <Spinner />
        </div>
      ) : (
        <Table responsive className="text-nowrap mb-0">
          <thead className="table-light">
            <tr>
              <th>{t("User ID")}</th>
              <th>{t("Browser")}</th>
              <th>{t("Device type")}</th>
              <th>{t("Ip Address")}</th>
              <th>{t("Last Login Time")}</th>
              <th>{t("Last Logout Time")}</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((user, index) => (
              <tr key={user.session_id}>
                <td className="text-break">{user.username}</td>
                <td>{user.browser_name}</td>
                <td>{user.device_type}</td>
                <td>{user.ip_address}</td>
                <td>
                  {new Date(user.updated_at).toLocaleString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </td>
                <td>
                  {user.ended_at
                    ? new Date(user.ended_at).toLocaleString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })
                    : "--"}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Card>
  );
}
