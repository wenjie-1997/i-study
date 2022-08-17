import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
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
  const onClickDelete = () => {
    if (window.confirm("Do you want to delete this class?"))
      dispatch(deleteClass({ classId: params.class_id }));
  };

  const onSubmitEdit = (data) => {
    dispatch(updateClass({ classId: params.class_id, ...data }));
  };
  return (
    <>
      <div className="pagetitle">
        <h1>View Class</h1>
        <nav>
          <ol className="breadcrumb">
            <li
              className="breadcrumb-item"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/dashboard/manage_class")}
            >
              Class
            </li>
            <li className="breadcrumb-item active">{name}</li>
          </ol>
        </nav>
      </div>

      <Card>
        <Card.Body className="pt-4">
          <div
            style={{ position: "absolute", right: 10, top: -45 }}
            className="d-flex flex-row"
          >
            <Button variant="success" onClick={onClickEdit} className="me-2">
              Edit
            </Button>
            <Button variant="danger" onClick={onClickDelete}>
              Delete
            </Button>
          </div>
          <div className="d-flex flex-row px-3" style={styles.row}>
            <Col xs sm={4}>
              Class Name
            </Col>
            <Col>{name}</Col>
          </div>
          <div className="d-flex flex-row px-3" style={styles.row}>
            <Col xs sm={4}>
              Class Form
            </Col>
            <Col>{form}</Col>
          </div>
          <div className="d-flex flex-row px-3" style={styles.row}>
            <Col xs sm={4}>
              Class Teacher
            </Col>
            <Col>{classTeacherName}</Col>
          </div>
          <div className="d-flex flex-row px-3" style={styles.row}>
            <Col xs sm={4}>
              Year
            </Col>
            <Col>{year}</Col>
          </div>
          <div className="d-flex flex-row px-3" style={styles.row}>
            <Col xs sm={4}>
              Operation
            </Col>
            <Col>
              <u
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() =>
                  navigate("../view_class/subject/" + params.class_id)
                }
              >
                <i>View Subject</i>
              </u>
              <br />
              <u
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() =>
                  navigate("../view_class/student/" + params.class_id)
                }
              >
                <i>View Student</i>
              </u>
              <br />
              <u
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() =>
                  navigate("../view_class/timetable/" + params.class_id)
                }
              >
                <i>View Timetable</i>
              </u>
              <br />
            </Col>
          </div>
        </Card.Body>
      </Card>
      <EditModal
        showModal={showEditModal}
        onCloseModal={() => setShowEditModal(false)}
        onSubmitEdit={onSubmitEdit}
        selectedClass={selectedClass}
      />
    </>
  );
};

export default ViewClass;
const styles = {
  row: {
    minHeight: "60px",
    display: "flex",
    alignItems: "center",
    // backgroundColor: "lightgray",
    border: "1px lightgrey solid",
  },
};
