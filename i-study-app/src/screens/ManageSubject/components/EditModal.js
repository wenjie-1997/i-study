import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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
      <Modal.Header>Edit Subject</Modal.Header>
      <Modal.Body>
        <form onSubmit={onSubmit}>
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
          <Row className="d-flex justify-content-end">
            <Col xs sm="auto">
              <Button variant="secondary" onClick={onCloseModal}>
                Cancel
              </Button>
            </Col>
            <Col xs sm="auto">
              <Button type="submit">Update</Button>
            </Col>
          </Row>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditModal;
