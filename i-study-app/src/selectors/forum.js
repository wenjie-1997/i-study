import _ from "lodash";

export const getForumCommentList = (state) =>
  _.get(state, "forumCommentList", []);

export const getForumCommentId = (state) => _.get(state, "forumCommentId", 0);
export const getComment = (state) => _.get(state, "comment", "");
export const getAddedDateTime = (state) => _.get(state, "addedDateTime", "");
