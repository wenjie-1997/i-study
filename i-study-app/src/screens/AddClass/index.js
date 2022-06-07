import React, { Fragment, useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import * as userSelectors from "../../selectors/user";
import { addClass } from "../../thunks/class";
import TeacherModal from "./components/TeacherModal";
import CommonDiv from "../common/CommonDiv";
import CommonFormGroup from "../common/CommonFormGroup";
import { useNavigate } from "react-router-dom";

const AddClass = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      {" "}
      <div className="pagetitle">
        <h1>Add Class</h1>
        <nav>
          <ol className="breadcrumb">
            <li
              className="breadcrumb-item"
              onClick={() => navigate("../manage_class")}
            >
              Class
            </li>

            <li class="breadcrumb-item active">Add Class</li>
          </ol>
        </nav>
      </div>
      <Card>
        <Form onSubmit={onSubmit}>
          <Card.Body className="pt-3 ">
            <div className="row g-3">
              <CommonFormGroup class="col-md-6">
                <Form.Label>Class Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </CommonFormGroup>
              <CommonFormGroup class="col-md-6">
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
            </div>
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
            <Button type="submit" className="mt-2">
              Submit
            </Button>
          </Card.Body>
        </Form>
      </Card>
      <TeacherModal
        showModal={showTeacherModal}
        onCloseModal={() => setShowTeacherModal(false)}
        onConfirmClassTeacher={onConfirmClassTeacher}
      />
    </>
  );
};

export default AddClass;
