import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSubject, getSubjectList } from "../../thunks/subject";
import * as subjectSelectors from "../../selectors/subject";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import EditModal from "./components/EditModal";
import { useNavigate } from "react-router-dom";

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
    dispatch(deleteSubject({ subjectId: subjectSelectors.getSubjectId(s) }));
  };

  return (
    <>
      <div className="mx-auto my-4 w-75">
        <div className="d-flex flex-row justify-content-between">
          <h3>Manage Subject</h3>
          <Button onClick={onClickAdd}>Add Subject</Button>
        </div>
        <Card className="py-5 px-5 justify-content-flex-start">
          <Table>
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
        </Card>
      </div>
      <EditModal
        showModal={showEditModal}
        onCloseModal={() => setShowEditModal(false)}
        subject={editingSubject}
      />
    </>
  );
};

export default ManageSubject;
