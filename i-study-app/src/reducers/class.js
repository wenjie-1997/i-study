import { createSlice } from "@reduxjs/toolkit";
const slice = createSlice({
  name: "class",
  initialState: {
    classList: [],
    selectedClass: null,
    selectedClassSubjectList: [],
    selectedClassStudentList: [],
    teacherList: [],
    studentList: [],
    timetableSlots: [],
    failedResponse: null,
    isLoading: false,
  },
  reducers: {
    GET_CLASS_LIST_REQUEST: (state) => {
      state.classList = [];
      state.isLoading = true;
    },
    GET_CLASS_LIST_SUCCESS: (state, action) => {
      state.classList = action.payload;
      state.isLoading = false;
    },
    GET_CLASS_LIST_FAILED: (state) => {
      state.isLoading = false;
    },
    GET_CLASS_REQUEST: (state) => {
      state.isLoading = true;
    },
    GET_CLASS_SUCCESS: (state, action) => {
      state.selectedClass = action.payload;
      state.isLoading = false;
    },
    GET_CLASS_FAILED: (state) => {
      state.isLoading = false;
    },
    ADD_CLASS_REQUEST: (state) => {
      state.isLoading = true;
    },
    ADD_CLASS_SUCCESS: (state) => {
      state.isLoading = false;
    },
    ADD_CLASS_FAILED: (state) => {
      state.isLoading = false;
    },
    SEARCH_TEACHER_BY_NAME_REQUEST: () => {},
    SEARCH_TEACHER_BY_NAME_SUCCESS: (state, action) => {
      state.teacherList = action.payload;
    },
    SEARCH_TEACHER_BY_NAME_FAILED: () => {},
    UPDATE_CLASS_REQUEST: (state) => {
      state.isLoading = true;
    },
    UPDATE_CLASS_SUCCESS: (state) => {
      state.isLoading = false;
    },
    UPDATE_CLASS_FAILED: (state) => {
      state.isLoading = false;
    },
    DELETE_CLASS_REQUEST: (state) => {
      state.isLoading = true;
    },
    DELETE_CLASS_SUCCESS: (state) => {
      state.isLoading = false;
    },
    DELETE_CLASS_FAILED: (state) => {
      state.isLoading = false;
    },
    GET_CLASS_SUBJECT_LIST_REQUEST: (state, action) => {
      state.selectedClassSubjectList = [];
      state.isLoading = true;
    },
    GET_CLASS_SUBJECT_LIST_SUCCESS: (state, action) => {
      state.selectedClassSubjectList = action.payload;
      state.isLoading = false;
    },
    GET_CLASS_SUBJECT_LIST_FAILED: (state) => {
      state.isLoading = false;
    },
    ADD_CLASS_SUBJECT_REQUEST: (state) => {
      state.isLoading = true;
    },
    ADD_CLASS_SUBJECT_SUCCESS: (state) => {
      state.isLoading = false;
    },
    ADD_CLASS_SUBJECT_FAILED: (state) => {
      state.isLoading = false;
    },
    UPDATE_CLASS_SUBJECT_REQUEST: (state) => {
      state.isLoading = true;
    },
    UPDATE_CLASS_SUBJECT_SUCCESS: (state) => {
      state.isLoading = false;
    },
    UPDATE_CLASS_SUBJECT_FAILED: (state) => {
      state.isLoading = false;
    },
    DELETE_CLASS_SUBJECT_REQUEST: (state) => {
      state.isLoading = true;
    },
    DELETE_CLASS_SUBJECT_SUCCESS: (state) => {
      state.isLoading = false;
    },
    DELETE_CLASS_SUBJECT_FAILED: (state) => {
      state.isLoading = false;
    },
    GET_CLASS_STUDENT_LIST_REQUEST: (state) => {
      state.isLoading = true;
      state.selectedClassStudentList = [];
    },
    GET_CLASS_STUDENT_LIST_SUCCESS: (state, action) => {
      state.selectedClassStudentList = action.payload;
      state.isLoading = false;
    },
    GET_CLASS_STUDENT_LIST_FAILED: (state) => {
      state.isLoading = false;
    },
    ADD_CLASS_STUDENT_REQUEST: (state) => {
      state.isLoading = true;
    },
    ADD_CLASS_STUDENT_SUCCESS: (state) => {
      state.isLoading = false;
    },
    ADD_CLASS_STUDENT_FAILED: (state) => {
      state.isLoading = false;
    },
    UPDATE_CLASS_STUDENT_REQUEST: (state) => {
      state.isLoading = true;
    },
    UPDATE_CLASS_STUDENT_SUCCESS: (state) => {
      state.isLoading = false;
    },
    UPDATE_CLASS_STUDENT_FAILED: (state) => {
      state.isLoading = false;
    },
    DELETE_CLASS_STUDENT_REQUEST: (state) => {
      state.isLoading = true;
    },
    DELETE_CLASS_STUDENT_SUCCESS: (state) => {
      state.isLoading = false;
    },
    DELETE_CLASS_STUDENT_FAILED: (state) => {
      state.isLoading = false;
    },
    SEARCH_STUDENT_BY_NAME_REQUEST: () => {},
    SEARCH_STUDENT_BY_NAME_SUCCESS: (state, action) => {
      state.studentList = action.payload;
    },
    SEARCH_STUDENT_BY_NAME_FAILED: () => {},
    GET_CLASS_TIMETABLE_REQUEST: (state) => {
      state.isLoading = true;
    },
    GET_CLASS_TIMETABLE_SUCCESS: (state, action) => {
      state.timetableSlots = action.payload;
      state.isLoading = false;
    },
    GET_CLASS_TIMETABLE_FAILED: (state) => {
      state.isLoading = false;
    },
    UPDATE_TIMETABLE_SLOTS_REQUEST: (state) => {
      state.isLoading = true;
    },
    UPDATE_TIMETABLE_SLOTS_SUCCESS: (state, action) => {
      if (action.payload) state.failedResponse = action.payload;
      state.isLoading = false;
    },
    UPDATE_TIMETABLE_SLOTS_FAILED: (state) => {
      state.isLoading = false;
    },
    CLOSE_FAILED_RESPONSE_MODAL: (state) => {
      state.failedResponse = null;
    },
  },
});

export const {
  GET_CLASS_LIST_REQUEST,
  GET_CLASS_LIST_SUCCESS,
  GET_CLASS_LIST_FAILED,
  GET_CLASS_REQUEST,
  GET_CLASS_SUCCESS,
  GET_CLASS_FAILED,
  ADD_CLASS_REQUEST,
  ADD_CLASS_SUCCESS,
  ADD_CLASS_FAILED,
  UPDATE_CLASS_REQUEST,
  UPDATE_CLASS_SUCCESS,
  UPDATE_CLASS_FAILED,
  SEARCH_TEACHER_BY_NAME_REQUEST,
  SEARCH_TEACHER_BY_NAME_SUCCESS,
  SEARCH_TEACHER_BY_NAME_FAILED,
  DELETE_CLASS_REQUEST,
  DELETE_CLASS_SUCCESS,
  DELETE_CLASS_FAILED,
  GET_CLASS_SUBJECT_LIST_REQUEST,
  GET_CLASS_SUBJECT_LIST_SUCCESS,
  GET_CLASS_SUBJECT_LIST_FAILED,
  ADD_CLASS_SUBJECT_REQUEST,
  ADD_CLASS_SUBJECT_SUCCESS,
  ADD_CLASS_SUBJECT_FAILED,
  UPDATE_CLASS_SUBJECT_REQUEST,
  UPDATE_CLASS_SUBJECT_SUCCESS,
  UPDATE_CLASS_SUBJECT_FAILED,
  DELETE_CLASS_SUBJECT_REQUEST,
  DELETE_CLASS_SUBJECT_SUCCESS,
  DELETE_CLASS_SUBJECT_FAILED,
  GET_CLASS_STUDENT_LIST_REQUEST,
  GET_CLASS_STUDENT_LIST_SUCCESS,
  GET_CLASS_STUDENT_LIST_FAILED,
  ADD_CLASS_STUDENT_REQUEST,
  ADD_CLASS_STUDENT_SUCCESS,
  ADD_CLASS_STUDENT_FAILED,
  UPDATE_CLASS_STUDENT_REQUEST,
  UPDATE_CLASS_STUDENT_SUCCESS,
  UPDATE_CLASS_STUDENT_FAILED,
  DELETE_CLASS_STUDENT_REQUEST,
  DELETE_CLASS_STUDENT_SUCCESS,
  DELETE_CLASS_STUDENT_FAILED,
  SEARCH_STUDENT_BY_NAME_REQUEST,
  SEARCH_STUDENT_BY_NAME_SUCCESS,
  SEARCH_STUDENT_BY_NAME_FAILED,
  GET_CLASS_TIMETABLE_REQUEST,
  GET_CLASS_TIMETABLE_SUCCESS,
  GET_CLASS_TIMETABLE_FAILED,
  UPDATE_TIMETABLE_SLOTS_REQUEST,
  UPDATE_TIMETABLE_SLOTS_SUCCESS,
  UPDATE_TIMETABLE_SLOTS_FAILED,
  CLOSE_FAILED_RESPONSE_MODAL,
} = slice.actions;
export default slice.reducer;
