import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "subject",
  initialState: { subjectList: [], selectedSubject: null, isLoading: false },
  reducers: {
    GET_SUBJECT_REQUEST: (state) => {
      state.isLoading = false;
    },
    GET_SUBJECT_SUCCESS: (state) => {
      state.isLoading = false;
    },
    GET_SUBJECT_FAILED: (state) => {
      state.isLoading = false;
    },
    GET_SUBJECT_LIST_REQUEST: (state) => {
      state.subjectList = [];
      state.isLoading = true;
    },
    GET_SUBJECT_LIST_SUCCESS: (state, action) => {
      state.subjectList = action.payload;
      state.isLoading = false;
    },
    GET_SUBJECT_LIST_FAILED: (state) => {
      state.isLoading = false;
    },
    ADD_SUBJECT_REQUEST: (state) => {
      state.isLoading = true;
    },
    ADD_SUBJECT_SUCCESS: (state) => {
      state.isLoading = false;
    },
    ADD_SUBJECT_FAILED: (state) => {
      state.isLoading = false;
    },
    UPDATE_SUBJECT_REQUEST: (state) => {
      state.isLoading = true;
    },
    UPDATE_SUBJECT_SUCCESS: (state) => {
      state.isLoading = false;
    },
    UPDATE_SUBJECT_FAILED: (state) => {
      state.isLoading = false;
    },
    DELETE_SUBJECT_REQUEST: (state) => {
      state.isLoading = true;
    },
    DELETE_SUBJECT_SUCCESS: (state) => {
      state.isLoading = false;
    },
    DELETE_SUBJECT_FAILED: (state) => {
      state.isLoading = false;
    },
  },
});

export default slice.reducer;
export const {
  GET_SUBJECT_REQUEST,
  GET_SUBJECT_SUCCESS,
  GET_SUBJECT_FAILED,
  GET_SUBJECT_LIST_REQUEST,
  GET_SUBJECT_LIST_SUCCESS,
  GET_SUBJECT_LIST_FAILED,
  ADD_SUBJECT_REQUEST,
  ADD_SUBJECT_SUCCESS,
  ADD_SUBJECT_FAILED,
  UPDATE_SUBJECT_REQUEST,
  UPDATE_SUBJECT_SUCCESS,
  UPDATE_SUBJECT_FAILED,
  DELETE_SUBJECT_REQUEST,
  DELETE_SUBJECT_SUCCESS,
  DELETE_SUBJECT_FAILED,
} = slice.actions;
