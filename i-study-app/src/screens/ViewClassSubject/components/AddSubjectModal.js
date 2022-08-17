import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { getSubjectList } from "../../../thunks/subject";
import * as subjectSelectors from "../../../selectors/subject";
import * as classSelectors from "../../../selectors/class";
import * as userSelectors from "../../../selectors/user";
import InputGroup from "react-bootstrap/InputGroup";
import TeacherModal from "./TeacherModal";
import { addClassSubject } from "../../../thunks/class";
import { useParams } from "react-router-dom";
import CommonFormGroup from "../../common/CommonFormGroup";

const AddSubjectModal = ({ showModal, onCloseModal }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const [subjectId, setSubjectId] = useState("");

  const [teacherName, setTeacherName] = useState("");
  const [teacherId, setTeacherId] = useState(0);
  const [showTeacherModal, setShowTeacherModal] = useState(false);
  useEffect(() => dispatch(getSubjectList()), [dispatch]);

  useEffect(() => {
    if (!showModal) {
      setSubjectId("");
      setTeacherName("");
      setTeacherId(0);
    }
  }, [dispatch, showModal]);

  const subjectModal = useSelector((state) => state.subject);
  const subjectList = subjectSelectors.getSubjectList(subjectModal);

  const onConfirmClassTeacher = (teacher) => {
    setShowTeacherModal(false);
    setTeacherName(classSelectors.getName(teacher));
    setTeacherId(userSelectors.getTeacherId(teacher));
  };

  const getIsSubmitDisabled = () => !teacherId || !subjectId;

  const onSubmitSubject = (e) => {
    e.preventDefault();
    dispatch(
      addClassSubject({ classId: params.class_id, subjectId, teacherId })
    );
  };
  return (
    <>
      <Modal show={showModal} scrollable>
        <form onSubmit={onSubmitSubject}>
          <Modal.Header>Add Class Subject</Modal.Header>
          <Modal.Body>
            <CommonFormGroup>
              <Form.Label>Subject</Form.Label>
              <Form.Select
                value={subjectId}
                onChange={(e) => setSubjectId(parseInt(e.target.value)) || ""}
              >
                <option value="">--Please Select Subject--</option>
                {subjectList.map((subject) => (
                  <option
                    key={subjectSelectors.getSubjectId(subject)}
                    value={subjectSelectors.getSubjectId(subject)}
                  >
                    {subjectSelectors.getName(subject)}
                  </option>
                ))}
              </Form.Select>
            </CommonFormGroup>
            <CommonFormGroup>
              <Form.Label>Taught By</Form.Label>
              {teacherId ? (
                <InputGroup>
                  <Form.Control type="text" value={teacherName} readOnly />
                  <Button onClick={() => setShowTeacherModal(true)}>
                    Change
                  </Button>
                </InputGroup>
              ) : (
                <Button
                  onClick={() => setShowTeacherModal(true)}
                  className="mx-2"
                >
                  Select
                </Button>
              )}
            </CommonFormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onCloseModal}>
              Close
            </Button>
            <Button disabled={getIsSubmitDisabled()} type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
      <TeacherModal
        showModal={showTeacherModal}
        onCloseModal={() => setShowTeacherModal(false)}
        onConfirmClassTeacher={onConfirmClassTeacher}
      />
    </>
  );
};

export default AddSubjectModal;
