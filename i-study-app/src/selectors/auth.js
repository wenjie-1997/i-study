import _ from "lodash";

export const getIsLoginFailed = (state) => _.get(state, "isLoginFailed", false);
export const getUsername = (state) => _.get(state, "username", "");
export const getUserType = (state) => _.get(state, "userType", false);
export const getStudentId = (state) => _.get(state, "studentId", 0);
export const getTeacherId = (state) => _.get(state, "teacherId", 0);
