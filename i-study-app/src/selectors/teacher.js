import _ from "lodash";

export const getTimetable = (state) => _.get(state, "timetable", []);
export const getClassName = (state) => _.get(state, "className", 0);
export const getSubjectId = (state) => _.get(state, "subjectId", 0);
export const getSubjectCode = (state) => _.get(state, "subjectCode", "");
export const getStartingSlot = (state) => _.get(state, "startingSlot", 0);
export const getNoOfSlots = (state) => _.get(state, "noOfSlots", 0);

export const getSubjectList = (state) => _.get(state, "subjectList", []);
