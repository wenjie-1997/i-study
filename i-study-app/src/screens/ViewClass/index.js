import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { deleteClass, getClass, updateClass } from "../../thunks/class";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as classSelectors from "../../selectors/class";
import EditModal from "./components/EditModal";

const ViewClass = () => {
  let params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);

  const classModal = useSelector((state) => state.class);

  const selectedClass = classSelectors.getSelectedClass(classModal);
  const name = classSelectors.getName(selectedClass);
  const form = classSelectors.getForm(selectedClass);
  const classTeacherName = classSelectors.getClassTeacherName(selectedClass);
  const year = classSelectors.getYear(selectedClass);

  useEffect(() => {
    dispatch(getClass({ classId: params.class_id }));
  }, [dispatch]);

  useEffect(() => setShowEditModal(false), [selectedClass]);

  const onClickEdit = () => setShowEditModal(true);
  const onClickDelete = () =>
    dispatch(deleteClass({ classId: params.class_id }));

  const onSubmitEdit = (data) => {
    dispatch(updateClass({ classId: params.class_id, ...data }));
  };
  return (
    <div className="mx-auto my-4 w-75">
      <Row>
        <Col>
          <h3>View Class</h3>
        </Col>
        <Col xs sm="auto">
          <Button variant="success" onClick={onClickEdit}>
            Edit
          </Button>
        </Col>
        <Col xs sm="auto">
          <Button variant="danger" onClick={onClickDelete}>
            Delete
          </Button>
        </Col>
      </Row>

      <Card className="my-2 py-3 px-5 d-flex justtify-content-center">
        <Row>
          <Col xs sm={4}>
            Class Name
          </Col>
          <Col>{name}</Col>
        </Row>
        <Row>
          <Col xs sm={4}>
            Class Form
          </Col>
          <Col>{form}</Col>
        </Row>
        <Row>
          <Col xs sm={4}>
            Class Teacher
          </Col>
          <Col>{classTeacherName}</Col>
        </Row>
        <Row>
          <Col xs sm={4}>
            Year
          </Col>
          <Col>{year}</Col>
        </Row>
        <u
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate("../view_class/subject/" + params.class_id)}
        >
          <i>View Subject</i>
        </u>
        <u
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate("../view_class/student/" + params.class_id)}
        >
          <i>View Student</i>
        </u>
        <u
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate("../view_class/timetable/" + params.class_id)}
        >
          <i>View Timetable</i>
        </u>
      </Card>
      <EditModal
        showModal={showEditModal}
        onCloseModal={() => setShowEditModal(false)}
        onSubmitEdit={onSubmitEdit}
        selectedClass={selectedClass}
      />
    </div>
  );
};

export default ViewClass;
