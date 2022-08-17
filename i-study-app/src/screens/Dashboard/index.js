import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../thunks/auth";
import { Dropdown } from "react-bootstrap";
import Toast from "react-bootstrap/Toast";
import {
  getNotificationList,
  setNotificationIsOpened,
} from "../../thunks/notification";
import * as topicComponentSelectors from "../../selectors/topicComponent";
import * as notificationSelectors from "../../selectors/notification";
import * as subjectSelectors from "../../selectors/subject";
import { getformattedDateTime } from "../../utilities/helper";
import { io } from "socket.io-client";
import { USER_TYPE_NUMBER } from "../../utilities/constants";

const Dashboard = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const location = useLocation();
  const [hideSidebar, setHideSidebar] = useState(false);
  const [socket, setSocket] = useState(null);
  const [show, setShow] = useState(false);

  const notification = useSelector((state) => state.notification);
  const userType = parseInt(localStorage.getItem("userType"));

  const notificationList =
    notificationSelectors.getNotificationList(notification);

  useEffect(() => {
    dispatch(getNotificationList());
  }, []);

  useEffect(() => {
    if (userType === 2) {
      const newSocket = io(process.env.REACT_APP_BACKEND_URL);
      setSocket(newSocket);
      return () => {
        newSocket.close();
      };
    }
  }, [setSocket]);

  useEffect(() => {
    if (socket !== null) {
      const classId = parseInt(localStorage.getItem("classId"));
      socket.emit("join", classId);
      socket.on("notification", (msg) => {
        if (msg === true) {
          setShow(true);
          dispatch(getNotificationList());
        }
      });
    }
  }, [socket]);

  const onClickLogout = useCallback(() => {
    dispatch(logout());
    navigate("/", { replace: true });
  }, [dispatch, navigate]);

  return (
    <div className={hideSidebar ? "toggle-sidebar" : ""}>
      <Navbar
        id="header"
        className="header fixed-top d-flex align-items-center"
      >
        <div className="d-flex align-items-center justify-content-between">
          <Link to="/" className="logo d-flex align-items-center">
            <img src="./src/assets/img/logo.png" alt="" />
            <span className="d-none d-lg-block">I-Study</span>
          </Link>
          <i
            className="bi bi-list toggle-sidebar-btn"
            onClick={() => setHideSidebar(!hideSidebar)}
          ></i>
        </div>

        <nav className="header-nav ms-auto mx-3">
          <ul className="d-flex align-items-center">
            {userType === 2 && (
              <li className="nav-item dropdown me-2">
                <Dropdown
                  align="end"
                  onToggle={(nextShow) => {
                    if (nextShow) {
                      dispatch(setNotificationIsOpened());
                    } else {
                      dispatch(getNotificationList());
                    }
                  }}
                >
                  <Dropdown.Toggle
                    as="div"
                    className="nav-link nav-icon"
                    bsPrefix="px-3 py-2"
                  >
                    <i className="bi bi-bell"></i>
                    <span className="badge bg-primary badge-number">
                      {notificationList.reduce((prev, cur) => {
                        return !notificationSelectors.getIsOpened(cur)
                          ? prev + 1
                          : prev;
                      }, 0)}
                    </span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    style={{ overflowY: "scroll", maxHeight: "500px" }}
                  >
                    {notificationList.map((n) => {
                      let componentType =
                        topicComponentSelectors.getComponentType(n);
                      return (
                        <Dropdown.Item
                          key={notificationSelectors.getNotificationId(n)}
                          onClick={() => {
                            localStorage.setItem(
                              "subject",
                              JSON.stringify({
                                classSubjectId:
                                  subjectSelectors.getClassSubjectId(n),
                                subjectName: subjectSelectors.getSubjectName(n),
                              })
                            );
                            if (componentType === 3) {
                              localStorage.setItem(
                                "forum",
                                JSON.stringify({
                                  componentType: componentType,
                                  description:
                                    topicComponentSelectors.getDescription(n),
                                  forumId:
                                    topicComponentSelectors.getForumId(n),
                                  title: topicComponentSelectors.getTitle(n),
                                  topicComponentId:
                                    topicComponentSelectors.getTopicComponentId(
                                      n
                                    ),
                                })
                              );
                            } else {
                              localStorage.setItem(
                                "submission",
                                JSON.stringify({
                                  componentType: componentType,
                                  description:
                                    topicComponentSelectors.getDescription(n),
                                  submissionId:
                                    topicComponentSelectors.getSubmissionId(n),
                                  title: topicComponentSelectors.getTitle(n),
                                  topicComponentId:
                                    topicComponentSelectors.getTopicComponentId(
                                      n
                                    ),
                                  dueDate:
                                    topicComponentSelectors.getDueDate(n),
                                })
                              );
                            }
                            navigate(
                              componentType === 3
                                ? "/dashboard/forum/" +
                                    topicComponentSelectors.getForumId(n)
                                : "/dashboard/submission/" +
                                    topicComponentSelectors.getSubmissionId(n)
                            );
                          }}
                        >
                          <div
                            style={{ width: "300px" }}
                            className="d-flex flex-row align-items-center py-2"
                          >
                            <div>
                              <div
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  backgroundColor:
                                    componentType === 3 ? "teal" : "crimson",
                                  borderRadius: "25px",
                                  color: "white",
                                  flexGrow: 2,
                                }}
                                className="d-flex justify-content-center align-items-center me-3"
                              >
                                <i
                                  className={
                                    componentType === 3
                                      ? "bi bi-chat-left-text-fill"
                                      : "bi bi-inboxes-fill"
                                  }
                                  style={{ fontSize: "20px", margin: 0 }}
                                ></i>
                              </div>
                            </div>
                            <div className="flex-shrink-1 text-wrap align-middle">
                              <p
                                style={{
                                  ...(notificationSelectors.getIsOpened(n) !==
                                    1 && {
                                    fontWeight: "bold",
                                  }),
                                  margin: "0px",
                                  padding: "0px",
                                }}
                              >
                                A new{" "}
                                {componentType === 3 ? "forum" : "submission"}{" "}
                                named {topicComponentSelectors.getTitle(n)} is
                                created in Subject
                              </p>
                              <br />
                              <div style={{ textAlign: "end" }}>
                                <i
                                  style={{
                                    fontSize: "12px",
                                    textAlign: "end",
                                  }}
                                >
                                  {getformattedDateTime(
                                    notificationSelectors.getCreatedDate(n)
                                  )}
                                </i>
                              </div>
                            </div>
                          </div>
                        </Dropdown.Item>
                      );
                    })}
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            )}
            <li className="nav-item dropdown">
              <Button variant="danger" onClick={onClickLogout}>
                Logout
              </Button>
            </li>
          </ul>
        </nav>
      </Navbar>
      <aside className="sidebar" id="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          {(userType === 1 || userType === 2) && (
            <Fragment>
              <li className="nav-item">
                <Nav.Link
                  as={Link}
                  className=" nav-link collapsed"
                  to="/dashboard"
                >
                  <i className="bi bi-grid"></i>
                  <span>Home</span>
                </Nav.Link>
              </li>
              <li className="nav-item">
                <Nav.Link
                  as={Link}
                  className=" nav-link collapsed"
                  to="profile"
                >
                  <i className="bi bi-person-circle"></i>

                  <span>Profile</span>
                </Nav.Link>
              </li>
              <li className="nav-item">
                <Nav.Link
                  as={Link}
                  className=" nav-link collapsed"
                  to="timetable"
                >
                  <i className="bi bi-table"></i>
                  <span>Timetable</span>
                </Nav.Link>
              </li>
              {userType === USER_TYPE_NUMBER.STUDENT && (
                <li className="nav-item">
                  <Nav.Link
                    as={Link}
                    className=" nav-link collapsed"
                    to="homework"
                  >
                    <i className="bi bi-journal-bookmark-fill"></i>
                    <span>Homework</span>
                  </Nav.Link>
                </li>
              )}
              {userType === USER_TYPE_NUMBER.TEACHER && (
                <li className="nav-item">
                  <Nav.Link
                    as={Link}
                    className=" nav-link collapsed"
                    to="report"
                  >
                    <i className="bi bi-clipboard-data"></i>
                    <span>Report</span>
                  </Nav.Link>
                </li>
              )}
            </Fragment>
          )}
          {/* Admin */}
          {userType === 3 && (
            <Fragment>
              <li className="nav-item">
                <Nav.Link
                  active={location.pathname === "/dashboard"}
                  as={Link}
                  className=" nav-link collapsed"
                  to=""
                >
                  <i className="bi bi-people-fill"></i>
                  <span>User</span>
                </Nav.Link>
              </li>
              <li className="nav-item">
                <Nav.Link
                  active={location.pathname === "/dashboard/manage_class"}
                  as={Link}
                  className=" nav-link collapsed"
                  to="manage_class"
                >
                  <i className="bi bi-clipboard-data"></i>
                  <span>Class</span>
                </Nav.Link>
                <Nav.Link
                  active={location.pathname === "/dashboard/manage_subject"}
                  as={Link}
                  className=" nav-link collapsed"
                  to="manage_subject"
                >
                  <i className="bi bi-layers-half"></i>
                  <span>Subject</span>
                </Nav.Link>
              </li>
            </Fragment>
          )}
        </ul>
      </aside>
      <main
        id="main"
        style={{ position: "relative" }}
        className={!hideSidebar ? "main toggle-sidebar" : "main"}
      >
        <Outlet />
        {userType === 2 && (
          <Toast
            onClose={() => setShow(false)}
            show={show}
            delay={5000}
            autohide
            style={{
              position: "absolute",
              right: 2.5,
              top: 5,
              backgroundColor: "white",
            }}
            className="d-flex flex-row py-3 px-4 align-items-center"
          >
            <div className="d-flex align-items-center">
              <i
                className="bx bxs-bell-ring"
                style={{ fontSize: "26px", marginRight: "12px" }}
              ></i>
            </div>
            <div>
              <b>You have received a notification</b>
            </div>
          </Toast>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
