import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteClassStudent, getClassStudentList } from "../../thunks/class";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import * as classSelectors from "../../selectors/class";
import StudentModal from "./components/StudentModal";
import { addClassStudent } from "../../thunks/class";

const ViewClassStudent = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const classModal = useSelector((state) => state.class);
  const classStudentList = classSelectors.getClassStudentList(classModal);
  const [showStudentModal, setShowStudentModal] = useState(false);

  useEffect(
    () => dispatch(getClassStudentList({ classId: params.class_id })),
    [params, dispatch]
  );

  useEffect(() => setShowStudentModal(false), [classStudentList]);

  const onClickDelete = (classStudentId) => {
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
      <div className="mx-auto my-4 w-75">
        <div className="d-flex flex-row justify-content-between">
          <h3>View Class Student</h3>
          <Button onClick={() => setShowStudentModal(true)}>Add Student</Button>
        </div>
        <Card className="my-2 py-3 px-5 d-flex justtify-content-center">
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Operation</th>
              </tr>
            </thead>
            <tbody>
              {classStudentList.map((student) => (
                <tr key={classSelectors.getStudentId(student)}>
                  <td>{classSelectors.getStudentName(student)}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() =>
                        onClickDelete(classSelectors.getClassStudentId(student))
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
      <StudentModal
        showModal={showStudentModal}
        onCloseModal={() => setShowStudentModal(false)}
        onAddStudent={onAddStudent}
      />
    </>
  );
};

export default ViewClassStudent;
