import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { addSubject } from "../../thunks/subject";

const AddSubject = () => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addSubject({ name, code }));
  };

  return (
    <div className="mx-auto my-4 w-75">
      <h3>Add Class</h3>
      <Card className="py-5 px-5 justify-content-flex-start">
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>Subject Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Subject Code</Form.Label>
            <Form.Control
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </Form.Group>

          <Button type="submit" className="mt-3">
            Submit
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default AddSubject;
