import http from "./httpService";
const endpoint = "student";

export const updateStudentProfile = async ({
  studentId,
  username,
  name,
  birthday,
  gender,
  race,
  religion,
  address,
  telNo,
  hpNo,
  email,
  schoolId,
  disability,
}) =>
  await http.put(`${endpoint}`, {
    studentId,
    username,
    name,
    birthday,
    gender,
    race,
    religion,
    address,
    telNo,
    hpNo,
    email,
    schoolId,
    disability,
  });

export const searchStudentByName = async ({ searchText }) =>
  await http.get(`${endpoint}/search_by_name`, {
    params: { searchText },
  });

export const getStudentTimetable = async ({ studentId }) =>
  await http.get(`${endpoint}/timetable`, {
    params: { studentId },
  });

export const getStudentSubjectList = async ({ studentId }) =>
  await http.get(`${endpoint}/subject`, {
    params: { studentId },
  });
