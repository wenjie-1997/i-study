import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "teacher",
  initialState: { timetable: [], subjectList: [] },
  reducers: {
    GET_TEACHER_TIMETABLE_REQUEST: () => {},
    GET_TEACHER_TIMETABLE_SUCCESS: (state, action) => {
      state.timetable = action.payload;
    },
    GET_TEACHER_TIMETABLE_FAILED: () => {},
    GET_TEACHER_SUBJECT_LIST_REQUEST: () => {},
    GET_TEACHER_SUBJECT_LIST_SUCCESS: (state, action) => {
      state.subjectList = action.payload;
    },
    GET_TEACHER_SUBJECT_LIST_FAILED: () => {},
  },
});

export const {
  GET_TEACHER_TIMETABLE_REQUEST,
  GET_TEACHER_TIMETABLE_SUCCESS,
  GET_TEACHER_TIMETABLE_FAILED,
  GET_TEACHER_SUBJECT_LIST_REQUEST,
  GET_TEACHER_SUBJECT_LIST_SUCCESS,
  GET_TEACHER_SUBJECT_LIST_FAILED,
} = slice.actions;
export default slice.reducer;
