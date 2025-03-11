'use client'
// import node module libraries
import { Card, Row, Col, Container } from 'react-bootstrap';
import Link from 'next/link';
import Image from "next/image";
import { useEffect, useState } from 'react';
import axios from 'axios';


const Profile = () => {
    const [authUser, setAuthUser] = useState({
        name: "",
        role:"",
        email:"",
        id:"",
        image:"",
        phone_number:"",
        date_joined:"",
        address:"",
        designation:"",
    });

    const getToken = () => localStorage.getItem("access_token");

    useEffect(() => {
        loadAuthUser()
    }, []); // Runs whenever authUser changes
    
    const loadAuthUser = async () => {
        const token = getToken();
        if (!token) {
            errorToaster("Authentication required!");
            return;
        }
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/profile`, {
                headers: { Authorization: `${token}` },
            });
            const authdata = response.data;
            setAuthUser(authdata);
            console.log(authdata);
            (response.data);
        } catch (error) {
            console.error("Axios Error:", error);
            if (error.response) {
                console.error("Response Error:", error.response.data);
            } else if (error.request) {
                console.error("Request Error: No response received");
            } else {
                console.error("Setup Error:", error.message);
            }
        }
    };



  return (
    <Container fluid className="p-6">
      {/* Page Heading */}
      {/* <PageHeading heading="Overview"/> */}

      {/* Profile Header  */}
      <Row className="align-items-center">
      <Col xl={12} lg={12} md={12} xs={12}>
        {/* Bg */}
        <div className="pt-20 rounded-top" 
            style={{ backgroundImage: 'url(/images/background/profile-cover.jpg)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
            >
        </div>
        <div className="bg-white rounded-bottom smooth-shadow-sm ">
          <div className="d-flex align-items-center justify-content-between pt-4 pb-6 px-4">
            <div className="d-flex align-items-center">
              <div className="avatar-xxl avatar-indicators avatar-online me-2 position-relative d-flex justify-content-end align-items-end mt-n10">
                <Image src={authUser?.image && authUser.image !== "" ? authUser.image : "/images/avatar/avatar-1.jpg"} alt="Verified" className="avatar-xxl rounded-circle border border-4 border-white-color-40" width={200} height={200} />
                <Link href="#!" className="position-absolute top-0 right-0 me-2" data-bs-toggle="tooltip" data-placement="top" title="" data-original-title="Verified">
                  <Image src="/images/svg/checked-mark.svg" alt="" height="30" width="30" />
                </Link>
              </div>
              {/* text */}
              <div className="lh-1">
                <h2 className="mb-0">{authUser.name}
                  <Link href="#!" className="text-decoration-none" data-bs-toggle="tooltip" data-placement="top" title="" data-original-title="Beginner">
                  </Link>
                </h2>
                <p className="mb-0 d-block">{authUser.email}</p>
              </div>
            </div>
            <div>
              <Link href={`/profile/edit`} className="btn btn-outline-primary d-none d-md-block">Edit Profile</Link>
            </div>
          </div>
          {/* nav */}
          {/* <ul className="nav nav-lt-tab px-4" id="pills-tab" role="tablist">
            <li className="nav-item">
              <Link className="nav-link active" href="#">Overview</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="#">Project</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="#">Files</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="#">Teams</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="#">
                Followers
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="#">Activity</Link>
            </li>
          </ul> */}
        </div>
      </Col>
    </Row>

      {/* content */}
      <div className="py-6">
        {/* <Row> */}
        <Card>
            <Card.Body>
                {/* card title */}
                <Card.Title as="h4">About Me</Card.Title>
                <span className="text-uppercase fw-medium text-dark fs-5 ls-2">Bio</span>
                <p className="mt-2 mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspen disse var ius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
                </p>
                <Row>
                    <Col xs={6} className="mb-5">
                        <h6 className="text-uppercase fs-5 ls-2">Role</h6>
                        <p className="mb-0">{authUser.role}</p>
                    </Col>
                    <Col xs={6} className="mb-5">
                        <h6 className="text-uppercase fs-5 ls-2">Designation</h6>
                        <p className="mb-0">{authUser.designation
                        }</p>
                    </Col>
                    <Col xs={6} className="mb-5">
                        <h6 className="text-uppercase fs-5 ls-2">Phone </h6>
                        <p className="mb-0">{authUser.phone_number}</p>
                    </Col>
                    <Col xs={6} className="mb-5">
                        <h6 className="text-uppercase fs-5 ls-2">Date of Birth </h6>
                        <p className="mb-0">{authUser.date_joined}</p>
                    </Col>
                    <Col xs={6}>
                        <h6 className="text-uppercase fs-5 ls-2">Email </h6>
                        <p className="mb-0">{authUser.email}</p>
                    </Col>
                    <Col xs={6}>
                        <h6 className="text-uppercase fs-5 ls-2">Location</h6>
                        <p className="mb-0">{authUser.address}</p>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
          {/* <AboutMe /> */}

          {/* Projects Contributions */}
          {/* <ProjectsContributions /> */}

          {/* Recent From Blog */}
          {/* <RecentFromBlog /> */}

          {/* <Col xl={6} lg={12} md={12} xs={12} className="mb-6"> */}

            {/* My Team */}
            {/* <MyTeam /> */}

            {/* Activity Feed */}
            {/* <ActivityFeed /> */}

          {/* </Col> */}
        {/* </Row> */}
      </div>

    </Container>
  )
}

export default Profile