"use client";
import "bootstrap/dist/css/bootstrap.min.css";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const ImportUser = ({ onSuccess }) => {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const getToken = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));

    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const token = getToken();
    if (!token) {
      router.push("/authentication/sign-in");
      return;
    }

    try {
      setUploading(true);
      setMessage("");
      const hostname = typeof window !== "undefined" ? window.location.hostname : "";
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/bulk-user-creation?sub_domain=${hostname}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: ` ${token}`,
          },
        }
      );

      setFile(null);
      onSuccess?.();
      setError(false);
      setMessage("Upload successful!");
    } catch (error) {
      const backendError =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        error.message;
      setMessage(`Upload failed: ${backendError}`);
      setError(true);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
     
      <div className="mb-3">
     
        <input
          type="file"
          className="form-control"
          onChange={handleFileChange}
        />
      </div>
      <div className="mb-3 d-flex justify-content-center">
      <a
          href="/sample-import/users.xlsx"
          download
          className=" w-70"
        >
          Download Sample File
        </a>
        </div>

      <div className="d-flex justify-content-between gap-2">
        <button
          className="btn btn-primary w-100 "
          onClick={handleUpload}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>

       
      </div>
      
      {message && (
        <div
          className={`mt-3 alert alert-${error ? "danger" : "info"}`}
          role="alert"
        >
          {message}
        </div>
      )}
    </>
  );
};

export default ImportUser;
