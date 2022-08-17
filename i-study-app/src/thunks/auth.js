import {
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  VERIFY_TOKEN_FAILED,
  VERIFY_TOKEN_REQUEST,
  VERIFY_TOKEN_SUCCESS,
} from "../reducers/auth";
import * as userService from "../services/userService";
import { USER_TYPE_NUMBER } from "../utilities/constants";
import history from "../utilities/history";

export const login = (payload) => async (dispatch, getState) => {
  dispatch(LOGIN_REQUEST());
  try {
    const { username, password } = payload;
    const { status, data } = await userService.login(username, password);
    if (status === 200) {
      localStorage.setItem("accessToken", data.jwt);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("name", data.name);
      localStorage.setItem("username", data.username);
      localStorage.setItem("userType", data.userType);
      if (data.userType === USER_TYPE_NUMBER.STUDENT) {
        localStorage.setItem("studentId", data.studentId);
        localStorage.setItem("className", data.className);
        localStorage.setItem("classId", data?.classId);
      }
      if (data.userType === USER_TYPE_NUMBER.TEACHER)
        localStorage.setItem("teacherId", data.teacherId);
      dispatch(LOGIN_SUCCESS(data));
      history.replace("/dashboard");
    } else {
      dispatch(LOGIN_FAILED());
    }
  } catch (error) {
    console.log(error);
    dispatch(LOGIN_FAILED());
  }
};

export const verifyToken = () => async (dispatch) => {
  dispatch(VERIFY_TOKEN_REQUEST());
  try {
    const { data, status } = await userService.verifyToken();
    const { jwt } = data;
    if (status === 200) {
      localStorage.setItem("accessToken", jwt);

      dispatch(VERIFY_TOKEN_SUCCESS(data));
    } else {
      dispatch(VERIFY_TOKEN_FAILED());
      dispatch(logout());
    }
  } catch (error) {
    console.log(error);
    dispatch(VERIFY_TOKEN_FAILED());
  }
};

export const logout = () => async (dispatch, getState) => {
  localStorage.clear();
  dispatch(LOGOUT_SUCCESS());
  history.replace("/");
};
