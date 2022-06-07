import React from "react";
import Card from "react-bootstrap/Card";

const ComponentCard = (props) => {
  const { children } = props;
  return (
    <Card className="py-4 px-5 justify-content-flex-start" {...props}>
      {children}
    </Card>
  );
};

export default ComponentCard;
