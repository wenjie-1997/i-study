import _ from "lodash";

export const getTopicComponentId = (state) =>
  _.get(state, "topicComponentId", 0);

//rich text
export const getComponentType = (state) => _.get(state, "componentType", 0);
export const getRichTextId = (state) => _.get(state, "richTextId", "");
export const getcontent = (state) => _.get(state, "content", 0);

//material
export const getMaterialId = (state) => _.get(state, "materialId", 0);
export const getUrl = (state) => _.get(state, "url", "");
export const getFileName = (state) => _.get(state, "fileName", "");

//forum
export const getForumId = (state) => _.get(state, "forumId", 0);
export const getComment = (state) => _.get(state, "comment", "");
export const getAddedDateTime = (state) => _.get(state, "addedDateTime", "");

//submission
export const getSubmissionId = (state) => _.get(state, "submissionId", 0);
export const getTitle = (state) => _.get(state, "title", "");
export const getDescription = (state) => _.get(state, "description", "");
export const getDueDate = (state) => _.get(state, "dueDate", "");
