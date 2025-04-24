"use client";
import { useEffect, useState } from "react";
import "./student.css";
import axios from "axios";

export default function StudentProfile() {
  const [profileData, setProfileData] = useState([])
  const getToken = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));

    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  useEffect(() => {
    const token = getToken();
    const fetchUserProfile = async (token) => {
      const userResponse = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/profile`, {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }),
      ]);
      setProfileData(userResponse.data)
    };

    if(token){
      fetchUserProfile(token)
    }
  }, []);

  return (
    <>
      {/* Student Profile */}
      <div className="student-profile" style={{ paddingBlock: "50px" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="card shadow-sm">
                <div className="card-header bg-transparent text-center">
                  <img
                    className="profile_img"
                    src="https://placeimg.com/640/480/arch/any"
                    alt=""
                  />
                  <h3>Ishmam Ahasan Samin</h3>
                </div>
                <div className="card-body">
                  <p className="mb-0">
                    <strong className="pr-1">Student ID:</strong>321000001
                  </p>
                  <p className="mb-0">
                    <strong className="pr-1">Class:</strong>4
                  </p>
                  <p className="mb-0">
                    <strong className="pr-1">Section:</strong>A
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card shadow-sm">
                <div className="card-header bg-transparent border-0">
                  <h3 className="mb-0">
                    <i className="far fa-clone pr-1" />
                    General Information
                  </h3>
                </div>
                <div className="card-body pt-0">
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <th width="30%">Roll</th>
                        <td width="2%">:</td>
                        <td>125</td>
                      </tr>
                      <tr>
                        <th width="30%">Academic Year </th>
                        <td width="2%">:</td>
                        <td>2020</td>
                      </tr>
                      <tr>
                        <th width="30%">Gender</th>
                        <td width="2%">:</td>
                        <td>Male</td>
                      </tr>
                      <tr>
                        <th width="30%">Religion</th>
                        <td width="2%">:</td>
                        <td>Group</td>
                      </tr>
                      <tr>
                        <th width="30%">blood</th>
                        <td width="2%">:</td>
                        <td>B+</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
