import _ from "lodash";

export const getSubjectList = (state) => _.get(state, "subjectList", []);
export const getSubject = (state) => _.get(state, "subject", null);

export const getSubjectId = (state) => _.get(state, "subjectId", 0);
export const getName = (state) => _.get(state, "name", "");
export const getCode = (state) => _.get(state, "code", "");
export const getSubjectName = (state) => _.get(state, "subjectName", "");
export const getSubjectCode = (state) => _.get(state, "subjectCode", "");
