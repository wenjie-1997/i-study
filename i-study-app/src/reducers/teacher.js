import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "teacher",
  initialState: {
    timetable: [],
    subjectList: [],
    isLoading: false,
    report: [],
  },
  reducers: {
    GET_TEACHER_TIMETABLE_REQUEST: (state) => {
      state.timetable = [];
      state.isLoading = true;
    },
    GET_TEACHER_TIMETABLE_SUCCESS: (state, action) => {
      state.timetable = action.payload;
      state.isLoading = false;
    },
    GET_TEACHER_TIMETABLE_FAILED: (state) => {
      state.isLoading = false;
    },
    GET_TEACHER_SUBJECT_LIST_REQUEST: (state) => {
      state.subjectList = [];
      state.isLoading = true;
    },
    GET_TEACHER_SUBJECT_LIST_SUCCESS: (state, action) => {
      state.subjectList = action.payload;
      state.isLoading = false;
    },
    GET_TEACHER_SUBJECT_LIST_FAILED: (state) => {
      state.isLoading = false;
    },
    GET_REPORT_SUMMARY_REQUEST: (state) => {
      state.isLoading = true;
      state.report = [];
    },
    GET_REPORT_SUMMARY_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.report = action.payload;
    },
    GET_REPORT_SUMMARY_FAILED: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  GET_TEACHER_TIMETABLE_REQUEST,
  GET_TEACHER_TIMETABLE_SUCCESS,
  GET_TEACHER_TIMETABLE_FAILED,
  GET_TEACHER_SUBJECT_LIST_REQUEST,
  GET_TEACHER_SUBJECT_LIST_SUCCESS,
  GET_TEACHER_SUBJECT_LIST_FAILED,
  GET_REPORT_SUMMARY_REQUEST,
  GET_REPORT_SUMMARY_SUCCESS,
  GET_REPORT_SUMMARY_FAILED,
} = slice.actions;
export default slice.reducer;
