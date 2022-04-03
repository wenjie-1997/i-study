import React, { Fragment, useCallback } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../thunks/user";
import * as userSelectors from "../../selectors/user";

const Dashboard = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const auth = userSelectors.getUser(user);
  const userType = userSelectors.getUserType(auth);

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
            <Nav.Link as={Link} to="">
              Welcome
            </Nav.Link>
            {(userType === 1 || userType === 2) && (
              <Fragment>
                <Nav.Link as={Link} to="profile">
                  Profile
                </Nav.Link>
              </Fragment>
            )}
            {userType === 3 && (
              <Fragment>
                <Nav.Link as={Link} to="manage_user">
                  User
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
      <Outlet />
    </Fragment>
  );
};

export default Dashboard;
