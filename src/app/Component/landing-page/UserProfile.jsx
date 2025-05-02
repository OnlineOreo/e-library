import React, { useState } from "react";
import { FaUser, FaLock, FaSignOutAlt, FaUserTag, FaHistory } from "react-icons/fa";
import { MdYoutubeSearchedFor } from "react-icons/md";
import { HiDocumentSearch } from "react-icons/hi";
import { AiFillSave } from "react-icons/ai";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import "@/i18n";

const UserProfile = ({ handleLogout, instituteId, setShow }) => {
    const { t } = useTranslation();
    const [showDropdown2, setShowDropdown2] = useState(false);

    const getCookieValue = (key) => {
        if (typeof window !== "undefined") {
            const cookieString = document.cookie
                .split("; ")
                .find((row) => row.startsWith(`${key}=`));
            return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
        }
        return null;
    };

    const userRole = getCookieValue("user_role");
    const userName = getCookieValue("user_name");
    const userImage = getCookieValue("user_image");

    const toggleDropdown = () => {
        setShowDropdown2((prev) => !prev);
    };

    const closeDropdown = () => setShowDropdown2(false);

    return (
        <>
            {userRole && (
                <div
                    className="d-inline-block"
                    onMouseEnter={() => setShowDropdown2(true)}
                    onMouseLeave={closeDropdown}
                >
                    <div
                        className="mx-1 hover-underline cursor-pointer"
                        title="Profile"
                        onClick={toggleDropdown}
                    >
                        <div className="avatar avatar-md">
                            <img
                                src={userImage || "/images/avatar/avatar-1.jpg"}
                                alt="Image"
                                width={50}
                                height={50}
                                className="rounded-circle"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "/images/avatar/avatar-1.jpg";
                                }}
                            />
                        </div>
                    </div>

                    {showDropdown2 && (
                        <div
                            className="dropdown-menu shadow end-5 show"
                            style={{ minWidth: "200px" }}
                            onClick={(e) => e.stopPropagation()} // prevent toggle when clicking inside
                        >
                            {(userName || userRole) && (
                                <>
                                    <div className="dropdown-header fw-semibold text-dark">
                                        {userName && userName !== "null" && userName}
                                        <div className="d-flex align-items-center text-muted small mt-1">
                                            <FaUserTag className="me-1" /> {userRole}
                                        </div>
                                    </div>
                                    <div className="dropdown-divider"></div>
                                </>
                            )}

                            <Link
                                className="dropdown-item d-flex align-items-center gap-2"
                                href={(userRole === "ADMIN" || userRole === "INSTITUTE ADMIN") ? "/profile/view" : "/student-profile"}
                            >
                                <FaUser /> Profile
                            </Link>
                            <Link
                                className="dropdown-item d-flex align-items-center gap-2"
                                href="/authentication/change-password"
                            >
                                <FaLock /> Change Password
                            </Link>
                            <Link
                                className="dropdown-item d-flex align-items-center gap-2"
                                href="/read-history/print-collection"
                            >
                                <HiDocumentSearch /> Read History
                            </Link>
                            {/* <Link
                                className="dropdown-item d-flex align-items-center gap-2"
                                href="/read-history"
                            >
                                <FaHistory /> Search History
                            </Link> */}
                            <Link
                                className="dropdown-item d-flex align-items-center gap-2"
                                href="/saved-catalog/print-collection"
                            >
                                <AiFillSave /> Saved Catalog
                            </Link>
                            <Link
                                href="#"
                                className="dropdown-item d-flex align-items-center gap-2"
                                onClick={() => handleLogout(instituteId, setShow)}
                            >
                                <FaSignOutAlt />
                                <span className="mx-1 hover-underline cursor-pointer d-lg-block d-none">
                                    {t("Logout")}
                                </span>
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default UserProfile;
