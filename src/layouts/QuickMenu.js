"use client";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Row, Col, Image, Dropdown, ListGroup } from "react-bootstrap";
import { useRouter } from "next/navigation";
import axios from "axios";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import useMounted from "@/hooks/useMounted";
import { useSelector } from "react-redux";

const QuickMenu = () => {
  const [authUser, setAuthUser] = useState({
    name: "",
    role: "",
    image: "",
  });

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
    try {
      const token = getToken();
      const session_id = getSession();
      const userId = getUserId();
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user-session?session_id=${session_id}&institute_id=${institute_id}&user_id=${userId}`,
        {
          ended_at: new Date().toISOString(),
          institute: instituteId,
          user: userId,
        },
        {
          headers: {
            Authorization: ` ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Failed to update user session:", error);
    }

    // Clear cookies
    document.cookie = `access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    document.cookie = `user_role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    document.cookie = `session_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;

    router.push("/");
  };

  const hasMounted = useMounted();

  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  useEffect(() => {
    loadAuthUser();
  }, []); // Runs whenever authUser changes

  const loadAuthUser = async () => {
    const token = getToken();
    if (!token) {
      errorToaster("Authentication required!");
      return;
    }
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/profile`,
        {
          headers: { Authorization: `${token}` },
        }
      );
      const authdata = response.data;
      setAuthUser(authdata);
      response.data;
    } catch (error) {}
  };

  const Notifications = () => {
    return (
      <SimpleBar style={{ maxHeight: "300px" }}>
        <ListGroup variant="flush">
          {NotificationList.map(function (item, index) {
            return (
              <ListGroup.Item
                className={index === 0 ? "bg-light" : ""}
                key={index}
              >
                <Row>
                  <Col>
                    <Link href="#" className="text-muted">
                      <h5 className=" mb-1">{item.sender}</h5>
                      <p className="mb-0"> {item.message}</p>
                    </Link>
                  </Col>
                </Row>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </SimpleBar>
    );
  };

  const QuickMenuDesktop = () => {
    return (
      <ListGroup
        as="ul"
        bsPrefix="navbar-nav"
        className="navbar-right-wrap ms-auto d-flex nav-top-wrap"
      >
        {/* <Dropdown as="li" className="stopevent">
                <Dropdown.Toggle as="a"
                    bsPrefix=' '
                    id="dropdownNotification"
                    className="btn btn-light btn-icon rounded-circle indicator indicator-primary text-muted">
                    <i className="fe fe-bell"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu
                    className="dashboard-dropdown notifications-dropdown dropdown-menu-lg dropdown-menu-end py-0"
                    aria-labelledby="dropdownNotification"
                    align="end"
                    show
                    >
                    <Dropdown.Item className="mt-3" bsPrefix=' ' as="div"  >
                        <div className="border-bottom px-3 pt-0 pb-3 d-flex justify-content-between align-items-end">
                            <span className="h4 mb-0">Notifications</span>
                            <Link href="/" className="text-muted">
                                <span className="align-middle">
                                    <i className="fe fe-settings me-1"></i>
                                </span>
                            </Link>
                        </div>
                        <Notifications />
                        <div className="border-top px-3 pt-3 pb-3">
                            <Link href="/dashboard/notification-history" className="text-link fw-semi-bold">
                                See all Notifications
                            </Link>
                        </div>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown> */}
        <Dropdown as="li" className="ms-2">
          <Dropdown.Toggle
            as="a"
            bsPrefix=" "
            className="rounded-circle"
            id="dropdownUser"
          >
            <div className="avatar avatar-md avatar-indicators avatar-online">
              <Image
                alt="Verified"
                src={
                  authUser?.image && authUser.image !== ""
                    ? authUser.image
                    : "/images/avatar/avatar-1.jpg"
                }
                className="rounded-circle"
                width={200}
                height={200}
              />
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu
            className="dropdown-menu dropdown-menu-end "
            align="end"
            aria-labelledby="dropdownUser"
            show
          >
            <Dropdown.Item as="div" className="px-4 pb-0 pt-2" bsPrefix=" ">
              <div className="lh-1 ">
                <h5 className="mb-1">
                  {authUser.name == "null" ? "User" : authUser.name}
                </h5>
                {/* <Link href="/profile/view" className="text-inherit fs-6">View my profile</Link> */}
                <h6>{authUser.role}</h6>
              </div>
              <div className=" dropdown-divider mt-3 mb-2"></div>
            </Dropdown.Item>
            <Dropdown.Item
              as={Link}
              href="/profile/view"
              eventKey="2"
              className="text-dark"
            >
              <i className="fe fe-user me-2"></i> View Profile
            </Dropdown.Item>
            <Dropdown.Item
              as={Link}
              href="/profile/edit"
              eventKey="3"
              className="text-dark"
            >
              <i className="fe fe-activity me-2"></i> Edit Profile
            </Dropdown.Item>
            <Dropdown.Item
              as={Link}
              href="/"
              eventKey="1"
              className="text-dark"
            >
              <i className="fe fe-star me-2"></i> Student Dashboard
            </Dropdown.Item>

            {/* <Dropdown.Item className="text-primary">
                        <i className="fe fe-star me-2"></i> Go Pro
                    </Dropdown.Item>
                    <Dropdown.Item >
                        <i className="fe fe-settings me-2"></i> Account Settings
                    </Dropdown.Item> */}
            <Dropdown.Item onClick={() => handleLogout(instituteId)}>
              <i className="fe fe-power me-2"></i>Sign Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </ListGroup>
    );
  };

  const QuickMenuMobile = () => {
    return (
      <ListGroup
        as="ul"
        bsPrefix="navbar-nav"
        className="navbar-right-wrap ms-auto d-flex nav-top-wrap"
      >
        <Dropdown as="li" className="ms-2">
          <Dropdown.Toggle
            as="a"
            bsPrefix=" "
            className="rounded-circle"
            id="dropdownUser"
          >
            <div className="avatar avatar-md avatar-indicators avatar-online">
              <Image
                alt="Verified"
                src={
                  authUser?.image && authUser.image !== ""
                    ? authUser.image
                    : "/images/avatar/avatar-1.jpg"
                }
                className="rounded-circle"
                width={200}
                height={200}
              />
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu
            className="dropdown-menu dropdown-menu-end "
            align="end"
            aria-labelledby="dropdownUser"
          >
            <Dropdown.Item as="div" className="px-4 pb-0 pt-2" bsPrefix=" ">
              <div className="lh-1 ">
                <h5 className="mb-1">
                  {authUser.name == "null" ? "User" : authUser.name}
                </h5>
                {/* <Link href="/profile/view" className="text-inherit fs-6">View my profile</Link> */}
                <h6>{authUser.role}</h6>
              </div>
              <div className=" dropdown-divider mt-3 mb-2"></div>
            </Dropdown.Item>
            <Dropdown.Item
              as={Link}
              href="/profile/view"
              eventKey="2"
              className="text-dark"
            >
              <i className="fe fe-user me-2"></i> View Profile
            </Dropdown.Item>
            <Dropdown.Item
              as={Link}
              href="/profile/edit"
              eventKey="3"
              className="text-dark"
            >
              <i className="fe fe-activity me-2"></i> Edit Profile
            </Dropdown.Item>
            <Dropdown.Item
              as={Link}
              href="/"
              eventKey="1"
              className="text-dark"
            >
              <i className="fe fe-star me-2"></i> Back to Home
            </Dropdown.Item>

            {/* <Dropdown.Item className="text-primary">
                        <i className="fe fe-star me-2"></i> Go Pro
                    </Dropdown.Item>
                    <Dropdown.Item >
                        <i className="fe fe-settings me-2"></i> Account Settings
                    </Dropdown.Item> */}
            <Dropdown.Item onClick={() => handleLogout(instituteId)}>
              <i className="fe fe-power me-2"></i>Sign Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </ListGroup>
    );
  };

  return (
    <Fragment>
      {hasMounted && isDesktop ? <QuickMenuDesktop /> : <QuickMenuMobile />}
    </Fragment>
  );
};

export default QuickMenu;
