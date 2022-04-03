import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_FAILED,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_LIST_SUCCESS,
  GET_USER_LIST_REQUEST,
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
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILED,
  DELETE_USER_REQUEST,
} from "../reducers/user";
import * as userService from "../services/userService";
import * as studentService from "../services/studentService";
import * as teacherService from "../services/teacherService";
import * as userSelectors from "../selectors/user";
import { USER_TYPE_NUMBER } from "../utilities/constants";
import history from "../utilities/history";

export const login = (payload) => async (dispatch, getState) => {
  dispatch(LOGIN_REQUEST());
  try {
    const { username, password } = payload;
    const { status, data } = await userService.login(username, password);
    if (status === 200) {
      localStorage.setItem("accessToken", data.jwt);
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

export const getUserProfile = () => async (dispatch, getState) => {
  dispatch(GET_USER_PROFILE_REQUEST());
  try {
    const { data, status } = await userService.getUserInfo();
    if (status === 200) {
      dispatch(GET_USER_PROFILE_SUCCESS(data));
    } else dispatch(GET_USER_PROFILE_FAILED());
  } catch (error) {
    dispatch(GET_USER_PROFILE_FAILED());
  }
};

export const getUserList = () => async (dispatch, getState) => {
  dispatch(GET_USER_LIST_REQUEST());
  try {
    const { data, status } = await userService.getUserList();

    if (status === 200) {
      dispatch(GET_USER_LIST_SUCCESS(data));
    } else dispatch(GET_USER_LIST_FAILED());
  } catch (error) {
    dispatch(GET_USER_LIST_FAILED());
  }
};

export const register = (payload) => async (dispatch, getState) => {
  dispatch(REGISTER_USER_REQUEST());
  try {
    const { userType } = payload;
    if (userType === USER_TYPE_NUMBER.TEACHER) {
      const { data, status } = await userService.registerTeacher(payload);

      if (status === 201) {
        dispatch(REGISTER_USER_SUCCESS());
        history.back();
      } else dispatch(REGISTER_USER_FAILED());
    }
    if (userType === USER_TYPE_NUMBER.STUDENT) {
      const { data, status } = await userService.registerStudent(payload);

      if (status === 201) {
        dispatch(REGISTER_USER_SUCCESS());
        history.back();
      } else dispatch(REGISTER_USER_FAILED());
    }
  } catch (error) {
    dispatch(REGISTER_USER_FAILED());
  }
};

export const updateUserProfile = (payload) => async (dispatch, getState) => {
  const state = getState();
  let userType = 0;
  let studentId = 0;
  let teacherId = 0;
  if (payload?.userId !== 0) {
    userType = payload.userType;
    studentId = payload.studentId;
    teacherId = payload.teacherId;
  } else {
    const user = userSelectors.getUser(state);
    const auth = userSelectors.getUser(user);
    userType = userSelectors.getUserType(auth);

    studentId = userSelectors.getStudentId(auth);
    teacherId = userSelectors.getTeacherId(auth);
  }

  dispatch(UPDATE_USER_PROFILE_REQUEST());
  try {
    console.log(userType);
    if (userType === USER_TYPE_NUMBER.TEACHER) {
      const { data, status } = await teacherService.updateTeacherProfile({
        teacherId,
        ...payload,
      });

      if (status === 200) {
        dispatch(UPDATE_USER_PROFILE_SUCCESS());
        if (payload?.userId !== 0) {
          dispatch(getUserList());
        } else dispatch(getUserProfile());
      } else dispatch(UPDATE_USER_PROFILE_FAILED());
    }
    if (userType === USER_TYPE_NUMBER.STUDENT) {
      const { data, status } = await studentService.updateStudentProfile({
        studentId,
        ...payload,
      });

      if (status === 200) {
        dispatch(UPDATE_USER_PROFILE_SUCCESS());
        if (payload?.userId !== 0) {
          dispatch(getUserList());
        } else dispatch(getUserProfile());
      } else dispatch(UPDATE_USER_PROFILE_FAILED());
    }
  } catch (error) {
    console.log(error);
    dispatch(UPDATE_USER_PROFILE_FAILED());
  }
};

export const deleteUser = (data) => async (dispatch, getState) => {
  const { userId } = data;
  dispatch(DELETE_USER_REQUEST());
  try {
    const { data, status } = await userService.deleteUser({ userId });
    if (status === 200) {
      dispatch(DELETE_USER_SUCCESS());
      dispatch(getUserList());
    } else dispatch(DELETE_USER_FAILED());
  } catch (error) {
    dispatch(DELETE_USER_FAILED());
  }
};

export const logout = () => async (dispatch, getState) => {
  localStorage.removeItem("accessToken");
  dispatch(LOGOUT_SUCCESS());
};
