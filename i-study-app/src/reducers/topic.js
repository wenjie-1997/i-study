import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "topic",
  initialState: { topicList: [], isLoading: false },
  reducers: {
    GET_TOPIC_LIST_REQUEST: (state) => {
      state.isLoading = true;
      state.topicList = [];
    },
    GET_TOPIC_LIST_SUCCESS: (state, action) => {
      state.topicList = action.payload;
      state.isLoading = false;
    },
    GET_TOPIC_LIST_FAILED: (state) => {
      state.isLoading = false;
    },
    ADD_TOPIC_REQUEST: (state) => {
      state.isLoading = true;
    },
    ADD_TOPIC_SUCCESS: (state) => {
      state.isLoading = false;
    },
    ADD_TOPIC_FAILED: (state) => {
      state.isLoading = false;
    },
    DOWNLOAD_MATERIAL_REQUEST: (state) => {
      state.isLoading = true;
    },
    DOWNLOAD_MATERIAL_SUCCESS: (state) => {
      state.isLoading = false;
    },
    DOWNLOAD_MATERIAL_FAILED: (state) => {
      state.isLoading = false;
    },
    ADD_TOPIC_COMPONENT_REQUEST: (state) => {
      state.isLoading = true;
    },
    ADD_TOPIC_COMPONENT_SUCCESS: (state) => {
      state.isLoading = false;
    },
    ADD_TOPIC_COMPONENT_FAILED: (state) => {
      state.isLoading = false;
    },
    UPDATE_TOPIC_COMPONENT_REQUEST: (state) => {
      state.isLoading = true;
    },
    UPDATE_TOPIC_COMPONENT_SUCCESS: (state) => {
      state.isLoading = false;
    },
    UPDATE_TOPIC_COMPONENT_FAILED: (state) => {
      state.isLoading = false;
    },
    DELETE_TOPIC_COMPONENT_REQUEST: (state) => {
      state.isLoading = true;
    },
    DELETE_TOPIC_COMPONENT_SUCCESS: (state) => {
      state.isLoading = false;
    },
    DELETE_TOPIC_COMPONENT_FAILED: (state) => {
      state.isLoading = false;
    },
    UPDATE_TOPIC_REQUEST: (state) => {
      state.isLoading = true;
    },
    UPDATE_TOPIC_SUCCESS: (state) => {
      state.isLoading = false;
    },
    UPDATE_TOPIC_FAILED: (state) => {
      state.isLoading = false;
    },
    DELETE_TOPIC_REQUEST: (state) => {
      state.isLoading = true;
    },
    DELETE_TOPIC_SUCCESS: (state) => {
      state.isLoading = false;
    },
    DELETE_TOPIC_FAILED: (state) => {
      state.isLoading = false;
    },
  },
});

export default slice.reducer;
export const {
  GET_TOPIC_LIST_REQUEST,
  GET_TOPIC_LIST_SUCCESS,
  GET_TOPIC_LIST_FAILED,
  ADD_TOPIC_REQUEST,
  ADD_TOPIC_SUCCESS,
  ADD_TOPIC_FAILED,
  ADD_TOPIC_COMPONENT_REQUEST,
  ADD_TOPIC_COMPONENT_SUCCESS,
  ADD_TOPIC_COMPONENT_FAILED,
  DOWNLOAD_MATERIAL_REQUEST,
  DOWNLOAD_MATERIAL_SUCCESS,
  DOWNLOAD_MATERIAL_FAILED,
  UPDATE_TOPIC_COMPONENT_REQUEST,
  UPDATE_TOPIC_COMPONENT_SUCCESS,
  UPDATE_TOPIC_COMPONENT_FAILED,
  DELETE_TOPIC_COMPONENT_REQUEST,
  DELETE_TOPIC_COMPONENT_SUCCESS,
  DELETE_TOPIC_COMPONENT_FAILED,
  UPDATE_TOPIC_REQUEST,
  UPDATE_TOPIC_SUCCESS,
  UPDATE_TOPIC_FAILED,
  DELETE_TOPIC_REQUEST,
  DELETE_TOPIC_SUCCESS,
  DELETE_TOPIC_FAILED,
} = slice.actions;
