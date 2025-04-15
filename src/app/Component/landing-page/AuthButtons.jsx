'use client'
import React from "react";
import Link from "next/link";
import SignIn from "./SignIn";

const AuthButtons = ({ token, handleLogout, show, setShow }) => {
  const getUserRole = () => {
      if (typeof window !== "undefined") { 
          const cookieString = document.cookie
              .split("; ")
              .find((row) => row.startsWith("user_role="));
          return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
      }
      return null;
  };

  const userRole = getUserRole();
  
  return (
    <>
      {token ? (
        <>
        { (userRole == "ADMIN" || userRole == "INSTITUTE ADMIN") &&(
          <div className="mx-2">
            <Link href="/dashboard" className="mx-1 hover-underline" title="Dashboard">
              Dashboard
            </Link>
          </div>
        )}
          <div>
            <a onClick={handleLogout} className="mx-1 hover-underline cursor-pointer" style={{ cursor: "pointer" }} title="Log Out" >
              Logout
            </a>
          </div>
        </>
      ) : (
        <div>
          <div
            onClick={() => setShow(true)}
            className="mx-1 hover-underline cursor-pointer"
            style={{ cursor: "pointer" }}
            title="Sign In"
          >
            Sign In
          </div>
        </div>
      )}
      <div className={`modal fade ${show ? "show d-block" : ""}`} tabIndex="-1" style={{ backgroundColor:'#33333378' }} >
        <div className="modal-dialog">
          <div
            className="modal-content"
            style={{
              backgroundColor: "#ffffff00",
              border: "none",
            }}
          >
            <div className="modal-body position-relative">
              <button
                className="btn-close position-absolute fs-5"
                style={{ zIndex: "99", right: "20px" }}
                onClick={() => setShow(false)}
              ></button>
              <SignIn />
            </div>
          </div>
        </div>
      </div>
      {show && (
        <div
          className="modal-backdrop fade show"
          onClick={() => setShow(false)}
        ></div>
      )}
    </>
  );
};

export default AuthButtons;