import React, { useCallback, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../thunks/user";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../selectors/user";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(login({ username, password }));
    },
    [username, password, dispatch]
  );

  // useEffect(() => {
  //   let userInfo = getUser(user);
  //   if (userInfo !== null) {
  //     navigate("/dashboard", { replace: true });
  //   }
  // });

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
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </Form.Group>
              <Button type="submit">Submit</Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Login;
