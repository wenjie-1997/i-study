import http from "./httpService";
const endpoint = "student";

export const updateStudentProfile = async ({
  studentId: student_id,
  username,
  name,
  birthday,
  gender,
  race,
  religion,
  address,
  telNo: tel_no,
  hpNo: hp_no,
  email,
  schoolId: school_id,
  disability,
}) =>
  await http.put(`${endpoint}`, {
    student_id,
    username,
    name,
    birthday,
    gender,
    race,
    religion,
    address,
    tel_no,
    hp_no,
    email,
    school_id,
    disability,
  });
