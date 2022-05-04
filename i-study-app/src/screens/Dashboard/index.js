import React, { Fragment, useCallback } from "react";
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
import { DISMISS_TOAST } from "../../reducers/user";

const Dashboard = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const location = useLocation();

  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const toast = userSelectors.getToast(user);
  const userType = authSelectors.getUserType(auth);

  const onClickLogout = useCallback(() => {
    dispatch(logout());
    navigate("/", { replace: true });
  }, [dispatch, navigate]);

  return (
    <Fragment>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand>I Study</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              active={location.pathname === "/dashboard"}
              as={Link}
              to=""
            >
              Welcome
            </Nav.Link>
            {(userType === 1 || userType === 2) && (
              <Fragment>
                <Nav.Link as={Link} to="profile">
                  Profile
                </Nav.Link>
                {userType === 2 && (
                  <Nav.Link as={Link} to="timetable">
                    Timetable
                  </Nav.Link>
                )}
              </Fragment>
            )}
            {/* Admin */}
            {userType === 3 && (
              <Fragment>
                <Nav.Link
                  active={location.pathname === "/dashboard/manage_user"}
                  as={Link}
                  to="manage_user"
                >
                  User
                </Nav.Link>
                <Nav.Link
                  active={location.pathname === "/dashboard/manage_class"}
                  as={Link}
                  to="manage_class"
                >
                  Class
                </Nav.Link>
                <Nav.Link
                  active={location.pathname === "/dashboard/manage_subject"}
                  as={Link}
                  to="manage_subject"
                >
                  Subject
                </Nav.Link>
              </Fragment>
            )}
          </Nav>
          <Nav className="justify-content-end">
            <Button variant="danger" onClick={onClickLogout}>
              Logout
            </Button>
          </Nav>
        </Container>
      </Navbar>
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
        }}
      >
        <ToastContainer className="p-3" position="top-end">
          <Toast
            bg={toast?.bg}
            show={toast !== null}
            delay={3000}
            autohide
            onClose={() => dispatch(DISMISS_TOAST())}
          >
            <Toast.Header closeButton={false}>
              <b>{toast?.message}</b>
            </Toast.Header>
          </Toast>
        </ToastContainer>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Dashboard;
