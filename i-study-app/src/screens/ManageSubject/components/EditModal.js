import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import * as subjectSelectors from "../../../selectors/subject";
import { useDispatch } from "react-redux";
import { updateSubject } from "../../../thunks/subject";

const EditModal = ({ showModal, onCloseModal, subject }) => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setName(subjectSelectors.getName(subject));
    setCode(subjectSelectors.getCode(subject));
  }, [subject]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateSubject({
        subjectId: subjectSelectors.getSubjectId(subject),
        name,
        code,
      })
    );
  };

  return (
    <Modal show={showModal}>
      <form onSubmit={onSubmit}>
        <Modal.Header>Edit Subject</Modal.Header>
        <Modal.Body>
          <FormGroup>
            <Form.Label>Subject Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>Subject Code</Form.Label>
            <Form.Control
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCloseModal}>
            Cancel
          </Button>
          <Button type="submit">Update</Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default EditModal;
