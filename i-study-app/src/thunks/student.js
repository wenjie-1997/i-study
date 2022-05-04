import {
  GET_STUDENT_TIMETABLE_FAILED,
  GET_STUDENT_TIMETABLE_REQUEST,
  GET_STUDENT_TIMETABLE_SUCCESS,
} from "../reducers/student";
import * as studentService from "../services/studentService";
import * as selectors from "../selectors";
import * as authSelectors from "../selectors/auth";

export const getStudentTimetable = () => async (dispatch, getState) => {
  const state = getState();
  const auth = selectors.getAuth(state);
  const studentId = authSelectors.getStudentId(auth);
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
