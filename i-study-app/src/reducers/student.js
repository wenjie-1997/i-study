import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "student",
  initialState: { timetable: [], subjectList: [], isLoading: false },
  reducers: {
    GET_STUDENT_TIMETABLE_REQUEST: (state) => {
      state.isLoading = true;
    },
    GET_STUDENT_TIMETABLE_SUCCESS: (state, action) => {
      state.timetable = action.payload;
      state.isLoading = false;
    },
    GET_STUDENT_TIMETABLE_FAILED: (state) => {
      state.isLoading = false;
    },
    GET_STUDENT_SUBJECT_LIST_REQUEST: (state) => {
      state.isLoading = true;
    },
    GET_STUDENT_SUBJECT_LIST_SUCCESS: (state, action) => {
      state.subjectList = action.payload;
      state.isLoading = false;
    },
    GET_STUDENT_SUBJECT_LIST_FAILED: (state) => {
      state.isLoading = false;
    },
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
