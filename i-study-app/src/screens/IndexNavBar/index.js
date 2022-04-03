import React, { Fragment, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import * as userSelectors from "../../selectors/user";

const IndexNavBar = () => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const auth = userSelectors.getUser(user);

  useEffect(() => {
    if (auth !== null) {
      navigate("/dashboard", { replace: true });
    }
  }, [auth, navigate]);

  return (
    <Fragment>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand>I Study</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="">
              Welcome
            </Nav.Link>
            <Nav.Link as={Link} to="about">
              About
            </Nav.Link>
          </Nav>
          <Nav className="justify-content-end">
            <Button variant="danger" as={Link} to="login">
              Login
            </Button>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </Fragment>
  );
};

export default IndexNavBar;
