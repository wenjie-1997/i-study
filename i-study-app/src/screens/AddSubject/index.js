import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { addSubject } from "../../thunks/subject";
import CommonFormGroup from "../common/CommonFormGroup";
import { useNavigate } from "react-router-dom";

const AddSubject = () => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addSubject({ name, code }));
  };

  return (
    <>
      <div className="pagetitle">
        <h1>Add Subject</h1>
        <nav>
          <ol className="breadcrumb">
            <li
              className="breadcrumb-item"
              onClick={() => navigate("../manage_subject")}
            >
              Subject
            </li>

            <li class="breadcrumb-item active">Add Subject</li>
          </ol>
        </nav>
      </div>

      <Card>
        <Card.Body className="pt-3">
          <Form onSubmit={onSubmit}>
            <CommonFormGroup>
              <Form.Label>Subject Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </CommonFormGroup>
            <CommonFormGroup>
              <Form.Label>Subject Code</Form.Label>
              <Form.Control
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </CommonFormGroup>

            <Button type="submit" className="mt-3">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default AddSubject;
