import {
  GET_TEACHER_SUBJECT_LIST_FAILED,
  GET_TEACHER_SUBJECT_LIST_REQUEST,
  GET_TEACHER_SUBJECT_LIST_SUCCESS,
  GET_TEACHER_TIMETABLE_FAILED,
  GET_TEACHER_TIMETABLE_REQUEST,
  GET_TEACHER_TIMETABLE_SUCCESS,
} from "../reducers/teacher";
import * as teacherService from "../services/teacherService";
import * as selectors from "../selectors";
import * as authSelectors from "../selectors/auth";

export const getTeacherSubjectList = () => async (dispatch, getState) => {
  dispatch(GET_TEACHER_SUBJECT_LIST_REQUEST());
  const teacherId = parseInt(localStorage.getItem("teacherId"));
  try {
    const { data, status } = await teacherService.getTeacherSubjectList({
      teacherId,
    });
    if (status === 200) {
      dispatch(GET_TEACHER_SUBJECT_LIST_SUCCESS(data));
    } else {
      dispatch(GET_TEACHER_SUBJECT_LIST_FAILED());
    }
  } catch (error) {
    console.log(error);
    dispatch(GET_TEACHER_SUBJECT_LIST_FAILED());
  }
};

export const getTeacherTimetable = () => async (dispatch, getState) => {
  dispatch(GET_TEACHER_TIMETABLE_REQUEST());
  const teacherId = parseInt(localStorage.getItem("teacherId"));
  try {
    const { data, status } = await teacherService.getTeacherTimetable({
      teacherId,
    });
    if (status === 200) {
      dispatch(GET_TEACHER_TIMETABLE_SUCCESS(data));
    } else {
      dispatch(GET_TEACHER_TIMETABLE_FAILED());
    }
  } catch (error) {
    console.log(error);
    dispatch(GET_TEACHER_TIMETABLE_FAILED());
  }
};
