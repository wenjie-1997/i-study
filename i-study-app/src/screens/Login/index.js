import React, { useCallback, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../thunks/auth";
import { CLOSE_ALERT } from "../../reducers/auth";
import * as authSelectors from "../../selectors/auth";
import CommonFormGroup from "../common/CommonFormGroup";

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
      <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="pt-4 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4">
                      Login to Your Account
                    </h5>
                  </div>

                  <form
                    className="row g-3 needs-validation"
                    noValidate
                    onSubmit={onSubmit}
                  >
                    <div className="col-12">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                      />
                    </div>

                    <Alert
                      show={isLoginFailed}
                      variant="danger"
                      className="py-2"
                    >
                      Invalid Username or Password
                    </Alert>
                    <div className="col-12">
                      <button className="btn btn-primary w-100" type="submit">
                        Login
                      </button>
                    </div>
                    <div className="col-12"></div>
                  </form>
                </div>
              </div>

              <div className="credits">
                Designed by{" "}
                <a href="https://bootstrapmade.com/">BootstrapMade</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    // <div className="container">
    //   <div className="row justify-content-center p-3 my-5">
    //     <Card className="col-xs-sm-10 col-md-8 ">
    //       <Card.Body>
    //         <h1>Login</h1>
    //         <Form onSubmit={onSubmit}>
    //           <CommonFormGroup className="mb-3" controlId="formUsername">
    //             <Form.Label>Username</Form.Label>
    //             <Form.Control
    //               placeholder="Enter username"
    //               onChange={(e) => setUsername(e.target.value)}
    //               value={username}
    //               required
    //             />
    //           </CommonFormGroup>
    //           <CommonFormGroup className="mb-3" controlId="formPassword">
    //             <Form.Label>Password</Form.Label>
    //             <Form.Control
    //               type="password"
    //               placeholder="Enter password"
    //               onChange={(e) => setPassword(e.target.value)}
    //               value={password}
    //               required
    //             />
    //           </CommonFormGroup>
    //           <Alert show={isLoginFailed} variant="danger" className="py-2">
    //             Invalid Username or Password
    //           </Alert>
    //           <Button type="submit">Submit</Button>
    //         </Form>
    //       </Card.Body>
    //     </Card>
    //   </div>
    // </div>
  );
};

export default Login;
