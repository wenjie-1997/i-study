import {
  GET_FORUM_COMMENT_LIST_REQUEST,
  GET_FORUM_COMMENT_LIST_SUCCESS,
  GET_FORUM_COMMENT_LIST_FAILED,
  ADD_FORUM_COMMENT_REQUEST,
  ADD_FORUM_COMMENT_SUCCESS,
  ADD_FORUM_COMMENT_FAILED,
  UPDATE_FORUM_COMMENT_REQUEST,
  UPDATE_FORUM_COMMENT_SUCCESS,
  UPDATE_FORUM_COMMENT_FAILED,
  DELETE_FORUM_COMMENT_REQUEST,
  DELETE_FORUM_COMMENT_SUCCESS,
  DELETE_FORUM_COMMENT_FAILED,
} from "../reducers/forum";
import * as forumService from "../services/forumService";

export const getForumCommentList = (payload) => async (dispatch, getState) => {
  dispatch(GET_FORUM_COMMENT_LIST_REQUEST());
  try {
    const { data, status } = await forumService.getForumCommentList(payload);
    if (status === 200) {
      dispatch(GET_FORUM_COMMENT_LIST_SUCCESS(data));
    } else dispatch(GET_FORUM_COMMENT_LIST_FAILED());
  } catch (error) {
    dispatch(GET_FORUM_COMMENT_LIST_FAILED());
  }
};

export const addForumComment = (payload) => async (dispatch, getState) => {
  dispatch(ADD_FORUM_COMMENT_REQUEST());
  try {
    const { forumId } = payload;
    const { status } = await forumService.addForumComment({ ...payload });
    if (status === 201) {
      dispatch(ADD_FORUM_COMMENT_SUCCESS());
      dispatch(getForumCommentList({ forumId }));
    } else dispatch(ADD_FORUM_COMMENT_FAILED());
  } catch (error) {
    dispatch(ADD_FORUM_COMMENT_FAILED());
  }
};

export const updateForumComment = (payload) => async (dispatch, getState) => {
  dispatch(UPDATE_FORUM_COMMENT_REQUEST());
  try {
    const { forumId } = payload;

    const { status } = await forumService.updateForumComment(payload);
    if (status === 200) {
      dispatch(UPDATE_FORUM_COMMENT_SUCCESS());
      dispatch(getForumCommentList({ forumId }));
    } else dispatch(UPDATE_FORUM_COMMENT_FAILED());
  } catch (error) {
    dispatch(UPDATE_FORUM_COMMENT_FAILED());
  }
};

export const deleteForumComment = (payload) => async (dispatch, getState) => {
  dispatch(DELETE_FORUM_COMMENT_REQUEST());
  try {
    const { forumId } = payload;
    const { status } = await forumService.deleteForumComment(payload);
    if (status === 200) {
      dispatch(DELETE_FORUM_COMMENT_SUCCESS());
      dispatch(getForumCommentList({ forumId }));
    } else dispatch(DELETE_FORUM_COMMENT_FAILED());
  } catch (error) {
    dispatch(DELETE_FORUM_COMMENT_FAILED());
  }
};
