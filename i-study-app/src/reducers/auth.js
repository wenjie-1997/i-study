import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "auth",
  initialState: {
    userId: null,
    username: "",
    name: "",
    userType: 0,
    teacherId: 0,
    studentId: 0,
    isLoginFailed: false,
  },
  reducers: {
    LOGIN_REQUEST: (state, action) => {
      state.failedLogin = false;
    },
    LOGIN_SUCCESS: (state, action) => {
      const { name, username, userId, userType, teacherId, studentId } =
        action.payload;
      state.userId = userId;
      state.username = username;
      state.name = name;
      state.userType = userType;
      if (teacherId) state.teacherId = teacherId;
      if (studentId) state.studentId = studentId;
    },
    LOGIN_FAILED: (state, action) => {
      state.isLoginFailed = true;
    },
    LOGOUT_SUCCESS: (state, action) => {
      state.userId = null;
      state.name = "";
      state.userType = 0;
      state.teacherId = 0;
      state.studentId = 0;
    },

    CLOSE_ALERT: (state) => {
      state.isLoginFailed = false;
    },
    VERIFY_TOKEN_REQUEST: () => {},
    VERIFY_TOKEN_SUCCESS: (state, action) => {
      const { name, userId, userType, teacherId, studentId } = action.payload;
      state.userId = userId;
      state.name = name;
      state.userType = userType;
      if (teacherId) state.teacherId = teacherId;
      if (studentId) state.studentId = studentId;
    },
    VERIFY_TOKEN_FAILED: () => {},
  },
});

export const {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
  CLOSE_ALERT,
  VERIFY_TOKEN_REQUEST,
  VERIFY_TOKEN_SUCCESS,
  VERIFY_TOKEN_FAILED,
} = slice.actions;
export default slice.reducer;
