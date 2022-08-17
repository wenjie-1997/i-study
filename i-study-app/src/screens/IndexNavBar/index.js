import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import * as authSelectors from "../../selectors/auth";

const IndexNavBar = () => {
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);

  const userId = authSelectors.getUserId(auth);

  useEffect(() => {
    if (userId) {
      navigate("/dashboard", { replace: true });
    }
  }, [auth, navigate]);

  return (
    <div className="toggle-sidebar">
      <header
        id="header"
        className="header fixed-top d-flex align-items-center"
      >
        <div className="d-flex align-items-center justify-content-between">
          <Link to="/" className="logo d-flex align-items-center">
            <span>I-Study</span>
          </Link>
        </div>

        <nav className="header-nav ms-auto mx-3">
          <Button variant="secondary" as={Link} to="login">
            Login
          </Button>
        </nav>
      </header>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
};

export default IndexNavBar;
