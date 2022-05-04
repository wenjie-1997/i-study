import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "subject",
  initialState: { subjectList: [], selectedSubject: null },
  reducers: {
    GET_SUBJECT_REQUEST: () => {},
    GET_SUBJECT_SUCCESS: () => {},
    GET_SUBJECT_FAILED: () => {},
    GET_SUBJECT_LIST_REQUEST: () => {},
    GET_SUBJECT_LIST_SUCCESS: (state, action) => {
      state.subjectList = action.payload;
    },
    GET_SUBJECT_LIST_FAILED: () => {},
    ADD_SUBJECT_REQUEST: () => {},
    ADD_SUBJECT_SUCCESS: () => {},
    ADD_SUBJECT_FAILED: () => {},
    UPDATE_SUBJECT_REQUEST: () => {},
    UPDATE_SUBJECT_SUCCESS: () => {},
    UPDATE_SUBJECT_FAILED: () => {},
    DELETE_SUBJECT_REQUEST: () => {},
    DELETE_SUBJECT_SUCCESS: () => {},
    DELETE_SUBJECT_FAILED: () => {},
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
