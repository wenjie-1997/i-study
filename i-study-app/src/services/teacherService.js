import http from "./httpService";
const endpoint = "teacher";

export const updateTeacherProfile = async ({
  teacherId: teacher_id,
  address,
  telNo: tel_no,
  hpNo: hp_no,
  email,
}) => {
  return await http.put(`${endpoint}`, {
    teacher_id,
    address,
    tel_no,
    hp_no,
    email,
  });
};
