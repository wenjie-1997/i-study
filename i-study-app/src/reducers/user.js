import { createSlice } from "@reduxjs/toolkit";
const slice = createSlice({
  name: "user",
  initialState: {
    profile: null,
    userList: [],
    toast: null,
  },
  reducers: {
    GET_USER_PROFILE_REQUEST: () => {},
    GET_USER_PROFILE_SUCCESS: (state, action) => {
      state.profile = action.payload;
    },
    GET_USER_PROFILE_FAILED: (state, action) => {
      const { toast } = action.payload;
      state.toast = toast;
    },
    GET_USER_LIST_REQUEST: () => {},
    GET_USER_LIST_SUCCESS: (state, action) => {
      state.userList = action.payload;
    },
    GET_USER_LIST_FAILED: () => {},
    REGISTER_USER_REQUEST: () => {},
    REGISTER_USER_SUCCESS: (state, action) => {
      const { toast } = action.payload;
      state.toast = toast;
    },
    REGISTER_USER_FAILED: (state, action) => {
      const { toast } = action.payload;
      state.toast = toast;
    },
    UPDATE_USER_PROFILE_REQUEST: () => {},
    UPDATE_USER_PROFILE_SUCCESS: () => {},
    UPDATE_USER_PROFILE_FAILED: () => {},
    DELETE_USER_REQUEST: () => {},
    DELETE_USER_SUCCESS: () => {},
    DELETE_USER_FAILED: () => {},
    DISMISS_TOAST: (state) => {
      state.toast = null;
    },
    CHANGE_PASSWORD_REQUEST: () => {},
    CHANGE_PASSWORD_SUCCESS: () => {},
    CHANGE_PASSWORD_FAILED: () => {},
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
