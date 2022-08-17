import _ from "lodash";

export const getClassList = (state) => _.get(state, "classList", []);
export const getSelectedClass = (state) => _.get(state, "selectedClass", null);
export const getTeacherList = (state) => _.get(state, "teacherList", []);
export const getStudentList = (state) => _.get(state, "studentList", []);
export const getClassSubjectList = (state) =>
  _.get(state, "selectedClassSubjectList", []);
export const getClassStudentList = (state) =>
  _.get(state, "selectedClassStudentList", []);
export const getTimetableSlots = (state) => _.get(state, "timetableSlots", []);
export const getFailedResponse = (state) =>
  _.get(state, "failedResponse", null);

export const getClassId = (state) => _.get(state, "classId", 0);
export const getName = (state) => _.get(state, "name", "");
export const getForm = (state) => _.get(state, "form", "");
export const getClassTeacherName = (state) =>
  _.get(state, "classTeacherName", "-");
export const getClassTeacherId = (state) => _.get(state, "classTeacherId", 0);
export const getYear = (state) => _.get(state, "year", null);

export const getClassSubjectId = (state) => _.get(state, "classSubjectId", 0);
export const getClassStudentId = (state) => _.get(state, "classStudentId", 0);
export const getSubjectName = (state) => _.get(state, "subjectName", "");
export const getTeacherName = (state) => _.get(state, "teacherName", "");
export const getStudentId = (state) => _.get(state, "studentId", 0);
export const getStudentName = (state) => _.get(state, "studentName", "");

export const getUnavailableSlotList = (state) =>
  _.get(state, "unavailableSlotList", []);
export const getCrashedSlotList = (state) =>
  _.get(state, "crashedSlotList", []);
