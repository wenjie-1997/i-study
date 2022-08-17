import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteClassStudent, getClassStudentList } from "../../thunks/class";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import * as classSelectors from "../../selectors/class";
import StudentModal from "./components/StudentModal";
import { addClassStudent } from "../../thunks/class";
import { IoAddCircleOutline } from "react-icons/io5";

const ViewClassStudent = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classModal = useSelector((state) => state.class);
  const classStudentList = classSelectors.getClassStudentList(classModal);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [className, setClassName] = useState("");

  useEffect(() => {
    const classObj = JSON.parse(localStorage.getItem("class"));
    setClassName(classSelectors.getName(classObj));
    dispatch(getClassStudentList({ classId: params.class_id }));
  }, []);

  useEffect(() => setShowStudentModal(false), [classStudentList]);

  const onClickDelete = (name, classStudentId) => {
    if (
      window.confirm(`Are you sure you want to remove student named ${name}?`)
    )
      dispatch(deleteClassStudent({ classStudentId }));
  };

  const onAddStudent = (student) => {
    dispatch(
      addClassStudent({
        classId: params.class_id,
        studentId: student.studentId,
      })
    );
  };

  return (
    <>
      <div className="pagetitle">
        <h1>View Class Subject</h1>
        <nav>
          <ol className="breadcrumb">
            <li
              className="breadcrumb-item"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/dashboard/manage_class")}
            >
              Class
            </li>
            <li
              className="breadcrumb-item"
              style={{ cursor: "pointer" }}
              onClick={() =>
                navigate("/dashboard/view_class/" + params.class_id)
              }
            >
              {className}
            </li>
            <li className="breadcrumb-item active">Class Student</li>
          </ol>
        </nav>
      </div>

      <Card>
        <Card.Body className="pt-4">
          <div className="d-flex flex-row justify-content-end">
            <div
              className="d-flex flew-row align-items-center justify-content-center"
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => setShowStudentModal(true)}
            >
              <IoAddCircleOutline style={{ margin: "0 8px" }} />
              <b>Add Student</b>
            </div>
          </div>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Operation</th>
              </tr>
            </thead>
            <tbody>
              {classStudentList.map((student) => (
                <tr
                  key={classSelectors.getStudentId(student)}
                  className="align-middle"
                >
                  <td>{classSelectors.getStudentName(student)}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() =>
                        onClickDelete(
                          classSelectors.getStudentName(student),
                          classSelectors.getClassStudentId(student)
                        )
                      }
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <StudentModal
        showModal={showStudentModal}
        onCloseModal={() => setShowStudentModal(false)}
        onAddStudent={onAddStudent}
      />
    </>
  );
};

export default ViewClassStudent;
