import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "forum",
  initialState: { forumCommentList: [] },
  reducers: {
    GET_FORUM_COMMENT_LIST_REQUEST: () => {},
    GET_FORUM_COMMENT_LIST_SUCCESS: (state, action) => {
      state.forumCommentList = action.payload;
    },
    GET_FORUM_COMMENT_LIST_FAILED: (state) => {
      state.forumCommentList = [];
    },

    ADD_FORUM_COMMENT_REQUEST: () => {},
    ADD_FORUM_COMMENT_SUCCESS: () => {},
    ADD_FORUM_COMMENT_FAILED: () => {},
    UPDATE_FORUM_COMMENT_REQUEST: () => {},
    UPDATE_FORUM_COMMENT_SUCCESS: () => {},
    UPDATE_FORUM_COMMENT_FAILED: () => {},
    DELETE_FORUM_COMMENT_REQUEST: () => {},
    DELETE_FORUM_COMMENT_SUCCESS: () => {},
    DELETE_FORUM_COMMENT_FAILED: () => {},
  },
});

export const {
  GET_FORUM_COMMENT_LIST_REQUEST,
  GET_FORUM_COMMENT_LIST_SUCCESS,
  GET_FORUM_COMMENT_LIST_FAILED,
  GET_FORUM_COMMENT_REQUEST,
  GET_FORUM_COMMENT_SUCCESS,
  GET_FORUM_COMMENT_FAILED,
  ADD_FORUM_COMMENT_REQUEST,
  ADD_FORUM_COMMENT_SUCCESS,
  ADD_FORUM_COMMENT_FAILED,
  UPDATE_FORUM_COMMENT_REQUEST,
  UPDATE_FORUM_COMMENT_SUCCESS,
  UPDATE_FORUM_COMMENT_FAILED,
  DELETE_FORUM_COMMENT_REQUEST,
  DELETE_FORUM_COMMENT_SUCCESS,
  DELETE_FORUM_COMMENT_FAILED,
} = slice.actions;
export default slice.reducer;
