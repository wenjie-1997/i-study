import React, { useEffect, useState, Fragment } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CommonFormGroup from "../../common/CommonFormGroup";
import * as topicSelectors from "../../../selectors/topic";

const TopicModal = ({
  showModal,
  onCloseModal,
  onAddTopic,
  isEditing,
  editingTopic,
}) => {
  const [name, setName] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      onAddTopic({ ...editingTopic, name });
    } else onAddTopic({ name });
  };

  useEffect(() => {
    if (!showModal) setName("");
  }, [showModal]);

  useEffect(() => {
    if (isEditing) {
      setName(topicSelectors.getName(editingTopic));
    }
  }, [isEditing]);
  return (
    <>
      <Modal show={showModal} scrollable>
        <Modal.Header>
          {isEditing ? "Edit Topic" : "Add new Topic"}
        </Modal.Header>
        <Modal.Body className="mx-3 my-2">
          <Form onSubmit={onSubmit}>
            <CommonFormGroup>
              <Form.Label>Topic Name</Form.Label>
              <Form.Control
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </CommonFormGroup>

            <Row className="d-flex justify-content-end">
              <Col xs sm="auto">
                <Button onClick={onCloseModal} variant="secondary">
                  Close
                </Button>
              </Col>
              <Col xs sm="auto">
                <Button type="submit" variant="primary">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TopicModal;
