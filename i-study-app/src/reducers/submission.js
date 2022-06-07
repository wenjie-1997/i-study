import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "submission",
  initialState: {
    submissionList: [],
    selectedSubmission: null,
    homeworkList: [],
  },
  reducers: {
    GET_STUDENT_SUBMISSION_LIST_REQUEST: () => {},
    GET_STUDENT_SUBMISSION_LIST_SUCCESS: (state, action) => {
      state.submissionList = action.payload;
    },
    GET_STUDENT_SUBMISSION_LIST_FAILED: (state) => {
      state.submissionList = [];
    },
    GET_SUBMISSION_REQUEST: () => {},
    GET_SUBMISSION_SUCCESS: (state, action) => {
      state.selectedSubmission = action.payload;
    },
    GET_SUBMISSION_FAILED: () => {},
    ADD_SUBMISSION_REQUEST: () => {},
    ADD_SUBMISSION_SUCCESS: () => {},
    ADD_SUBMISSION_FAILED: () => {},
    UPDATE_SUBMISSION_REQUEST: () => {},
    UPDATE_SUBMISSION_SUCCESS: () => {},
    UPDATE_SUBMISSION_FAILED: () => {},
    DELETE_SUBMISSION_REQUEST: () => {},
    DELETE_SUBMISSION_SUCCESS: () => {},
    DELETE_SUBMISSION_FAILED: () => {},
    GET_HOMEWORK_LIST_REQUEST: (state) => {
      state.submissionList = [];
    },
    GET_HOMEWORK_LIST_SUCCESS: (state, action) => {
      state.homeworkList = action.payload;
    },
    GET_HOMEWORK_LIST_FAILED: (state) => {
      state.submissionList = [];
    },
  },
});

export const {
  GET_STUDENT_SUBMISSION_LIST_REQUEST,
  GET_STUDENT_SUBMISSION_LIST_SUCCESS,
  GET_STUDENT_SUBMISSION_LIST_FAILED,
  GET_SUBMISSION_REQUEST,
  GET_SUBMISSION_SUCCESS,
  GET_SUBMISSION_FAILED,
  ADD_SUBMISSION_REQUEST,
  ADD_SUBMISSION_SUCCESS,
  ADD_SUBMISSION_FAILED,
  UPDATE_SUBMISSION_REQUEST,
  UPDATE_SUBMISSION_SUCCESS,
  UPDATE_SUBMISSION_FAILED,
  DELETE_SUBMISSION_REQUEST,
  DELETE_SUBMISSION_SUCCESS,
  DELETE_SUBMISSION_FAILED,
  GET_HOMEWORK_LIST_REQUEST,
  GET_HOMEWORK_LIST_SUCCESS,
  GET_HOMEWORK_LIST_FAILED,
} = slice.actions;
export default slice.reducer;
