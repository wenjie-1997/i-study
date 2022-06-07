import {
  ADD_SUBMISSION_FAILED,
  ADD_SUBMISSION_REQUEST,
  ADD_SUBMISSION_SUCCESS,
  DELETE_SUBMISSION_FAILED,
  DELETE_SUBMISSION_REQUEST,
  DELETE_SUBMISSION_SUCCESS,
  GET_HOMEWORK_LIST_FAILED,
  GET_HOMEWORK_LIST_REQUEST,
  GET_HOMEWORK_LIST_SUCCESS,
  GET_STUDENT_SUBMISSION_LIST_FAILED,
  GET_STUDENT_SUBMISSION_LIST_REQUEST,
  GET_STUDENT_SUBMISSION_LIST_SUCCESS,
  GET_SUBMISSION_FAILED,
  GET_SUBMISSION_REQUEST,
  GET_SUBMISSION_SUCCESS,
  UPDATE_SUBMISSION_FAILED,
  UPDATE_SUBMISSION_REQUEST,
  UPDATE_SUBMISSION_SUCCESS,
} from "../reducers/submission";
import * as submissionService from "../services/submissionService";

export const getStudentSubmissionList =
  (payload) => async (dispatch, getState) => {
    dispatch(GET_STUDENT_SUBMISSION_LIST_REQUEST());
    try {
      const { data, status } = await submissionService.getStudentSubmissionList(
        payload
      );
      if (status === 200) {
        dispatch(GET_STUDENT_SUBMISSION_LIST_SUCCESS(data));
      } else dispatch(GET_STUDENT_SUBMISSION_LIST_FAILED());
    } catch (error) {
      dispatch(GET_STUDENT_SUBMISSION_LIST_FAILED());
    }
  };

export const getSubmission = (payload) => async (dispatch, getState) => {
  dispatch(GET_SUBMISSION_REQUEST());
  try {
    const { data, status } = await submissionService.getSubmission(payload);
    if (status === 200) {
      dispatch(GET_SUBMISSION_SUCCESS(data));
    } else dispatch(GET_SUBMISSION_FAILED());
  } catch (error) {
    dispatch(GET_SUBMISSION_FAILED());
  }
};

export const addSubmission = (payload) => async (dispatch, getState) => {
  dispatch(ADD_SUBMISSION_REQUEST());
  try {
    const { closeSubmissionModal, submissionId, submissionDate } = payload;
    const formData = new FormData();
    const studentId = localStorage.getItem("studentId");
    formData.append("file", payload.file);
    formData.append("studentId", studentId);
    formData.append("submissionId", submissionId);
    formData.append("submissionDate", submissionDate);
    const { status } = await submissionService.addSubmission(formData);
    if (status === 201) {
      dispatch(ADD_SUBMISSION_SUCCESS());
      dispatch(getSubmission({ studentId, submissionId }));
      closeSubmissionModal();
    } else dispatch(ADD_SUBMISSION_FAILED());
  } catch (error) {
    dispatch(ADD_SUBMISSION_FAILED());
  }
};

export const updateSubmission = (payload) => async (dispatch, getState) => {
  dispatch(UPDATE_SUBMISSION_REQUEST());
  try {
    const {
      closeSubmissionModal,
      submissionId,
      submissionDate,
      studentSubmissionId,
      file,
      url,
    } = payload;
    const formData = new FormData();
    const studentId = localStorage.getItem("studentId");
    formData.append("file", file);
    formData.append("url", url);
    formData.append("studentId", studentId);
    formData.append("studentSubmissionId", studentSubmissionId);
    formData.append("submissionId", submissionId);
    formData.append("submissionDate", submissionDate);
    const { status } = await submissionService.updateSubmission(formData);
    if (status === 200) {
      dispatch(UPDATE_SUBMISSION_SUCCESS());
      dispatch(getSubmission({ studentId, submissionId }));
      closeSubmissionModal();
    } else dispatch(UPDATE_SUBMISSION_FAILED());
  } catch (error) {
    dispatch(UPDATE_SUBMISSION_FAILED());
  }
};

export const deleteSubmission = (payload) => async (dispatch, getState) => {
  dispatch(DELETE_SUBMISSION_REQUEST());
  try {
    const { submissionId } = payload;
    const studentId = localStorage.getItem("studentId");
    const { status } = await submissionService.deleteSubmission(payload);
    if (status === 200) {
      dispatch(DELETE_SUBMISSION_SUCCESS());
      dispatch(getSubmission({ studentId, submissionId }));
    } else dispatch(DELETE_SUBMISSION_FAILED());
  } catch (error) {
    dispatch(DELETE_SUBMISSION_FAILED());
  }
};

export const getHomeworkList = (payload) => async (dispatch, getState) => {
  dispatch(GET_HOMEWORK_LIST_REQUEST());
  try {
    const studentId = localStorage.getItem("studentId");
    const { data, status } = await submissionService.getHomeworkList({
      studentId,
    });
    if (status === 200) {
      dispatch(GET_HOMEWORK_LIST_SUCCESS(data));
    } else dispatch(GET_HOMEWORK_LIST_FAILED());
  } catch (error) {
    dispatch(GET_HOMEWORK_LIST_FAILED());
  }
};
