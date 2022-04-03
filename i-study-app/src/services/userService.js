import http from "./httpService";
const endpoint = "user";

export const login = async (username, password) =>
  await http.post(`${endpoint}/login`, {
    username,
    password,
  });

export const verifyToken = async () =>
  await http.post(`${endpoint}/verify_token`);

export const getUserInfo = async () => await http.get(`${endpoint}/`);

export const getUserList = async () => await http.get(`${endpoint}/get_users`);

export const registerStudent = async ({
  username,
  password,
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
  await http.post(`${endpoint}/register_student`, {
    username,
    password,
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

export const registerTeacher = async ({
  username,
  password,
  name,
  birthday,
  gender,
  race,
  religion,
  address,
  telNo: tel_no,
  hpNo: hp_no,
  email,
  workSince: work_since,
  officeNo: office_no,
  education,
  grade,
}) =>
  await http.post(`${endpoint}/register_teacher`, {
    username,
    password,
    name,
    birthday,
    gender,
    race,
    religion,
    address,
    tel_no,
    hp_no,
    email,
    work_since,
    office_no,
    education,
    grade,
  });

export const deleteUser = async ({ userId }) =>
  await http.delete(`${endpoint}`, { data: { user_id: userId } });
