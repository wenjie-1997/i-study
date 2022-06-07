import http from "./httpService";
const endpoint = "topic";

export const getTopicList = async ({ classSubjectId }) =>
  await http.get(`${endpoint}`, {
    params: { classSubjectId },
  });

export const addTopic = async ({ name, arrangement, classSubjectId }) =>
  await http.post(`${endpoint}`, {
    name,
    arrangement,
    classSubjectId,
  });

export const updateTopic = async ({ name, arrangement, topicId }) =>
  await http.put(`${endpoint}`, {
    name,
    arrangement,
    topicId,
  });

export const deleteTopic = async ({ topicId }) =>
  await http.delete(`${endpoint}`, {
    data: {
      topicId,
    },
  });

export const addTopicComponent = async (payload) =>
  await http.post(
    `${endpoint}/component`,
    payload,
    payload.componentType === 2 && {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

export const downloadMaterial = async ({ url, fileName }) =>
  await http.post(
    `${endpoint}/download`,
    { url, fileName },
    { responseType: "blob" }
  );

export const updateTopicComponent = async (payload) =>
  await http.put(
    `${endpoint}/component`,
    payload,
    payload.componentType === 2 && {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

export const deleteTopicComponent = async (payload) =>
  await http.delete(`${endpoint}/component`, {
    data: {
      ...payload,
    },
  });
