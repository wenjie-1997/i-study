import http from "./httpService";
const endpoint = "notification";

export const getNotificationList = async ({ studentId }) =>
  await http.get(`${endpoint}`, { params: { studentId } });

export const setNotificationListIsOpened = async (payload) =>
  await http.put(`${endpoint}`, payload);
