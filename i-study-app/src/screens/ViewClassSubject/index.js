import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteClassSubject, getClassSubjectList } from "../../thunks/class";
import * as classSelectors from "../../selectors/class";
import Button from "react-bootstrap/esm/Button";
import AddSubjectModal from "./components/AddSubjectModal";
import { IoAddCircleOutline } from "react-icons/io5";

const ViewClassSubject = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showAddSubjectModal, setShowAddSubjectModal] = useState(false);
  const [className, setClassName] = useState("");

  const classModal = useSelector((state) => state.class);
  const classSubjectList = classSelectors.getClassSubjectList(classModal);

  useEffect(() => {
    const classObj = JSON.parse(localStorage.getItem("class"));
    setClassName(classSelectors.getName(classObj));
    dispatch(getClassSubjectList({ classId: params.class_id }));
  }, []);
  useEffect(() => setShowAddSubjectModal(false), [classSubjectList]);

  const onClickDelete = (name, classSubjectId) => {
    if (
      window.confirm(
        `Are you sure you want to remove the subject named ${name}?`
      )
    )
      dispatch(deleteClassSubject({ classSubjectId }));
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
            <li className="breadcrumb-item active">Class Subject</li>
          </ol>
        </nav>
      </div>

      <Card>
        <Card.Body className="card-body pt-4">
          <div className="d-flex flex-row justify-content-end">
            <div
              className="d-flex flew-row align-items-center justify-content-center"
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => setShowAddSubjectModal(true)}
            >
              <IoAddCircleOutline style={{ margin: "0 8px" }} />
              <b>Add Subject</b>
            </div>
          </div>
          <Table>
            <thead>
              <tr>
                <th>Subject Name</th>
                <th>Taught By</th>
                <th>Operation</th>
              </tr>
            </thead>
            <tbody>
              {classSubjectList.map((subject) => (
                <tr
                  key={classSelectors.getClassSubjectId(subject)}
                  className="align-middle"
                >
                  <td>{classSelectors.getSubjectName(subject)}</td>
                  <td>{classSelectors.getTeacherName(subject)}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() =>
                        onClickDelete(
                          classSelectors.getSubjectName(subject),
                          classSelectors.getClassSubjectId(subject)
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
      <AddSubjectModal
        showModal={showAddSubjectModal}
        onCloseModal={() => setShowAddSubjectModal(false)}
      />
    </>
  );
};

export default ViewClassSubject;
