import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { getStudentSubmissionList } from "../../thunks/submission";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { getformattedDateTime } from "../../utilities/helper";
import * as topicComponentSelectors from "../../selectors/topicComponent";
import * as submissionSelectors from "../../selectors/submission";
import * as userSelectors from "../../selectors/user";
import * as subjectSelectors from "../../selectors/subject";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import CommonFormGroup from "../common/CommonFormGroup";

const ViewTeacherSubmission = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submissionModal = useSelector((state) => state.submission);

  const [title, setTitle] = useState("");
  const [searchText, setSearchText] = useState("");
  const [description, setDescription] = useState("");
  const [submissionType, setSubmissionType] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [subject, setSubject] = useState(null);
  const [displayedSubmissionList, setDisplayedSubmissionList] = useState([]);
  const submissionList = submissionSelectors.getSubmissionList(submissionModal);

  useEffect(() => {
    const submissionObj = JSON.parse(localStorage.getItem("submission"));
    setTitle(topicComponentSelectors.getTitle(submissionObj));
    setDescription(topicComponentSelectors.getDescription(submissionObj));
    setDueDate(topicComponentSelectors.getDueDate(submissionObj));
    setSubject(JSON.parse(localStorage.getItem("subject")));
    dispatch(
      getStudentSubmissionList({
        submissionId: topicComponentSelectors.getSubmissionId(submissionObj),
      })
    );
  }, []);

  useEffect(() => {
    setSearchText("");
    setSubmissionType("");
    setDisplayedSubmissionList(submissionList);
  }, [submissionList]);

  useEffect(() => {
    let filteredSubmissionList = submissionList.filter((submission) =>
      submissionType === ""
        ? true
        : submissionType === "Submitted"
        ? !!submissionSelectors.getStudentSubmissionId(submission)
        : !submissionSelectors.getStudentSubmissionId(submission)
    );
    setDisplayedSubmissionList(filteredSubmissionList);
  }, [submissionType]);

  return (
    <>
      <div class="pagetitle">
        <h1>Submission Page</h1>
        <nav>
          <ol class="breadcrumb">
            <li
              class="breadcrumb-item"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/dashboard")}
            >
              Home
            </li>
            <li
              class="breadcrumb-item"
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
            <li class="breadcrumb-item active">{title}</li>
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
      </Card>
      <Card className="card  pt-4">
        <Card.Body>
          <div className="d-flex justify-content-between">
            <div>
              <Form.Control
                type="text"
                placeholder="Search.."
                style={{ width: "400px" }}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <CommonFormGroup as={Row} className="d-flex align-items-center">
              <Col>Filter:</Col>
              <Col lg="auto">
                <Form.Select
                  value={submissionType}
                  onChange={(e) => setSubmissionType(e.target.value)}
                >
                  <option value="">All Student</option>
                  <option value="Submitted">Submitted</option>
                  <option value="Incomplete">Incomplete</option>
                </Form.Select>
              </Col>
            </CommonFormGroup>
          </div>
          <Table className="my-2">
            <thead>
              <tr style={{ textAlign: "center" }}>
                <th>Student Name</th>
                <th>Status</th>
                <th>Submission Date</th>
                <th>View Submission</th>
              </tr>
            </thead>
            <tbody>
              {displayedSubmissionList
                .filter((submission) =>
                  userSelectors
                    .getName(submission)
                    .toLowerCase()
                    .includes(searchText)
                )
                .map((studentSubmission) => (
                  <tr
                    key={userSelectors.getStudentId(studentSubmission)}
                    style={{ textAlign: "center", verticalAlign: "middle" }}
                  >
                    <td className="py-2">
                      {userSelectors.getName(studentSubmission)}
                    </td>
                    <td
                      style={{
                        color: submissionSelectors.getStudentSubmissionId(
                          studentSubmission
                        )
                          ? "teal"
                          : "red",
                      }}
                    >
                      {submissionSelectors.getStudentSubmissionId(
                        studentSubmission
                      )
                        ? "Submitted"
                        : "Imcomplete"}
                    </td>
                    <td>
                      {submissionSelectors.getSubmissionDate(studentSubmission)
                        ? getformattedDateTime(
                            submissionSelectors.getSubmissionDate(
                              studentSubmission
                            )
                          )
                        : "-"}
                    </td>
                    <td>
                      {submissionSelectors.getStudentSubmissionId(
                        studentSubmission
                      ) ? (
                        <a
                          href={`http://localhost:8000/submission/download?url=${submissionSelectors.getUrl(
                            studentSubmission
                          )}&fileName=${submissionSelectors.getFileName(
                            studentSubmission
                          )}`}
                        >
                          <Button>Download</Button>
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
};

export default ViewTeacherSubmission;

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
    marginTop: "10px",
  },
  button: { margin: "0px 10px" },
};
