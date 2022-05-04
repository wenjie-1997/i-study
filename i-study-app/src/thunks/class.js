import {
  ADD_CLASS_FAILED,
  ADD_CLASS_REQUEST,
  ADD_CLASS_STUDENT_FAILED,
  ADD_CLASS_STUDENT_REQUEST,
  ADD_CLASS_STUDENT_SUCCESS,
  ADD_CLASS_SUBJECT_FAILED,
  ADD_CLASS_SUBJECT_REQUEST,
  ADD_CLASS_SUBJECT_SUCCESS,
  ADD_CLASS_SUCCESS,
  DELETE_CLASS_FAILED,
  DELETE_CLASS_REQUEST,
  DELETE_CLASS_STUDENT_FAILED,
  DELETE_CLASS_STUDENT_REQUEST,
  DELETE_CLASS_STUDENT_SUCCESS,
  DELETE_CLASS_SUBJECT_FAILED,
  DELETE_CLASS_SUBJECT_REQUEST,
  DELETE_CLASS_SUBJECT_SUCCESS,
  DELETE_CLASS_SUCCESS,
  GET_CLASS_FAILED,
  GET_CLASS_LIST_FAILED,
  GET_CLASS_LIST_REQUEST,
  GET_CLASS_LIST_SUCCESS,
  GET_CLASS_REQUEST,
  GET_CLASS_STUDENT_LIST_FAILED,
  GET_CLASS_STUDENT_LIST_REQUEST,
  GET_CLASS_STUDENT_LIST_SUCCESS,
  GET_CLASS_SUBJECT_LIST_FAILED,
  GET_CLASS_SUBJECT_LIST_REQUEST,
  GET_CLASS_SUBJECT_LIST_SUCCESS,
  GET_CLASS_SUCCESS,
  GET_CLASS_TIMETABLE_FAILED,
  GET_CLASS_TIMETABLE_REQUEST,
  GET_CLASS_TIMETABLE_SUCCESS,
  SEARCH_STUDENT_BY_NAME_FAILED,
  SEARCH_STUDENT_BY_NAME_REQUEST,
  SEARCH_STUDENT_BY_NAME_SUCCESS,
  SEARCH_TEACHER_BY_NAME_FAILED,
  SEARCH_TEACHER_BY_NAME_REQUEST,
  SEARCH_TEACHER_BY_NAME_SUCCESS,
  UPDATE_CLASS_FAILED,
  UPDATE_CLASS_REQUEST,
  UPDATE_CLASS_SUCCESS,
  UPDATE_TIMETABLE_SLOTS_FAILED,
  UPDATE_TIMETABLE_SLOTS_REQUEST,
  UPDATE_TIMETABLE_SLOTS_SUCCESS,
} from "../reducers/class";
import * as classService from "../services/classService";
import * as teacherService from "../services/teacherService";
import * as studentService from "../services/studentService";
import _ from "lodash";
import history from "../utilities/history";
import * as classSelectors from "../selectors/class";

export const getClassList = (payload) => async (dispatch, state) => {
  dispatch(GET_CLASS_LIST_REQUEST());
  try {
    const { data, status } = await classService.getClassList();
    if (status === 200) {
      const groupedClasses = _.groupBy(data, "form");
      dispatch(GET_CLASS_LIST_SUCCESS(groupedClasses));
    }
  } catch (error) {
    dispatch(GET_CLASS_LIST_FAILED());
  }
};

export const getClass = (payload) => async (dispatch, state) => {
  dispatch(GET_CLASS_REQUEST());
  try {
    const { data, status } = await classService.getClass(payload);
    if (status === 200) {
      dispatch(GET_CLASS_SUCCESS(data));
    }
  } catch (error) {
    console.log(error);
    dispatch(GET_CLASS_FAILED());
  }
};

export const addClass = (payload) => async (dispatch, state) => {
  dispatch(ADD_CLASS_REQUEST());
  try {
    const { status } = await classService.addClass(payload);
    if (status === 201) {
      dispatch(ADD_CLASS_SUCCESS());
      history.back();
    } else {
      dispatch(ADD_CLASS_FAILED());
    }
  } catch (error) {
    dispatch(ADD_CLASS_FAILED());
  }
};

export const updateClass = (payload) => async (dispatch, state) => {
  dispatch(UPDATE_CLASS_REQUEST());
  try {
    const { status } = await classService.updateClass(payload);
    if (status === 200) {
      dispatch(UPDATE_CLASS_SUCCESS());
      dispatch(getClass({ classId: payload.classId }));
    } else {
      dispatch(UPDATE_CLASS_FAILED());
    }
  } catch (error) {
    console.log(error);
    dispatch(UPDATE_CLASS_FAILED());
  }
};

export const deleteClass = (payload) => async (dispatch, state) => {
  dispatch(DELETE_CLASS_REQUEST());
  try {
    const { status } = await classService.deleteClass(payload);
    if (status === 200) {
      dispatch(DELETE_CLASS_SUCCESS());
      dispatch(getClassList());
      history.back();
    } else {
      dispatch(DELETE_CLASS_FAILED());
    }
  } catch (error) {
    dispatch(DELETE_CLASS_FAILED());
  }
};

export const searchTeacherByName = (payload) => async (dispatch, state) => {
  dispatch(SEARCH_TEACHER_BY_NAME_REQUEST());
  try {
    const { data, status } = await teacherService.searchTeacherByName(payload);
    if (status === 200) {
      dispatch(SEARCH_TEACHER_BY_NAME_SUCCESS(data));
    } else {
      dispatch(SEARCH_TEACHER_BY_NAME_FAILED());
    }
  } catch (error) {
    dispatch(SEARCH_TEACHER_BY_NAME_FAILED());
  }
};

export const getClassSubjectList = (payload) => async (dispatch, state) => {
  dispatch(GET_CLASS_SUBJECT_LIST_REQUEST());
  try {
    const { data, status } = await classService.getClassSubjectList(payload);
    if (status === 200) {
      dispatch(GET_CLASS_SUBJECT_LIST_SUCCESS(data));
    } else {
      dispatch(GET_CLASS_SUBJECT_LIST_FAILED());
    }
  } catch (error) {
    dispatch(GET_CLASS_SUBJECT_LIST_FAILED());
  }
};

export const addClassSubject = (payload) => async (dispatch, state) => {
  dispatch(ADD_CLASS_SUBJECT_REQUEST());
  try {
    const { status } = await classService.addClassSubject(payload);
    if (status === 201) {
      dispatch(ADD_CLASS_SUBJECT_SUCCESS());
      dispatch(getClassSubjectList({ classId: payload.classId }));
    } else {
      dispatch(ADD_CLASS_SUBJECT_FAILED());
    }
  } catch (error) {
    dispatch(ADD_CLASS_SUBJECT_FAILED());
  }
};

export const deleteClassSubject = (payload) => async (dispatch, state) => {
  dispatch(DELETE_CLASS_SUBJECT_REQUEST());
  try {
    const { status } = await classService.deleteClassSubject(payload);
    if (status === 200) {
      const { class: classModal } = state();
      const { selectedClass } = classModal;
      console.log(classSelectors.getClassId(selectedClass));
      dispatch(DELETE_CLASS_SUBJECT_SUCCESS());
      dispatch(
        getClassSubjectList({
          classId: classSelectors.getClassId(selectedClass),
        })
      );
    } else {
      dispatch(DELETE_CLASS_SUBJECT_FAILED());
    }
  } catch (error) {
    console.log(error);
    dispatch(DELETE_CLASS_SUBJECT_FAILED());
  }
};

export const getClassStudentList = (payload) => async (dispatch, state) => {
  dispatch(GET_CLASS_STUDENT_LIST_REQUEST());
  try {
    const { data, status } = await classService.getClassStudentList(payload);
    if (status === 200) {
      dispatch(GET_CLASS_STUDENT_LIST_SUCCESS(data));
    } else {
      dispatch(GET_CLASS_STUDENT_LIST_FAILED());
    }
  } catch (error) {
    dispatch(GET_CLASS_STUDENT_LIST_FAILED());
  }
};

export const addClassStudent = (payload) => async (dispatch, state) => {
  dispatch(ADD_CLASS_STUDENT_REQUEST());
  try {
    const { status } = await classService.addClassStudent(payload);
    if (status === 201) {
      dispatch(ADD_CLASS_STUDENT_SUCCESS());
      dispatch(getClassStudentList({ classId: payload.classId }));
    } else {
      dispatch(ADD_CLASS_STUDENT_FAILED());
    }
  } catch (error) {
    dispatch(ADD_CLASS_STUDENT_FAILED());
  }
};

export const deleteClassStudent = (payload) => async (dispatch, state) => {
  dispatch(DELETE_CLASS_STUDENT_REQUEST());
  try {
    const { data, status } = await classService.deleteClassStudent(payload);
    if (status === 200) {
      const { class: classModal } = state();
      const { selectedClass } = classModal;
      dispatch(DELETE_CLASS_STUDENT_SUCCESS());
      dispatch(getClassStudentList({ classId: selectedClass.classId }));
    } else {
      dispatch(DELETE_CLASS_STUDENT_FAILED());
    }
  } catch (error) {
    console.log(error);
    dispatch(DELETE_CLASS_STUDENT_FAILED());
  }
};

export const searchStudentByName = (payload) => async (dispatch, state) => {
  dispatch(SEARCH_STUDENT_BY_NAME_REQUEST());
  try {
    const { data, status } = await studentService.searchStudentByName(payload);
    if (status === 200) {
      dispatch(SEARCH_STUDENT_BY_NAME_SUCCESS(data));
    } else {
      dispatch(SEARCH_STUDENT_BY_NAME_FAILED());
    }
  } catch (error) {
    dispatch(SEARCH_STUDENT_BY_NAME_FAILED());
  }
};

export const getClassTimetable = (payload) => async (dispatch, state) => {
  dispatch(GET_CLASS_TIMETABLE_REQUEST());
  try {
    const { data, status } = await classService.getClassTimetable(payload);
    if (status === 200) {
      let timetable = Array(5).fill([]);
      timetable = timetable.map((slots, index) => {
        let array = [];
        for (let i = 0; i < 12; i++) {
          let subjectIndex = data.findIndex(
            (e) => e.day - 1 === index && e.starting_slot - 1 === i
          );
          if (subjectIndex !== -1) {
            const subject = data[subjectIndex];
            array.push(subject);
            i += subject.no_of_slots - 1;
          } else {
            array.push({});
          }
        }
        return array;
      });
      dispatch(GET_CLASS_TIMETABLE_SUCCESS(timetable));
    } else {
      dispatch(GET_CLASS_TIMETABLE_FAILED());
    }
  } catch (error) {
    console.log(error);
    dispatch(GET_CLASS_TIMETABLE_FAILED());
  }
};

export const updateClassTimetable = (payload) => async (dispatch, state) => {
  dispatch(UPDATE_TIMETABLE_SLOTS_REQUEST());
  try {
    const { status } = await classService.updateClassTimetable(payload);
    if (status === 200) {
      dispatch(UPDATE_TIMETABLE_SLOTS_SUCCESS());
      history.back();
    } else {
      dispatch(UPDATE_TIMETABLE_SLOTS_FAILED());
    }
  } catch (error) {
    dispatch(UPDATE_TIMETABLE_SLOTS_FAILED());
  }
};
