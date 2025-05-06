"use client";
import { useEffect, useState } from "react";
import "./student.css";
import axios from "axios";

export default function StudentProfile() {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const getToken = () => {
      const cookieString = document.cookie
        .split("; ")
        .find((row) => row.startsWith("access_token="));

      return cookieString
        ? decodeURIComponent(cookieString.split("=")[1])
        : null;
    };

    const fetchUserProfile = async () => {
      const token = getToken();
      if (!token) return;

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/profile`,
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        );
        setProfileData(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <>
      <div className="student-profile" style={{ paddingBlock: "100px" }}>
        <div className="container">
          <h3 className="mb-0 text-center mb-3">General Information</h3>
          <div className="row">
            {/* You can conditionally show data if it's loaded */}
            {profileData ? (
              <>
                <div className="col-lg-4">
                  <div className="card shadow-sm">
                    <div className="card-header bg-transparent text-center">
                      <img
                        className="profile_img"
                        src="/images/avatar/avatar-1.jpg"
                        alt=""
                      />
                      <h3>{profileData.name || "Student Name"}</h3>
                    </div>
                    {/* <div className="card-body">
                      <p className="mb-0">
                        <strong className="pr-1">Phone Number:</strong>
                        {profileData.phone_number || "N/A"}
                      </p>
                      <p className="mb-0">
                        <strong className="pr-1">Email:</strong>
                        {profileData.email || "N/A"}
                      </p>
                      <p className="mb-0">
                        <strong className="pr-1">Address:</strong>
                        {profileData.address || "N/A"}
                      </p> 
                    </div> */}
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="card shadow-sm">
                    <div className="card-header bg-transparent border-0"></div>
                    <div className="card-body pt-0">
                      <table className="table table-bordered">
                        <tbody>
                          <tr>
                            <th width="30%">Phone Number</th>
                            <td width="2%">:</td>
                            <td> {profileData.phone_number || "N/A"}</td>
                          </tr>
                          <tr>
                            <th width="30%">Email</th>
                            <td width="2%">:</td>
                            <td>{profileData.email || "N/A"}</td>
                          </tr>
                          <tr>
                            <th width="30%">Gender</th>
                            <td width="2%">:</td>
                            <td>{profileData.gender || "N/A"}</td>
                          </tr>
                          <tr>
                            <th width="30%">Designation </th>
                            <td width="2%">:</td>
                            <td>{profileData.designation || "N/A"}</td>
                          </tr>
                          <tr>
                            <th width="30%">Address</th>
                            <td width="2%">:</td>
                            <td>{profileData.address || "N/A"}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="col-12 text-center">
                <p>Loading profile...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
