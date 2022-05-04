import React, { useCallback, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../thunks/auth";
import { CLOSE_ALERT } from "../../reducers/auth";
import * as authSelectors from "../../selectors/auth";

const Login = () => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const isLoginFailed = authSelectors.getIsLoginFailed(auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => dispatch(CLOSE_ALERT()), [dispatch]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(login({ username, password }));
    },
    [username, password, dispatch]
  );

  return (
    <div className="container">
      <div className="row justify-content-center p-3 my-5">
        <Card className="col-xs-sm-10 col-md-8 ">
          <Card.Body>
            <h1>Login</h1>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  placeholder="Enter username"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
              </Form.Group>
              <Alert show={isLoginFailed} variant="danger" className="py-2">
                Invalid Username or Password
              </Alert>
              <Button type="submit">Submit</Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Login;
