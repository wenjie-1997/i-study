import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import CommonFormGroup from "../../common/CommonFormGroup";
import { useDispatch } from "react-redux";
import { changePassword } from "../../../thunks/user";

const ChangePasswordModal = ({ showModal, onCloseModal }) => {
  const dispatch = useDispatch();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reenterPassword, setReenterPassword] = useState("");
  const [isOldPasswordInvalid, setIsOldPasswordInvalid] = useState(false);
  const [isReenterPasswordInvalid, setIsReenterPasswordInvalid] =
    useState(false);

  const renderTooltip = (
    <Popover id="popover-basic">
      <Popover.Body>
        Password criteria:
        <ul>
          <li>Length is between 8 to 16 words</li>
          <li>Must contain alphanumeric character</li>
          <li>Must contain at least one upper case alphabet character</li>
          <li>
            Must contain at least one special symbol character (!@#$%^&*+-_)
          </li>
        </ul>
      </Popover.Body>
    </Popover>
  );

  const verifyPassword = (password) => {
    if (password.length < 8 || password.length > 16) {
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      return false;
    }
    if (!/[0-9]/.test(password)) {
      return false;
    }
    if (!/[!@#$%^&*+\-_]/.test(password)) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (!showModal) {
      setOldPassword("");
      setNewPassword("");
      setReenterPassword("");
      setIsOldPasswordInvalid(false);
      setIsReenterPasswordInvalid(false);
    }
  }, [showModal]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (reenterPassword !== newPassword) {
      setIsReenterPasswordInvalid(true);
    } else {
      if (verifyPassword(newPassword))
        dispatch(
          changePassword({
            oldPassword,
            newPassword,
            onCloseModal,
            setIsOldPasswordInvalid,
          })
        );
    }
  };
  return (
    <Modal show={showModal}>
      <form onSubmit={onSubmit}>
        <Modal.Header>Change Password</Modal.Header>
        <Modal.Body className="mx-3 my-2">
          <CommonFormGroup>
            <Form.Label>Old Password</Form.Label>
            <Form.Control
              type="password"
              required
              isInvalid={isOldPasswordInvalid}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Your old password is invalid.
            </Form.Control.Feedback>
          </CommonFormGroup>
          <CommonFormGroup>
            <Form.Label>
              New Password
              <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
              >
                <i
                  className="bi bi-exclamation-circle"
                  style={{ color: "red" }}
                ></i>
              </OverlayTrigger>
            </Form.Label>
            <Form.Control
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              isInvalid={newPassword !== "" && !verifyPassword(newPassword)}
            />
            <Form.Control.Feedback type="invalid">
              Password does not satisfy criteria
            </Form.Control.Feedback>
          </CommonFormGroup>
          <CommonFormGroup>
            <Form.Label>Re-enter New Password</Form.Label>
            <Form.Control
              type="password"
              isInvalid={isReenterPasswordInvalid}
              onChange={(e) => setReenterPassword(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              The re-entered password does not match the new password.
            </Form.Control.Feedback>
          </CommonFormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCloseModal}>
            Close
          </Button>
          <Button type="submit">Submit</Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ChangePasswordModal;
