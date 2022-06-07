import http from "./httpService";
const endpoint = "forum";

export const getForumCommentList = async ({ forumId }) =>
  await http.get(`${endpoint}`, { params: { forumId } });

export const addForumComment = async ({
  comment,
  addedDateTime,
  forumId,
  userId,
}) =>
  await http.post(`${endpoint}`, {
    comment,
    addedDateTime,
    forumId,
    userId,
  });

export const updateForumComment = async ({
  comment,
  addedDateTime,
  forumCommentId,
}) => await http.put(`${endpoint}`, { comment, addedDateTime, forumCommentId });

export const deleteForumComment = async ({ forumCommentId }) =>
  await http.delete(`${endpoint}`, {
    data: {
      forumCommentId,
    },
  });
