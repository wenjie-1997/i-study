import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import { useDispatch, useSelector } from "react-redux";
import { searchStudentByName } from "../../../thunks/class";
import * as classSelectors from "../../../selectors/class";
import * as userSelectors from "../../../selectors/user";
import { IoSearch } from "react-icons/io5";
import CommonFormGroup from "../../common/CommonFormGroup";

const StudentModal = ({ showModal, onCloseModal, onAddStudent }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [timeoutId, setTimeoutId] = useState(0);
  const dispatch = useDispatch();

  const classModal = useSelector((state) => state.class);
  const studentList = classSelectors.getStudentList(classModal);

  const onChangeText = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    if (showModal) {
      dispatch(searchStudentByName({ searchText: "" }));
      setSearchText("");
    }
  }, [showModal, dispatch]);

  useEffect(() => {
    if (timeoutId) clearTimeout(timeoutId);
    setTimeoutId(
      setTimeout(() => {
        dispatch(searchStudentByName({ searchText }));
      }, 1000)
    );
  }, [searchText, dispatch]);

  useEffect(() => {
    if (
      studentList.findIndex(
        (e) =>
          userSelectors.getTeacherId(e) ===
          userSelectors.getTeacherId(selectedStudent)
      ) === -1
    )
      setSelectedStudent(null);
  }, [studentList]);

  const onSelectStudent = (student) => setSelectedStudent(student);
  return (
    <Modal show={showModal} scrollable dialogClassName="h-100">
      <Modal.Header>Add New Student</Modal.Header>
      <Modal.Body>
        <CommonFormGroup className="mb-3">
          <InputGroup>
            <InputGroup.Text>
              <IoSearch />
            </InputGroup.Text>
            <Form.Control
              type="search"
              value={searchText}
              placeholder="Search by Name..."
              onChange={onChangeText}
            />
          </InputGroup>
        </CommonFormGroup>
        <div>
          {studentList.slice(0, 5).map((s) => (
            <Card
              key={userSelectors.getStudentId(s)}
              bg={
                userSelectors.getStudentId(s) ===
                  userSelectors.getStudentId(selectedStudent) && "light"
              }
              onClick={() => onSelectStudent(s)}
              className="mb-2"
            >
              <Card.Body className="py-3">{userSelectors.getName(s)}</Card.Body>
            </Card>
          ))}
        </div>
        <Row className="d-flex align-items-end mt-3">
          <Col xs sm="auto">
            <Button variant="light" onClick={onCloseModal}>
              Cancel
            </Button>
          </Col>
          <Col xs sm="auto">
            <Button
              variant="primary"
              type="submit"
              disabled={selectedStudent === null}
              onClick={() => onAddStudent(selectedStudent)}
            >
              Add
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default StudentModal;
