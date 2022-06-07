import _ from "lodash";

export const getTopicList = (state) => _.get(state, "topicList", []);

export const getName = (state) => _.get(state, "name", "");
export const getTopicId = (state) => _.get(state, "topicId", 0);
export const getArrangement = (state) => _.get(state, "arrangement", 0);
export const getTopicComponentList = (state) =>
  _.get(state, "topicComponentList", 0);
