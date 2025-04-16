"use client";
import "bootstrap/dist/css/bootstrap.min.css";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const ImportProgram = ({onSuccess}) => {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

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
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/bulk-program-creation`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: ` ${token}`,
          },
        }
      );

      setMessage(`${response.data.message || "Success"}`);
      setFile(null)
      onSuccess?.();
    } catch (error) {
      const backendError =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        error.message;
      setMessage(`Upload failed: ${backendError}`);
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

      <button
        className="btn btn-primary w-100"
        onClick={handleUpload}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {message && (
        <div className="alert alert-info mt-3" role="alert">
          {message}
        </div>
      )}
    </>
  );
};

export default ImportProgram;
