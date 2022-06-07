import _ from "lodash";

export const getSubmissionList = (state) => _.get(state, "submissionList", []);
export const getHomeworkList = (state) => _.get(state, "homeworkList", []);
export const getSelectedSubmission = (state) =>
  _.get(state, "selectedSubmission", {});

export const getSubmissionDate = (state) => _.get(state, "submissionDate", "");
export const getUrl = (state) => _.get(state, "url", "");
export const getFileName = (state) => _.get(state, "fileName", "");
export const getStudentSubmissionId = (state) =>
  _.get(state, "studentSubmissionId", 0);
