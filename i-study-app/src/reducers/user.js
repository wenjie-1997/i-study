import { createSlice } from "@reduxjs/toolkit";
const slice = createSlice({
  name: "user",
  initialState: { user: null, profile: null, userList: [] },
  reducers: {
    LOGIN_REQUEST: (state, action) => {},
    LOGIN_SUCCESS: (state, action) => {
      const { name, user_id, user_type, teacher_id, student_id } =
        action.payload;
      state.user = {
        name,
        user_id,
        user_type,
      };
      if (teacher_id) state.user.teacher_id = teacher_id;
      if (student_id) state.user.student_id = student_id;
    },
    LOGIN_FAILED: (state, action) => {},
    LOGOUT_SUCCESS: (state, action) => {
      state.user = null;
    },
    VERIFY_TOKEN_REQUEST: () => {},
    VERIFY_TOKEN_SUCCESS: (state, action) => {
      const { name, user_id, user_type, teacher_id, student_id } =
        action.payload;
      if (state.user === null) {
        state.user = {
          name,
          user_id,
          user_type,
        };
        if (teacher_id) state.user.teacher_id = teacher_id;
        if (student_id) state.user.student_id = student_id;
      }
    },
    VERIFY_TOKEN_FAILED: () => {},
    GET_USER_PROFILE_REQUEST: () => {},
    GET_USER_PROFILE_SUCCESS: (state, action) => {
      state.profile = action.payload;
    },
    GET_USER_PROFILE_FAILED: () => {},
    GET_USER_LIST_REQUEST: () => {},
    GET_USER_LIST_SUCCESS: (state, action) => {
      state.userList = action.payload;
    },
    GET_USER_LIST_FAILED: () => {},
    REGISTER_USER_REQUEST: () => {},
    REGISTER_USER_SUCCESS: (state) => {
      state.userList = [];
    },
    REGISTER_USER_FAILED: () => {},
    UPDATE_USER_PROFILE_REQUEST: () => {},
    UPDATE_USER_PROFILE_SUCCESS: () => {},
    UPDATE_USER_PROFILE_FAILED: () => {},
    DELETE_USER_REQUEST: () => {},
    DELETE_USER_SUCCESS: () => {},
    DELETE_USER_FAILED: () => {},
  },
});

export const {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
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
  VERIFY_TOKEN_REQUEST,
  VERIFY_TOKEN_SUCCESS,
  VERIFY_TOKEN_FAILED,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILED,
} = slice.actions;
export default slice.reducer;
