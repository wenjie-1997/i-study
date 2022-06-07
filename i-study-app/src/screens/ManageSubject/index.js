import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSubject, getSubjectList } from "../../thunks/subject";
import * as subjectSelectors from "../../selectors/subject";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import EditModal from "./components/EditModal";
import { useNavigate } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";

const ManageSubject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const subject = useSelector((state) => state.subject);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const subjectList = subjectSelectors.getSubjectList(subject);

  useEffect(() => dispatch(getSubjectList()), []);
  useEffect(() => setShowEditModal(false), [subjectList]);

  const onClickEdit = (subject) => {
    setShowEditModal(true);
    setEditingSubject(subject);
  };

  const onClickAdd = () => {
    navigate("../add_subject");
  };

  const onClickDelete = (s) => {
    if (
      window.confirm(
        `Are you sure to delete the subject named ${subjectSelectors.getName(
          s
        )}?`
      )
    )
      dispatch(deleteSubject({ subjectId: subjectSelectors.getSubjectId(s) }));
  };

  return (
    <>
      <div className="pagetitle">
        <h1>Manage Subject</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item active">Subject</li>
          </ol>
        </nav>
      </div>

      <Card className="card">
        <Card.Body className="card-body pt-4">
          <div className="d-flex flex-row justify-content-end">
            <div
              className="d-flex flew-row align-items-center justify-content-center"
              style={{ color: "blue", cursor: "pointer" }}
              onClick={onClickAdd}
            >
              <IoAddCircleOutline style={{ margin: "0 8px" }} />
              <b>Add Subject</b>
            </div>
          </div>
          <Table className="my-2" bordered>
            <thead>
              <tr>
                <th className="text-center">Subject Name</th>
                <th className="text-center">Subject Code</th>
                <th className="text-center">Operation</th>
              </tr>
            </thead>
            <tbody>
              {subjectList.map((s) => (
                <tr key={subjectSelectors.getSubjectId(s)}>
                  <td>{subjectSelectors.getName(s)}</td>
                  <td>{subjectSelectors.getCode(s)}</td>
                  <td className="d-flex flex-row justify-content-center">
                    <Button className="mx-2" onClick={() => onClickEdit(s)}>
                      Edit
                    </Button>
                    <Button
                      className="mx-2"
                      variant="danger"
                      onClick={() => onClickDelete(s)}
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
      <EditModal
        showModal={showEditModal}
        onCloseModal={() => setShowEditModal(false)}
        subject={editingSubject}
      />
    </>
  );
};

export default ManageSubject;
