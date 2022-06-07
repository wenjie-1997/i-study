import React from "react";
import Form from "react-bootstrap/Form";

const CommonFormGroup = (props) => {
  const { children } = props;
  return (
    <Form.Group style={{ marginBottom: "15px" }} {...props}>
      {children}
    </Form.Group>
  );
};

export default CommonFormGroup;
