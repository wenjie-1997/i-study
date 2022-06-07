import http from "./httpService";
const endpoint = "teacher";

export const updateTeacherProfile = async ({
  teacherId,
  name,
  birthday,
  gender,
  race,
  religion,
  address,
  telNo,
  hpNo,
  email,
  workSince,
  officeNo,
  education,
  grade,
}) => {
  return await http.put(`${endpoint}`, {
    teacherId,
    birthday,
    gender,
    race,
    religion,
    name,
    address,
    telNo,
    hpNo,
    email,
    workSince,
    officeNo,
    education,
    grade,
  });
};

export const searchTeacherByName = async ({ searchText }) =>
  await http.get(`${endpoint}/search_by_name`, {
    params: { searchText },
  });

export const getTeacherTimetable = async ({ teacherId }) =>
  await http.get(`${endpoint}/timetable`, {
    params: { teacherId },
  });

export const getTeacherSubjectList = async ({ teacherId }) =>
  await http.get(`${endpoint}/subject`, {
    params: { teacherId },
  });
