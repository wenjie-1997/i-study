import React, { Fragment, useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import * as userSelectors from "../../selectors/user";
import { addClass } from "../../thunks/class";
import TeacherModal from "./components/TeacherModal";

const AddClass = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [form, setForm] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [teacherId, setTeacherId] = useState(0);
  const [showTeacherModal, setShowTeacherModal] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addClass({ name, form, teacherId }));
  };

  const onConfirmClassTeacher = (teacher) => {
    setTeacherName(userSelectors.getName(teacher));
    setTeacherId(userSelectors.getTeacherId(teacher));
    setShowTeacherModal(false);
  };
  return (
    <>
      <div className="mx-auto my-4 w-75">
        <h3>Add Class</h3>
        <Card className="py-5 px-5 justify-content-flex-start">
          <Form onSubmit={onSubmit}>
            <Form.Group>
              <Form.Label>Class Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
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
            </Form.Group>
            <Form.Group>
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
            </Form.Group>
            <Button type="submit" className="mt-3">
              Submit
            </Button>
          </Form>
        </Card>
      </div>
      <TeacherModal
        showModal={showTeacherModal}
        onCloseModal={() => setShowTeacherModal(false)}
        onConfirmClassTeacher={onConfirmClassTeacher}
      />
    </>
  );
};

export default AddClass;
