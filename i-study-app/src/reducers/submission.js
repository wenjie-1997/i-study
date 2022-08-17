import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "submission",
  initialState: {
    submissionList: [],
    selectedSubmission: null,
    homeworkList: [],
    isLoading: false,
  },
  reducers: {
    GET_STUDENT_SUBMISSION_LIST_REQUEST: (state) => {
      state.submissionList = [];
      state.isLoading = true;
    },
    GET_STUDENT_SUBMISSION_LIST_SUCCESS: (state, action) => {
      state.submissionList = action.payload;
      state.isLoading = false;
    },
    GET_STUDENT_SUBMISSION_LIST_FAILED: (state) => {
      state.submissionList = [];
      state.isLoading = false;
    },
    GET_SUBMISSION_REQUEST: (state) => {
      state.isLoading = true;
    },
    GET_SUBMISSION_SUCCESS: (state, action) => {
      state.selectedSubmission = action.payload;
      state.isLoading = false;
    },
    GET_SUBMISSION_FAILED: (state) => {
      state.isLoading = false;
    },
    ADD_SUBMISSION_REQUEST: (state) => {
      state.isLoading = true;
    },
    ADD_SUBMISSION_SUCCESS: (state) => {
      state.isLoading = false;
    },
    ADD_SUBMISSION_FAILED: (state) => {
      state.isLoading = false;
    },
    UPDATE_SUBMISSION_REQUEST: (state) => {
      state.isLoading = true;
    },
    UPDATE_SUBMISSION_SUCCESS: (state) => {
      state.isLoading = false;
    },
    UPDATE_SUBMISSION_FAILED: (state) => {
      state.isLoading = false;
    },
    DELETE_SUBMISSION_REQUEST: (state) => {
      state.isLoading = true;
    },
    DELETE_SUBMISSION_SUCCESS: (state) => {
      state.isLoading = false;
    },
    DELETE_SUBMISSION_FAILED: (state) => {
      state.isLoading = false;
    },
    GET_HOMEWORK_LIST_REQUEST: (state) => {
      state.submissionList = [];
      state.isLoading = true;
    },
    GET_HOMEWORK_LIST_SUCCESS: (state, action) => {
      state.homeworkList = action.payload;
      state.isLoading = false;
    },
    GET_HOMEWORK_LIST_FAILED: (state) => {
      state.submissionList = [];
      state.isLoading = false;
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
