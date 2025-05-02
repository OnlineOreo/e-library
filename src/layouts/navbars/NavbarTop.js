import { Menu, LogOut, FileText, Home } from "react-feather";
import Link from "next/link";
import { Nav, Navbar } from "react-bootstrap";
import QuickMenu from "../QuickMenu";
import { useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import "@/i18n"; // cleaner using path alias `@`
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import LanguageSelector from "@/app/Component/landing-page/languageselector";

const NavbarTop = (props) => {
  const { t, i18n } = useTranslation();
  const instituteId = useSelector((state) => state.institute.instituteId);
  const landingPageData2 = useSelector((state) => state.landingPageDataSlice);
  const [showReminder, setShowReminder] = useState(false);
  const endDate = landingPageData2?.landingPageData?.end_date;
  const router = useRouter();
  const getToken = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));

    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  useEffect(() => {
    if (endDate) {
      const end = new Date(endDate);
      const today = new Date();
      const diffInDays = Math.ceil((end - today) / (1000 * 60 * 60 * 24));

      if (diffInDays <= 10 && diffInDays >= 0) {
        setShowReminder(true);
      }
    }
  }, [endDate]);

  const getSession = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("session_id="));

    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  const getUserId = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("user_id="));

    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  const handleLogout = async (institute_id) => {
    const token = getToken();
    const session_id = getSession();
    const userId = getUserId();


    if (session_id) {
      try {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user-session?session_id=${session_id}&institute_id=${institute_id}&user_id=${userId}`,
          {
            ended_at: new Date().toISOString(),
            institute: institute_id, // Make sure you pass the correct institute_id (fixed variable name)
            user: userId,
          },
          {
            headers: {
              Authorization: ` ${token}`,
            },
          }
        );
        Swal.fire({
          icon: "success",
          title: "Logged Out",
          text: "You have been successfully logged out.",
          confirmButtonText: "OK",
        });
      } catch (error) {
        console.error("Failed to update user session:", error);
      }
    }

    // Clear cookies
    document.cookie = `access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    document.cookie = `user_role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    document.cookie = `session_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;

    router.push("/");
  };

  return (
    <>
      <Navbar
        expanded="lg"
        className="navbar-classic navbar navbar-expand-lg custom-navbar px-3"
      >
        <div className="d-flex justify-content-between w-100 align-items-center">
          <div className="d-flex align-items-center">
            <button
              className="custom-nav-btn me-2"
              onClick={() => props.data.SidebarToggleMenu(!props.data.showMenu)}
            >
              <Menu size="18px" />
            </button>

            {showReminder && (
              <div className="reminder-banner text-center text-white py-2 fs-5">
                ⚠️ {t("Your access will expire soon. Please renew before")}{" "}
                {new Date(endDate).toLocaleDateString("en-IN")}
              </div>
            )}
          </div>

          <Nav className="ms-auto d-flex align-items-center gap-2">
            {/* Back to Home */}

            <Link
              href="/"
              target="_blank"
              passHref
              title="Open frontend of student in new window"
            >
              <button className="custom-nav-btn d-flex align-items-center d-lg-block d-none gap-1">
                <Home size="16px" /> {t("Switch to student Dashboard")}
              </button>
            </Link>

            {/* Logs */}
            <Link href="/logs" passHref title="Logs">
              <button className="custom-nav-btn d-flex align-items-center gap-1 d-lg-block d-none">
                <FileText size="16px" /> {t("Logs")}
              </button>
            </Link>

            {/* Logout */}
            <button
              className="custom-nav-btn d-flex align-items-center gap-1 d-lg-block d-none"
              title="Log Out"
              onClick={() => handleLogout(instituteId)}
            >
              <LogOut size="16px" /> {t("Logout")}
            </button>
            <QuickMenu handleLogout={handleLogout} />
          </Nav>
        </div>
      </Navbar>

      <style jsx>{`
        .custom-navbar {
          background-color: #1a233a;
        }

        .custom-nav-btn {
          border: 1px solid #3c4a6b;
          color: #000;
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 14px;
          transition: background-color 0.3s ease;
        }

        .custom-nav-btn:hover {
          background-color: #3c4a6b;
          color: #ffffff;
          cursor: pointer;
        }

        .reminder-banner {
          background: linear-gradient(90deg, #7d6c7c, #637381);
          color: #856404;
          font-weight: 500;
          padding: 8px 16px;
          border: 1px solid #ffeeba;
          border-radius: 4px;
          animation: blinkReminder 2s infinite;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          margin-left: 10px;
          font-size: 14px;
        }
        @keyframes blinkReminder {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.4;
          }
        }
      `}</style>
    </>
  );
};
// background: linear-gradient(90deg, #fff3cd, #ffeeba);
export default NavbarTop;
