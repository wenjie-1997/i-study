import { createSlice } from "@reduxjs/toolkit";
const slice = createSlice({
  name: "user",
  initialState: {
    profile: null,
    userList: [],
    toast: null,
    isLoading: false,
  },
  reducers: {
    GET_USER_PROFILE_REQUEST: (state) => {
      state.isLoading = true;
    },
    GET_USER_PROFILE_SUCCESS: (state, action) => {
      state.profile = action.payload;
      state.isLoading = false;
    },
    GET_USER_PROFILE_FAILED: (state, action) => {
      const { toast } = action.payload;
      state.toast = toast;
      state.isLoading = false;
    },
    GET_USER_LIST_REQUEST: (state) => {},
    GET_USER_LIST_SUCCESS: (state, action) => {
      state.userList = action.payload;
      state.isLoading = false;
    },
    GET_USER_LIST_FAILED: (state) => {
      state.isLoading = false;
    },
    REGISTER_USER_REQUEST: (state) => {
      state.isLoading = true;
    },
    REGISTER_USER_SUCCESS: (state, action) => {
      const { toast } = action.payload;
      state.toast = toast;
      state.isLoading = false;
    },
    REGISTER_USER_FAILED: (state, action) => {
      const { toast } = action.payload;
      state.toast = toast;
      state.isLoading = false;
    },
    UPDATE_USER_PROFILE_REQUEST: (state) => {
      state.isLoading = true;
    },
    UPDATE_USER_PROFILE_SUCCESS: (state) => {
      state.isLoading = false;
    },
    UPDATE_USER_PROFILE_FAILED: (state) => {
      state.isLoading = false;
    },
    DELETE_USER_REQUEST: (state) => {
      state.isLoading = true;
    },
    DELETE_USER_SUCCESS: (state) => {
      state.isLoading = false;
    },
    DELETE_USER_FAILED: (state) => {
      state.isLoading = false;
    },
    DISMISS_TOAST: (state) => {
      state.toast = null;
    },
    CHANGE_PASSWORD_REQUEST: (state) => {
      state.isLoading = true;
    },
    CHANGE_PASSWORD_SUCCESS: (state) => {
      state.isLoading = false;
    },
    CHANGE_PASSWORD_FAILED: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAILED,
  GET_USER_LIST_REQUEST,
  GET_USER_LIST_SUCCESS,
  GET_USER_LIST_FAILED,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAILED,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILED,
  CLOSE_ALERT,
  DISMISS_TOAST,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILED,
} = slice.actions;
export default slice.reducer;
