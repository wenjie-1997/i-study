import React, { useEffect, useState } from "react";
import * as topicComponentSelectors from "../../selectors/topicComponent";
import * as submissionSelectors from "../../selectors/submission";
import * as subjectSelectors from "../../selectors/subject";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import {
  getCurrentLocalISOFullString,
  getCurrentLocalISOString,
  getDateDifferenceFromNow,
  getformattedDateTime,
} from "../../utilities/helper";
import SubmissionModal from "./components/SubmissionModal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addSubmission,
  deleteSubmission,
  getSubmission,
  updateSubmission,
} from "../../thunks/submission";

const ViewStudentSubmission = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [subject, setSubject] = useState(null);

  const submission = useSelector((state) => state.submission);
  const selectedSubmission =
    submissionSelectors.getSelectedSubmission(submission);

  useEffect(() => {
    const submissionObj = JSON.parse(localStorage.getItem("submission"));
    setTitle(topicComponentSelectors.getTitle(submissionObj));
    setDescription(topicComponentSelectors.getDescription(submissionObj));
    setDueDate(topicComponentSelectors.getDueDate(submissionObj));
    setSubject(JSON.parse(localStorage.getItem("subject")));
    dispatch(
      getSubmission({
        studentId: parseInt(localStorage.getItem("studentId")),
        submissionId: params.submission_id,
      })
    );
  }, []);

  const onAddSubmission = ({ file }) => {
    dispatch(
      isEditing
        ? updateSubmission({
            studentSubmissionId:
              submissionSelectors.getStudentSubmissionId(selectedSubmission),
            url: submissionSelectors.getUrl(selectedSubmission),
            file,
            submissionDate: getCurrentLocalISOFullString(),
            submissionId: params.submission_id,
            closeSubmissionModal: () => {
              setIsEditing(false);
              setShowSubmissionModal(false);
            },
          })
        : addSubmission({
            file,
            submissionDate: getCurrentLocalISOFullString(),
            submissionId: params.submission_id,
            closeSubmissionModal: () => setShowSubmissionModal(false),
          })
    );
  };

  const onDeleteSubmission = () => {
    if (window.confirm("Are you sure to remove the submission?")) {
      dispatch(
        deleteSubmission({
          ...selectedSubmission,
          submissionId: params.submission_id,
        })
      );
    }
  };

  return (
    <>
      <div className="pagetitle">
        <h1>Submission Page</h1>
        <nav>
          <ol className="breadcrumb">
            <li
              className="breadcrumb-item"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/dashboard")}
            >
              Home
            </li>
            <li
              className="breadcrumb-item"
              style={{ cursor: "pointer" }}
              onClick={() =>
                navigate(
                  "/dashboard/subject/" +
                    subjectSelectors.getClassSubjectId(subject)
                )
              }
            >
              {subjectSelectors.getSubjectName(subject)}
            </li>
            <li className="breadcrumb-item active">{title}</li>
          </ol>
        </nav>
      </div>
      <Card className="card">
        <div className="d-flex flex-row px-3" style={styles.row}>
          <Col xs sm={3}>
            Title
          </Col>
          <Col xs sm={9}>
            {title}
          </Col>
        </div>
        <div className="d-flex flex-row px-3" style={styles.row}>
          <Col xs sm={3}>
            Description
          </Col>
          <Col xs sm={9}>
            {description}
          </Col>
        </div>
        <div className="d-flex flex-row px-3" style={styles.row}>
          <Col xs sm={3}>
            Due date
          </Col>
          <Col xs sm={9}>
            {getformattedDateTime(dueDate)}
          </Col>
        </div>
        <div className="d-flex flex-row px-3" style={styles.row}>
          {!submissionSelectors.getStudentSubmissionId(selectedSubmission) ? (
            <>
              <Col xs sm={3}>
                Time remaining
              </Col>
              <Col xs sm={9}>
                {getDateDifferenceFromNow(dueDate)}
              </Col>
            </>
          ) : (
            <>
              <Col xs sm={3}>
                Submitted On
              </Col>
              <Col xs sm={9}>
                {getformattedDateTime(
                  submissionSelectors.getSubmissionDate(selectedSubmission)
                )}
              </Col>
            </>
          )}
        </div>
        <div className="d-flex flex-row px-3" style={styles.row}>
          <Col xs sm={3}>
            Submission
          </Col>
          <Col xs sm={9}>
            {submissionSelectors.getStudentSubmissionId(selectedSubmission) ? (
              <a
                href={`${
                  process.env.REACT_APP_BACKEND_URL
                }/submission/download?url=${submissionSelectors.getUrl(
                  selectedSubmission
                )}&fileName=${submissionSelectors.getFileName(
                  selectedSubmission
                )}`}
              >
                {submissionSelectors.getFileName(selectedSubmission)}
              </a>
            ) : (
              "No Submission"
            )}
          </Col>
        </div>
      </Card>
      <div style={styles.buttonsDiv}>
        {!submissionSelectors.getStudentSubmissionId(selectedSubmission) ? (
          <Button
            style={styles.button}
            onClick={() => setShowSubmissionModal(true)}
          >
            Add Submission
          </Button>
        ) : (
          <>
            <Button
              style={styles.button}
              onClick={() => {
                setIsEditing(true);
                setShowSubmissionModal(true);
              }}
              variant="success"
            >
              Update Submission
            </Button>
            <Button
              style={styles.button}
              onClick={() => onDeleteSubmission(selectedSubmission)}
              variant="danger"
            >
              Delete Submission
            </Button>
          </>
        )}
      </div>
      <SubmissionModal
        showModal={showSubmissionModal}
        onCloseModal={() => setShowSubmissionModal(false)}
        isEditing={isEditing}
        onAddSubmission={onAddSubmission}
      />
    </>
  );
};

export default ViewStudentSubmission;

const styles = {
  row: {
    height: "60px",
    display: "flex",
    alignItems: "center",
    // backgroundColor: "lightgray",
    border: "1px lightgrey solid",
  },
  buttonsDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "20px",
  },
  button: { margin: "0px 10px" },
};
