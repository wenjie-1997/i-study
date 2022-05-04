import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteClassSubject, getClassSubjectList } from "../../thunks/class";
import * as classSelectors from "../../selectors/class";
import Button from "react-bootstrap/esm/Button";
import AddSubjectModal from "./components/AddSubjectModal";

const ViewClassSubject = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const [showAddSubjectModal, setShowAddSubjectModal] = useState(false);

  const classModal = useSelector((state) => state.class);
  const classSubjectList = classSelectors.getClassSubjectList(classModal);

  useEffect(
    () => dispatch(getClassSubjectList({ classId: params.class_id })),
    [dispatch, params]
  );
  useEffect(() => setShowAddSubjectModal(false), [classSubjectList]);

  const onClickDelete = (classSubjectId) => {
    dispatch(deleteClassSubject({ classSubjectId }));
  };

  return (
    <>
      <div className="mx-auto my-4 w-75">
        <div className="d-flex flex-row justify-content-between">
          <h3>View Class Subject</h3>
          <Button onClick={() => setShowAddSubjectModal(true)}>
            Add Subject
          </Button>
        </div>
        <Card className="my-2 py-3 px-5 d-flex justtify-content-center">
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
                <tr key={classSelectors.getClassSubjectId(subject)}>
                  <td>{classSelectors.getSubjectName(subject)}</td>
                  <td>{classSelectors.getTeacherName(subject)}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() =>
                        onClickDelete(classSelectors.getClassSubjectId(subject))
                      }
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
      <AddSubjectModal
        showModal={showAddSubjectModal}
        onCloseModal={() => setShowAddSubjectModal(false)}
      />
    </>
  );
};

export default ViewClassSubject;
