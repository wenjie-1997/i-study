import React, { useEffect, useState, Fragment } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CommonFormGroup from "../../common/CommonFormGroup";
import * as topicSelectors from "../../../selectors/topic";

const SubmissionModal = ({
  showModal,
  onCloseModal,
  onAddSubmission,
  onUpdateSubmission,
  isEditing,
}) => {
  const [file, setFile] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    onAddSubmission({ file });
  };

  useEffect(() => {
    if (!showModal) setFile("");
  }, [showModal]);

  // useEffect(() => {
  //   if (isEditing) {
  //     setName(topicSelectors.getName(editingTopic));
  //   }
  // }, [editingTopic]);
  return (
    <>
      <Modal show={showModal} scrollable>
        <Form onSubmit={onSubmit}>
          <Modal.Header>
            {isEditing ? "Edit Submission" : "Add Submission"}
          </Modal.Header>
          <Modal.Body className="mx-3 my-2">
            <CommonFormGroup>
              <Form.Label>{"Upload"} the file</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                required
              />
            </CommonFormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={onCloseModal} variant="secondary">
              Close
            </Button>
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default SubmissionModal;
