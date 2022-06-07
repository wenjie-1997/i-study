import React, { Fragment, useCallback, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../thunks/auth";
import * as userSelectors from "../../selectors/user";
import * as authSelectors from "../../selectors/auth";
import SidebarMenu from "react-bootstrap-sidebar-menu";
import { DISMISS_TOAST } from "../../reducers/user";
import { Dropdown } from "react-bootstrap";

const Dashboard = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const location = useLocation();
  const [hideSidebar, setHideSidebar] = useState(false);

  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const toast = userSelectors.getToast(user);
  const userType = authSelectors.getUserType(auth);

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
          <ul class="d-flex align-items-center">
            <li className="nav-item dropdown me-2">
              <Dropdown align="end">
                <Dropdown.Toggle
                  as="div"
                  className="nav-link nav-icon"
                  bsPrefix="px-3 py-2"
                >
                  <i className="bi bi-bell"></i>
                  <span className="badge bg-primary badge-number">4</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#">Menu Item</Dropdown.Item>
                  <Dropdown.Item href="#">Menu Item</Dropdown.Item>
                  <Dropdown.Item href="#">Menu Item</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li class="nav-item dropdown">
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
              {userType === 2 && (
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
      <main id="main" className={!hideSidebar ? "main toggle-sidebar" : "main"}>
        <Outlet />
      </main>
    </div>
    // <Fragment>
    //   <Navbar bg="light">
    //     <Container>
    //       <Navbar.Brand>I Study</Navbar.Brand>
    //       <Nav className="me-auto">
    //         <Nav.Link
    //           active={location.pathname === "/dashboard"}
    //           as={Link}
    //           to=""
    //         >
    //           Home
    //         </Nav.Link>
    //         {(userType === 1 || userType === 2) && (
    //           <Fragment>
    //             <Nav.Link as={Link} to="profile">
    //               Profile
    //             </Nav.Link>
    //             <Nav.Link as={Link} to="timetable">
    //               Timetable
    //             </Nav.Link>
    //             {userType === 2 && (
    //               <Nav.Link as={Link} to="homework">
    //                 Homework
    //               </Nav.Link>
    //             )}
    //           </Fragment>
    //         )}
    //         {/* Admin */}
    //         {userType === 3 && (
    //           <Fragment>
    //             <Nav.Link
    //               active={location.pathname === "/dashboard/manage_user"}
    //               as={Link}
    //               to="manage_user"
    //             >
    //               User
    //             </Nav.Link>
    //             <Nav.Link
    //               active={location.pathname === "/dashboard/manage_class"}
    //               as={Link}
    //               to="manage_class"
    //             >
    //               Class
    //             </Nav.Link>
    //             <Nav.Link
    //               active={location.pathname === "/dashboard/manage_subject"}
    //               as={Link}
    //               to="manage_subject"
    //             >
    //               Subject
    //             </Nav.Link>
    //           </Fragment>
    //         )}
    //       </Nav>
    //       <Nav className="justify-content-end">
    //         <Button variant="danger" onClick={onClickLogout}>
    //           Logout
    //         </Button>
    //       </Nav>
    //     </Container>
    //   </Navbar>
    //   <div
    //     style={{
    //       position: "sticky",
    //       top: 0,
    //       zIndex: 1,
    //     }}
    //   >
    //     <ToastContainer className="p-3" position="top-end">
    //       <Toast
    //         bg={toast?.bg}
    //         show={toast !== null}
    //         delay={3000}
    //         autohide
    //         onClose={() => dispatch(DISMISS_TOAST())}
    //       >
    //         <Toast.Header closeButton={false}>
    //           <b>{toast?.message}</b>
    //         </Toast.Header>
    //       </Toast>
    //     </ToastContainer>
    //   </div>
    //   <Outlet />
    // </Fragment>
  );
};

export default Dashboard;
