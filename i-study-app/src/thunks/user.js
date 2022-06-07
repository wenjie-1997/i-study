import {
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
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILED,
  DELETE_USER_REQUEST,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILED,
} from "../reducers/user";
import * as userService from "../services/userService";
import * as studentService from "../services/studentService";
import * as teacherService from "../services/teacherService";
import * as userSelectors from "../selectors/user";
import * as authSelectors from "../selectors/auth";
import * as selectors from "../selectors";
import { USER_TYPE_NUMBER } from "../utilities/constants";
import history from "../utilities/history";

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

export const getUserList = (payload) => async (dispatch, getState) => {
  dispatch(GET_USER_LIST_REQUEST());
  try {
    const { data, status } = await userService.getUserList(payload);

    if (status === 200) {
      dispatch(GET_USER_LIST_SUCCESS(data));
    } else dispatch(GET_USER_LIST_FAILED());
  } catch (error) {
    dispatch(
      GET_USER_LIST_FAILED({
        toast: {
          bg: "danger",
          message: "Error occured. Please try again later.",
        },
      })
    );
  }
};

export const register = (payload) => async (dispatch, getState) => {
  dispatch(REGISTER_USER_REQUEST());
  try {
    const { userType } = payload;
    if (userType === USER_TYPE_NUMBER.TEACHER) {
      const { data, status } = await userService.registerTeacher(payload);

      if (status === 201) {
        dispatch(
          REGISTER_USER_SUCCESS({
            toast: {
              bg: "success",
              message: "User registered successfully.",
            },
          })
        );
        history.back();
      } else
        dispatch(
          REGISTER_USER_FAILED({
            toast: {
              bg: "danger",
              message: "Duplicate username, please change the username.",
            },
          })
        );
    }
    if (userType === USER_TYPE_NUMBER.STUDENT) {
      console.log(payload);
      const { data, status } = await userService.registerStudent(payload);

      if (status === 201) {
        dispatch(
          REGISTER_USER_SUCCESS({
            toast: {
              bg: "success",
              message: "User registered successfully.",
            },
          })
        );
        history.back();
      } else
        dispatch(
          REGISTER_USER_FAILED({
            toast: {
              bg: "success",
              message: "Duplicate username, please change the username.",
            },
          })
        );
    }
  } catch (error) {
    dispatch(
      REGISTER_USER_FAILED({
        toast: {
          bg: "danger",
          message: "Duplicate username, please change the username.",
        },
      })
    );
  }
};

export const updateUserProfile = (payload) => async (dispatch, getState) => {
  const state = getState();
  let userType = parseInt(localStorage.getItem("userType"));
  let studentId = 0;
  let teacherId = 0;
  if (userType === USER_TYPE_NUMBER.ADMIN) {
    userType = payload.userType;
    studentId = payload.studentId;
    teacherId = payload.teacherId;
  } else {
    studentId = parseInt(localStorage.getItem("studentId"));
    teacherId = parseInt(localStorage.getItem("teacherId"));
  }

  dispatch(UPDATE_USER_PROFILE_REQUEST());
  try {
    if (userType === USER_TYPE_NUMBER.TEACHER) {
      const { status } = await teacherService.updateTeacherProfile({
        teacherId,
        ...payload,
      });

      if (status === 200) {
        dispatch(UPDATE_USER_PROFILE_SUCCESS());
        if (payload?.userId) {
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
        if (payload?.userId) {
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

export const changePassword = (payload) => async (dispatch, getState) => {
  const username = localStorage.getItem("username");
  const { onCloseModal, setIsOldPasswordInvalid } = payload;
  dispatch(CHANGE_PASSWORD_REQUEST());
  try {
    const { data, status } = await userService.changePassword({
      ...payload,
      username,
    });
    if (status === 200) {
      const isInvalid = userSelectors.getIsInvalid(data);
      const isUpdated = userSelectors.getIsUpdated(data);
      if (isInvalid === 1) {
        dispatch(CHANGE_PASSWORD_FAILED());
        setIsOldPasswordInvalid(true);
      } else {
        if (isUpdated) {
          dispatch(CHANGE_PASSWORD_SUCCESS());
          onCloseModal();
        } else dispatch(CHANGE_PASSWORD_FAILED());
      }
    } else {
      dispatch(CHANGE_PASSWORD_FAILED());
    }
  } catch (error) {
    dispatch(CHANGE_PASSWORD_FAILED());
  }
};
