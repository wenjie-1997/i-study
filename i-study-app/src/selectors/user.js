import _ from "lodash";

export const getUser = (state) => _.get(state, "user", null);
export const getProfile = (state) => _.get(state, "profile", null);
export const getUserList = (state) => _.get(state, "userList", []);
export const getToast = (state) => _.get(state, "toast", null);

export const getUserType = (state) => _.get(state, "userType", 0);
export const getUserId = (state) => _.get(state, "userId", 0);

export const getStudentId = (state) => _.get(state, "studentId", 0);
export const getTeacherId = (state) => _.get(state, "teacherId", 0);

export const getUsername = (state) => _.get(state, "username", "");
export const getName = (state) => _.get(state, "name", "");
export const getBirthday = (state) => _.get(state, "birthday", null);
export const getGender = (state) => _.get(state, "gender", "");
export const getRace = (state) => _.get(state, "race", "");
export const getReligion = (state) => _.get(state, "religion", "");
export const getAddress = (state) => _.get(state, "address", "");
export const getTelNo = (state) => _.get(state, "telNo", "");
export const getHpNo = (state) => _.get(state, "hpNo", "");
export const getEmail = (state) => _.get(state, "email", "");

export const getSchoolId = (state) => _.get(state, "schoolId", "");
export const getDisability = (state) => _.get(state, "disability", "");

export const getEducation = (state) => _.get(state, "education", "");
export const getOfficeNo = (state) => _.get(state, "officeNo", "");
export const getWorkSince = (state) => _.get(state, "workSince", null);
export const getGrade = (state) => _.get(state, "grade", "");
export const getClassName = (state) => _.get(state, "className", "-");

export const getIsInvalid = (state) => _.get(state, "isInvalid", false);
export const getIsUpdated = (state) => _.get(state, "isUpdated", false);
