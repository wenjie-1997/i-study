import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import { useDispatch, useSelector } from "react-redux";
import { searchTeacherByName } from "../../../thunks/class";
import * as classSelectors from "../../../selectors/class";
import * as userSelectors from "../../../selectors/user";
import { IoSearch } from "react-icons/io5";
import CommonFormGroup from "../../common/CommonFormGroup";

const TeacherModal = ({
  showModal,
  onCloseModal,
  onConfirmClassTeacher,
  currentTeacher,
}) => {
  const [searchText, setSearchText] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [timeoutId, setTimeoutId] = useState(0);
  const dispatch = useDispatch();

  const classModal = useSelector((state) => state.class);
  const teacherList = classSelectors.getTeacherList(classModal);

  const onChangeText = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    setSelectedTeacher(currentTeacher);
  }, [currentTeacher]);

  useEffect(() => {
    if (timeoutId) clearTimeout(timeoutId);
    setTimeoutId(
      setTimeout(() => {
        dispatch(searchTeacherByName({ searchText }));
      }, 1000)
    );
  }, [searchText]);

  useEffect(() => {
    if (
      teacherList.findIndex(
        (e) =>
          userSelectors.getTeacherId(e) ===
          userSelectors.getTeacherId(selectedTeacher)
      ) === -1
    )
      setSelectedTeacher(null);
  }, [teacherList]);

  const onSelectTeacher = (teacher) => setSelectedTeacher(teacher);
  return (
    <Modal show={showModal} scrollable dialogClassName="h-100">
      <Modal.Header>Select Class Teacher</Modal.Header>
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
          {teacherList.map((t) => (
            <Card
              key={userSelectors.getTeacherId(t)}
              bg={
                userSelectors.getTeacherId(t) ===
                  userSelectors.getTeacherId(selectedTeacher) && "light"
              }
              onClick={() => onSelectTeacher(t)}
              className="my-2"
            >
              <Card.Body className="py-3">{userSelectors.getName(t)}</Card.Body>
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
              disabled={selectedTeacher === null}
              onClick={() => onConfirmClassTeacher(selectedTeacher)}
            >
              Confirm
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default TeacherModal;
