import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { getReportSummary } from "../../thunks/teacher";
import _ from "lodash";
import CommonFormGroup from "../common/CommonFormGroup";
import CustomPieChart from "./component/CustomPieChart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ViewTeacherReport = () => {
  const dispatch = useDispatch();
  const [classSubjectList, setClassSubjectList] = useState([]);
  const [selectedClassSubject, setSelectedClassSubject] = useState("");
  const teacherModal = useSelector((state) => state.teacher);
  const report = teacherModal.report;

  useEffect(() => dispatch(getReportSummary()), []);
  useEffect(() => {
    var list = [];
    _.reduce(
      report,
      (prevArr, element) => {
        if (
          prevArr.findIndex(
            (e) => e.class_subject_id === element.class_subject_id
          ) === -1
        ) {
          prevArr.push({
            class_subject_id: element.class_subject_id,
            subject_name: element.subject_name,
            class_name: element.class_name,
          });
        }
        return prevArr;
      },
      list
    );

    setClassSubjectList(list);
  }, [report]);

  const displayedSummaryReport = report.filter(
    (reportElement) =>
      reportElement.class_subject_id === parseInt(selectedClassSubject)
  );
  const totalForum = displayedSummaryReport.reduce((prev, element) => {
    if (element.component_type === 3) return prev + 1;
    return prev;
  }, 0);

  const totalSubmission = displayedSummaryReport.reduce((prev, element) => {
    if (element.component_type === 4) return prev + 1;
    return prev;
  }, 0);

  const overallForumPercentages = [
    {
      name: "Attended",
      value:
        displayedSummaryReport.reduce((prev, element) => {
          if (element.component_type === 3)
            return prev + element.attended_percentage;
          return prev;
        }, 0) / totalForum,
    },
    {
      name: "Unattended",
      value:
        displayedSummaryReport.reduce((prev, element) => {
          if (element.component_type === 3)
            return prev + element.unattended_percentage;
          return prev;
        }, 0) / totalForum,
    },
  ];
  const overallSubmissionPercentages = [
    {
      name: "Submitted",
      value:
        displayedSummaryReport.reduce((prev, element) => {
          if (element.component_type === 4)
            return prev + element.submitted_percentage;
          return prev;
        }, 0) / totalSubmission,
    },
    {
      name: "Overdued",
      value:
        displayedSummaryReport.reduce((prev, element) => {
          if (element.component_type === 4)
            return prev + element.overdue_percentage;
          return prev;
        }, 0) / totalSubmission,
    },
    {
      name: "Imcomplete",
      value:
        displayedSummaryReport.reduce((prev, element) => {
          if (element.component_type === 4)
            return prev + element.imcomplete_percentage;
          return prev;
        }, 0) / totalSubmission,
    },
  ];

  const subjectObj = classSubjectList.find(
    (classSubject) =>
      classSubject.class_subject_id === parseInt(selectedClassSubject)
  );
  return (
    <>
      <div className="pagetitle">
        <h1>Report Summary</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item active">Report</li>
          </ol>
        </nav>
      </div>
      <Card>
        <Card.Body className="pt-3">
          <CommonFormGroup>
            <Form.Select
              value={selectedClassSubject}
              onChange={(e) => setSelectedClassSubject(e.target.value)}
            >
              <option value="">-- Select Class Subject --</option>
              {classSubjectList.map((classSubject) => (
                <option
                  key={classSubject.class_subject_id}
                  value={classSubject.class_subject_id}
                >
                  {classSubject.subject_name} - {classSubject.class_name}
                </option>
              ))}
            </Form.Select>
          </CommonFormGroup>
          {selectedClassSubject !== "" && (
            <>
              <h4 className="pt-2 pb-3 my-0">
                <b>
                  Summary for {subjectObj?.subject_name} -{" "}
                  {subjectObj?.class_name}
                </b>
              </h4>
              <div className="row">
                <div className="col">
                  <div className="d-flex flex-column align-items-center">
                    <h5 className="m-0 p-0">
                      <b>Overall Forum Participation</b>
                    </h5>
                    <CustomPieChart data={overallForumPercentages} />
                  </div>
                </div>
                <div className="col">
                  <div className="d-flex flex-column align-items-center">
                    <h5 className="m-0 p-0">
                      <b>Overall Submission Participation</b>
                    </h5>
                    <CustomPieChart data={overallSubmissionPercentages} />
                  </div>
                </div>
              </div>
              <h5 className="m-0 py-3">
                <b>Detailed Forum Participation</b>
              </h5>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart
                  data={displayedSummaryReport.filter(
                    (report) => report.component_type === 3
                  )}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="forum_title"
                    tick={{
                      dominantBaseline: "ideographic",
                      fontSize: 14,
                    }}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="attended_percentage"
                    stackId="a"
                    fill="lime"
                    maxBarSize={55}
                  />
                  <Bar
                    dataKey="unattended_percentage"
                    stackId="a"
                    fill="firebrick"
                    maxBarSize={55}
                  />
                </BarChart>
              </ResponsiveContainer>
              <h5 className="m-0 py-3">
                <b>Detailed Submission Participation</b>
              </h5>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart
                  data={displayedSummaryReport.filter(
                    (report) => report.component_type === 4
                  )}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="submission_title"
                    tick={{
                      dominantBaseline: "ideographic",
                      fontSize: 14,
                    }}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="submitted_percentage"
                    stackId="a"
                    fill="lime"
                    maxBarSize={55}
                  />
                  <Bar
                    dataKey="overdue_percentage"
                    stackId="a"
                    fill="firebrick"
                    maxBarSize={55}
                  />
                  <Bar
                    dataKey="imcomplete_percentage"
                    stackId="a"
                    fill="grey"
                    maxBarSize={55}
                  />
                </BarChart>
              </ResponsiveContainer>
            </>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default ViewTeacherReport;
