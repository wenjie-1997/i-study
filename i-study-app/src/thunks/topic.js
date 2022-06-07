import {
  ADD_TOPIC_COMPONENT_FAILED,
  ADD_TOPIC_COMPONENT_REQUEST,
  ADD_TOPIC_COMPONENT_SUCCESS,
  ADD_TOPIC_FAILED,
  ADD_TOPIC_REQUEST,
  ADD_TOPIC_SUCCESS,
  DELETE_TOPIC_COMPONENT_FAILED,
  DELETE_TOPIC_COMPONENT_REQUEST,
  DELETE_TOPIC_COMPONENT_SUCCESS,
  DELETE_TOPIC_FAILED,
  DELETE_TOPIC_REQUEST,
  DELETE_TOPIC_SUCCESS,
  DOWNLOAD_MATERIAL_FAILED,
  DOWNLOAD_MATERIAL_REQUEST,
  DOWNLOAD_MATERIAL_SUCCESS,
  GET_TOPIC_LIST_FAILED,
  GET_TOPIC_LIST_REQUEST,
  GET_TOPIC_LIST_SUCCESS,
  UPDATE_TOPIC_COMPONENT_FAILED,
  UPDATE_TOPIC_COMPONENT_REQUEST,
  UPDATE_TOPIC_COMPONENT_SUCCESS,
  UPDATE_TOPIC_FAILED,
  UPDATE_TOPIC_REQUEST,
  UPDATE_TOPIC_SUCCESS,
} from "../reducers/topic";
import * as topicService from "../services/topicService";

export const getTopicList = (payload) => async (dispatch, getState) => {
  dispatch(GET_TOPIC_LIST_REQUEST());
  try {
    const { data, status } = await topicService.getTopicList(payload);
    if (status === 200) {
      dispatch(GET_TOPIC_LIST_SUCCESS(data));
    }
  } catch (error) {
    dispatch(GET_TOPIC_LIST_FAILED());
  }
};

export const addTopic = (payload) => async (dispatch, getState) => {
  dispatch(ADD_TOPIC_REQUEST());
  try {
    const { closeAddTopicModal, classSubjectId } = payload;
    const { data, status } = await topicService.addTopic(payload);
    if (status === 201) {
      dispatch(ADD_TOPIC_SUCCESS());
      dispatch(getTopicList({ classSubjectId }));
      closeAddTopicModal();
    } else dispatch(ADD_TOPIC_FAILED());
  } catch (error) {
    dispatch(ADD_TOPIC_FAILED());
  }
};

export const updateTopic = (payload) => async (dispatch, getState) => {
  dispatch(UPDATE_TOPIC_REQUEST());
  try {
    const { classSubjectId, closeAddTopicModal } = payload;
    const { data, status } = await topicService.updateTopic(payload);
    if (status === 200) {
      dispatch(UPDATE_TOPIC_SUCCESS());
      dispatch(getTopicList({ classSubjectId }));
      closeAddTopicModal();
    } else dispatch(UPDATE_TOPIC_FAILED());
  } catch (error) {
    dispatch(UPDATE_TOPIC_FAILED());
  }
};

export const deleteTopic = (payload) => async (dispatch, getState) => {
  dispatch(DELETE_TOPIC_REQUEST());
  try {
    const { status } = await topicService.deleteTopic(payload);
    if (status === 200) {
      dispatch(DELETE_TOPIC_SUCCESS());
      dispatch(getTopicList(payload));
    } else dispatch(DELETE_TOPIC_FAILED());
  } catch (error) {
    dispatch(DELETE_TOPIC_FAILED());
  }
};

export const addTopicComponent = (payload) => async (dispatch, getState) => {
  dispatch(ADD_TOPIC_COMPONENT_REQUEST());
  try {
    const formData = new FormData();
    const { componentType } = payload;
    if (componentType === 2) {
      formData.append("file", payload.file);
      formData.append("componentType", componentType);
      formData.append("topicId", payload.topicId);
    }
    const { status } = await topicService.addTopicComponent(
      componentType !== 2 ? payload : formData
    );
    if (status === 201) {
      dispatch(ADD_TOPIC_COMPONENT_SUCCESS());
      dispatch(getTopicList(payload));
      payload.closeTopicComponentModal();
    } else dispatch(ADD_TOPIC_COMPONENT_FAILED());
  } catch (error) {
    dispatch(ADD_TOPIC_COMPONENT_FAILED());
  }
};

export const updateTopicComponent = (payload) => async (dispatch, getState) => {
  dispatch(UPDATE_TOPIC_COMPONENT_REQUEST());
  try {
    const formData = new FormData();
    const { componentType } = payload;
    if (componentType === 2) {
      formData.append("file", payload.file);
      formData.append("componentType", componentType);
      formData.append("materialId", payload.materialId);
      formData.append("topicId", payload.topicId);
      formData.append("url", payload.url);
    }
    const { status } = await topicService.updateTopicComponent(
      componentType !== 2 ? payload : formData
    );
    if (status === 200) {
      dispatch(UPDATE_TOPIC_COMPONENT_SUCCESS());
      dispatch(getTopicList(payload));
      payload.closeTopicComponentModal();
    } else dispatch(UPDATE_TOPIC_COMPONENT_FAILED());
  } catch (error) {
    dispatch(UPDATE_TOPIC_COMPONENT_FAILED());
  }
};

export const deleteTopicComponent = (payload) => async (dispatch, getState) => {
  dispatch(DELETE_TOPIC_COMPONENT_REQUEST());
  try {
    const { status } = await topicService.deleteTopicComponent(payload);
    if (status === 200) {
      dispatch(DELETE_TOPIC_COMPONENT_SUCCESS());
      dispatch(getTopicList(payload));
    } else dispatch(DELETE_TOPIC_COMPONENT_FAILED());
  } catch (error) {
    dispatch(DELETE_TOPIC_COMPONENT_FAILED());
  }
};

export const downloadMaterial = (payload) => async (dispatch, getState) => {
  dispatch(DOWNLOAD_MATERIAL_REQUEST());
  try {
    const { status } = await topicService.downloadMaterial(payload);
    if (status === 200) {
      dispatch(DOWNLOAD_MATERIAL_SUCCESS());
    } else dispatch(DELETE_TOPIC_COMPONENT_FAILED());
  } catch (error) {
    dispatch(DOWNLOAD_MATERIAL_FAILED());
  }
};
