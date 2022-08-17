import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getHomeworkList } from "../../thunks/submission";
import Table from "react-bootstrap/Table";

import ComponentCard from "../common/ComponentCard";
import * as submissionSelectors from "../../selectors/submission";
import * as topicComponentSelectors from "../../selectors/topicComponent";
import * as subjectSelectors from "../../selectors/subject";
import { getformattedDateTime } from "../../utilities/helper";

const ViewStudentHomework = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submissionModal = useSelector((state) => state.submission);

  useEffect(() => dispatch(getHomeworkList()), []);

  const homeworkList = submissionSelectors.getHomeworkList(submissionModal);
  return (
    <>
      <div className="pagetitle">
        <h1>Homework List</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item active">Homework</li>
          </ol>
        </nav>
      </div>
      <ComponentCard>
        {homeworkList.length !== 0 ? (
          <Table>
            <thead>
              <tr>
                <th>Submission Link</th>
                <th>Subject</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {homeworkList.map((homework) => (
                <tr
                  key={topicComponentSelectors.getSubmissionId(homework)}
                  className="align-middle"
                >
                  <td
                    onClick={() => {
                      localStorage.setItem(
                        "submission",
                        JSON.stringify(homework)
                      );
                      navigate(
                        "/dashboard/submission/" +
                          topicComponentSelectors.getSubmissionId(homework)
                      );
                    }}
                    style={{ color: "blue" }}
                    className="py-3"
                  >
                    <u style={{ cursor: "pointer" }}>
                      {topicComponentSelectors.getTitle(homework)}
                    </u>
                  </td>
                  <td>{subjectSelectors.getSubjectName(homework)}</td>
                  <td>
                    {getformattedDateTime(
                      topicComponentSelectors.getDueDate(homework)
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <i style={{ textAlign: "center", fontSize: "16px", margin: "0px" }}>
            -- Your homework has been completed --
          </i>
        )}
      </ComponentCard>
    </>
  );
};

export default ViewStudentHomework;
