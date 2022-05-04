import {
  ADD_SUBJECT_FAILED,
  ADD_SUBJECT_REQUEST,
  ADD_SUBJECT_SUCCESS,
  DELETE_SUBJECT_REQUEST,
  DELETE_SUBJECT_SUCCESS,
  GET_SUBJECT_FAILED,
  GET_SUBJECT_LIST_FAILED,
  GET_SUBJECT_LIST_REQUEST,
  GET_SUBJECT_LIST_SUCCESS,
  GET_SUBJECT_REQUEST,
  GET_SUBJECT_SUCCESS,
  UPDATE_SUBJECT_FAILED,
  UPDATE_SUBJECT_REQUEST,
  UPDATE_SUBJECT_SUCCESS,
} from "../reducers/subject";
import * as subjectService from "../services/subjectService";
import history from "../utilities/history";

export const getSubjectList = (payload) => async (dispatch, state) => {
  dispatch(GET_SUBJECT_LIST_REQUEST());
  try {
    const { data, status } = await subjectService.getSubjectList();
    if (status === 200) {
      dispatch(GET_SUBJECT_LIST_SUCCESS(data));
    } else {
      dispatch(GET_SUBJECT_LIST_FAILED());
    }
  } catch (error) {
    dispatch(GET_SUBJECT_LIST_FAILED());
  }
};

export const getSubject = (payload) => async (dispatch, state) => {
  dispatch(GET_SUBJECT_REQUEST());
  try {
    const { data, status } = await subjectService.getSubject(payload);
    if (status === 200) {
      dispatch(GET_SUBJECT_SUCCESS(data));
    } else {
      dispatch(GET_SUBJECT_FAILED());
    }
  } catch (error) {
    dispatch(GET_SUBJECT_FAILED());
  }
};

export const addSubject = (payload) => async (dispatch, state) => {
  dispatch(ADD_SUBJECT_REQUEST());
  try {
    const { status } = await subjectService.addSubject(payload);
    if (status === 201) {
      dispatch(ADD_SUBJECT_SUCCESS());
      dispatch(getSubjectList());
      history.back();
    } else {
      dispatch(ADD_SUBJECT_FAILED());
    }
  } catch (error) {
    dispatch(ADD_SUBJECT_FAILED());
  }
};

export const updateSubject = (payload) => async (dispatch, state) => {
  dispatch(UPDATE_SUBJECT_REQUEST());
  try {
    const { status } = await subjectService.updateSubject(payload);
    if (status === 200) {
      dispatch(UPDATE_SUBJECT_SUCCESS());
      dispatch(getSubjectList());
    } else {
      dispatch(UPDATE_SUBJECT_FAILED());
    }
  } catch (error) {
    dispatch(UPDATE_SUBJECT_FAILED());
  }
};

export const deleteSubject = (payload) => async (dispatch, state) => {
  dispatch(DELETE_SUBJECT_REQUEST());
  try {
    const { status } = await subjectService.deleteSubject(payload);
    if (status === 200) {
      dispatch(DELETE_SUBJECT_SUCCESS());
      dispatch(getSubjectList());
    } else {
      dispatch(UPDATE_SUBJECT_FAILED());
    }
  } catch (error) {
    dispatch(UPDATE_SUBJECT_FAILED());
  }
};
