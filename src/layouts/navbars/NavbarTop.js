import { Menu, LogOut, FileText, Home } from "react-feather";
import Link from "next/link";
import { Nav, Navbar } from "react-bootstrap";
import QuickMenu from "../QuickMenu";
import { useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useTranslation } from 'react-i18next';
import '@/i18n'; // cleaner using path alias `@`
import Swal from "sweetalert2";
import LanguageSelector from "@/app/Component/landing-page/languageselector";


const NavbarTop = (props) => {
  const { t, i18n } = useTranslation();
  const instituteId = useSelector((state) => state.institute.instituteId);
  const router = useRouter();
  const getToken = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));

    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

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
  
    // Utility to get Indian date-time
    const getIndianDateTime = () => {
      const indianTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
      return new Date(indianTime).toISOString();
    };
  
    if (session_id) {
      try {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user-session?session_id=${session_id}&institute_id=${institute_id}&user_id=${userId}`,
          {
            ended_at: getIndianDateTime(), // Using IST for ended_at
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
          icon: 'success',
          title: 'Logged Out',
          text: 'You have been successfully logged out.',
          confirmButtonText: 'OK',
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
          </div>

          <Nav className="ms-auto d-flex align-items-center gap-2">
            {/* Back to Home */}
            <Link
              href="/"
              target="_blank"
              passHref
              title="Open frontend of student in new window"
            >
              <button className="custom-nav-btn d-flex align-items-center gap-1">
                <Home size="16px" /> {t('Switch to student Dashboard')}
              </button>
            </Link>

            {/* Logs */}
            <Link href="/logs" passHref title="Logs">
              <button className="custom-nav-btn d-flex align-items-center gap-1">
                <FileText size="16px" /> {t('Logs')}
              </button>
            </Link>

            {/* Logout */}
            <button
              className="custom-nav-btn d-flex align-items-center gap-1"
              title="Log Out"
              onClick={() => handleLogout(instituteId)}
            >
              <LogOut size="16px" /> {t('Logout')}
            </button>
            <QuickMenu />
          </Nav>
        </div>
      </Navbar>

      <style jsx>{`
        .custom-navbar {
          background-color: #1a233a;
        }

        .custom-nav-btn {
          border: 1px solid #2a3555;
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
      `}</style>
    </>
  );
};

export default NavbarTop;
