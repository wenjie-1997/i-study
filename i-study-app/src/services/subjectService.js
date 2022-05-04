import http from "./httpService";
const endpoint = "subject";

export const getSubjectList = async () => await http.get(`${endpoint}`);

export const getSubject = async ({ subjectId }) =>
  await http.get(`${endpoint}`, { params: { subject_id: subjectId } });

export const addSubject = async ({ name, code }) =>
  await http.post(`${endpoint}`, {
    name,
    code,
  });

export const updateSubject = async ({ subjectId, name, code }) =>
  await http.put(`${endpoint}`, {
    subjectId,
    name,
    code,
  });

export const deleteSubject = async ({ subjectId }) =>
  await http.delete(`${endpoint}`, { data: { subjectId } });
