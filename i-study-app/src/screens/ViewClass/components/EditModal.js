import React, { useEffect, useState, Fragment } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import * as classSelectors from "../../../selectors/class";
import InputGroup from "react-bootstrap/InputGroup";

import TeacherModal from "./TeacherModal";
import CommonFormGroup from "../../common/CommonFormGroup";

const EditModal = ({
  showModal,
  onCloseModal,
  onSubmitEdit,
  selectedClass,
}) => {
  useEffect(() => {
    setName(classSelectors.getName(selectedClass));
    setForm(classSelectors.getForm(selectedClass));
  }, [selectedClass]);

  const [name, setName] = useState("");
  const [form, setForm] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [teacherId, setTeacherId] = useState(0);

  const [showTeacherModal, setShowTeacherModal] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    onSubmitEdit({ name, form, teacherId });
  };

  const onConfirmClassTeacher = (teacher) => {
    setTeacherName(teacher.name);
    setTeacherId(teacher.teacherId);
    setShowTeacherModal(false);
  };
  return (
    <>
      <Modal size="lg" show={showModal} scrollable>
        <Modal.Header>Edit User</Modal.Header>
        <Modal.Body className="mx-3 my-2">
          <Form onSubmit={onSubmit}>
            <CommonFormGroup>
              <Form.Label>Class Name</Form.Label>
              <Form.Control
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </CommonFormGroup>
            <CommonFormGroup>
              <Form.Label>Form</Form.Label>
              <Form.Select
                value={form}
                onChange={(e) => setForm(parseInt(e.target.value) || "")}
                required
              >
                <option value="">-- Please Select --</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
              </Form.Select>
            </CommonFormGroup>
            <CommonFormGroup>
              <Form.Label>Class Teacher</Form.Label>
              {teacherId ? (
                <InputGroup>
                  <Form.Control type="text" value={teacherName} readOnly />
                  <Button onClick={() => setShowTeacherModal(true)}>
                    Change
                  </Button>
                </InputGroup>
              ) : (
                <Button
                  onClick={() => setShowTeacherModal(true)}
                  className="mx-2"
                >
                  Select
                </Button>
              )}
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
      <TeacherModal
        showModal={showTeacherModal}
        onCloseModal={() => setShowTeacherModal(false)}
        onConfirmClassTeacher={onConfirmClassTeacher}
      />
    </>
  );
};

export default EditModal;
