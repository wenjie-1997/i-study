import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
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
      <Modal.Header>Change Password</Modal.Header>
      <Modal.Body className="mx-3 my-2">
        <form onSubmit={onSubmit}>
          <FormGroup>
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
          </FormGroup>
          <FormGroup>
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>Re-enter New Password</Form.Label>
            <Form.Control
              type="password"
              isInvalid={isReenterPasswordInvalid}
              onChange={(e) => setReenterPassword(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              The re-entered password does not match the new password.
            </Form.Control.Feedback>
          </FormGroup>
          <Button variant="secondary" onClick={onCloseModal}>
            Close
          </Button>
          <Button type="submit">Submit</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ChangePasswordModal;
