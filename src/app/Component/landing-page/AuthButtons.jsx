'use client'
import React from "react";
import Link from "next/link";
import SignIn from "./SignIn";

const AuthButtons = ({ token, handleLogout, show, setShow }) => {
  return (
    <>
      {token ? (
        <>
          <div>
            <Link href="/dashboard" className="mx-1 hover-underline">
              Dashboard
            </Link>
          </div>
          <div>
            <a onClick={handleLogout} className="mx-1 hover-underline">
              Log Out
            </a>
          </div>
        </>
      ) : (
        <div>
          <div
            onClick={() => setShow(true)}
            className="mx-1 hover-underline"
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