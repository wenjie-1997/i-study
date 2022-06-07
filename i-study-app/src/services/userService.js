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

export const getUserList = async (payload) =>
  await http.get(`${endpoint}/get_users`, { params: payload });

export const registerStudent = async ({
  username,
  password,
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
  await http.post(`${endpoint}/register_student`, {
    username,
    password,
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

export const registerTeacher = async ({
  username,
  password,
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
    telNo,
    hpNo,
    email,
    workSince,
    officeNo,
    education,
    grade,
  });

export const deleteUser = async ({ userId }) =>
  await http.delete(`${endpoint}`, { data: { user_id: userId } });

export const changePassword = async ({ username, oldPassword, newPassword }) =>
  await http.post(`${endpoint}/change_password`, {
    username,
    oldPassword,
    newPassword,
  });
