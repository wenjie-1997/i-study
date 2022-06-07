import http from "./httpService";
const endpoint = "submission";

export const getStudentSubmissionList = async ({ submissionId }) =>
  await http.get(`${endpoint}/bySubmissionId`, { params: { submissionId } });

export const getSubmission = async ({ studentId, submissionId }) =>
  await http.get(`${endpoint}`, { params: { studentId, submissionId } });

export const addSubmission = async (payload) =>
  await http.post(`${endpoint}`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateSubmission = async (payload) =>
  await http.put(`${endpoint}`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteSubmission = async ({ studentSubmissionId, url }) =>
  await http.delete(`${endpoint}`, {
    data: {
      studentSubmissionId,
      url,
    },
  });

export const getHomeworkList = async ({ studentId }) =>
  await http.get(`${endpoint}/homework`, { params: { studentId } });
