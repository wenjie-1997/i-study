import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "student",
  initialState: { timetable: [], subjectList: [] },
  reducers: {
    GET_STUDENT_TIMETABLE_REQUEST: () => {},
    GET_STUDENT_TIMETABLE_SUCCESS: (state, action) => {
      state.timetable = action.payload;
    },
    GET_STUDENT_TIMETABLE_FAILED: () => {},
    GET_STUDENT_SUBJECT_LIST_REQUEST: () => {},
    GET_STUDENT_SUBJECT_LIST_SUCCESS: (state, action) => {
      state.subjectList = action.payload;
    },
    GET_STUDENT_SUBJECT_LIST_FAILED: () => {},
  },
});

export const {
  GET_STUDENT_TIMETABLE_REQUEST,
  GET_STUDENT_TIMETABLE_SUCCESS,
  GET_STUDENT_TIMETABLE_FAILED,
  GET_STUDENT_SUBJECT_LIST_REQUEST,
  GET_STUDENT_SUBJECT_LIST_SUCCESS,
  GET_STUDENT_SUBJECT_LIST_FAILED,
} = slice.actions;
export default slice.reducer;
