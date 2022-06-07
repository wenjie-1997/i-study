import {
  GET_STUDENT_SUBJECT_LIST_FAILED,
  GET_STUDENT_SUBJECT_LIST_REQUEST,
  GET_STUDENT_SUBJECT_LIST_SUCCESS,
  GET_STUDENT_TIMETABLE_FAILED,
  GET_STUDENT_TIMETABLE_REQUEST,
  GET_STUDENT_TIMETABLE_SUCCESS,
} from "../reducers/student";
import * as studentService from "../services/studentService";
import * as selectors from "../selectors";
import * as authSelectors from "../selectors/auth";

export const getStudentSubjectList = () => async (dispatch, getState) => {
  dispatch(GET_STUDENT_SUBJECT_LIST_REQUEST());
  const studentId = parseInt(localStorage.getItem("studentId"));
  try {
    const { data, status } = await studentService.getStudentSubjectList({
      studentId,
    });
    if (status === 200) {
      dispatch(GET_STUDENT_SUBJECT_LIST_SUCCESS(data));
    } else {
      dispatch(GET_STUDENT_SUBJECT_LIST_FAILED());
    }
  } catch (error) {
    console.log(error);
    dispatch(GET_STUDENT_SUBJECT_LIST_FAILED());
  }
};

export const getStudentTimetable = () => async (dispatch, getState) => {
  const studentId = parseInt(localStorage.getItem("studentId"));
  dispatch(GET_STUDENT_TIMETABLE_REQUEST());
  try {
    const { data, status } = await studentService.getStudentTimetable({
      studentId,
    });
    if (status === 200) {
      console.log(data);
      dispatch(GET_STUDENT_TIMETABLE_SUCCESS(data));
    } else {
      dispatch(GET_STUDENT_TIMETABLE_FAILED());
    }
  } catch (error) {
    console.log(error);
    dispatch(GET_STUDENT_TIMETABLE_FAILED());
  }
};
