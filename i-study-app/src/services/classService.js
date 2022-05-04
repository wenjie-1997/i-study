import http from "./httpService";
const endpoint = "class";

export const getClassList = async () => await http.get(`${endpoint}`);

export const getClass = async ({ classId }) =>
  await http.get(`${endpoint}`, { params: { classId } });

export const addClass = async ({ name, form, teacherId }) =>
  await http.post(`${endpoint}`, {
    name,
    form,
    teacherId,
    year: new Date().getFullYear(),
  });

export const updateClass = async ({ classId, name, form, teacherId }) =>
  await http.put(`${endpoint}`, {
    classId,
    name,
    form,
    teacherId,
  });

export const deleteClass = async ({ classId }) =>
  await http.delete(`${endpoint}`, { data: { classId } });

export const getClassSubjectList = async ({ classId }) =>
  await http.get(`${endpoint}/subject`, { params: { classId } });

export const addClassSubject = async ({ classId, subjectId, teacherId }) =>
  await http.post(`${endpoint}/subject`, {
    classId,
    subjectId,
    teacherId,
  });

export const deleteClassSubject = async ({ classSubjectId }) =>
  await http.delete(`${endpoint}/subject`, { data: { classSubjectId } });

export const getClassStudentList = async ({ classId }) =>
  await http.get(`${endpoint}/student`, { params: { classId } });

export const addClassStudent = async ({ classId, studentId }) =>
  await http.post(`${endpoint}/student`, {
    classId,
    studentId,
  });

export const deleteClassStudent = async ({ classStudentId }) =>
  await http.delete(`${endpoint}/student`, { data: { classStudentId } });

export const getClassTimetable = async ({ classId }) =>
  await http.get(`${endpoint}/timetable`, { params: { class_id: classId } });

export const updateClassTimetable = async ({ classId, timetableSlots }) =>
  await http.put(
    `${endpoint}/timetable`,
    { timetableSlots },
    { params: { class_id: classId } }
  );
