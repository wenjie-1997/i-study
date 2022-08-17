import React from "react";
import Card from "react-bootstrap/Card";

const SubjectCard = ({ subjectName, taughtBy, className, onClick, index }) => {
  return (
    <div className={`col-12 col-sm-6`} onClick={onClick}>
      <Card className="card">
        <div className="card-body">
          <h5 className="card-title">{subjectName}</h5>
          <p style={{ textAlign: "end", margin: 0 }}>{taughtBy || className}</p>
        </div>
      </Card>
    </div>
  );
};

export default SubjectCard;
