import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "auth",
  initialState: {
    notificationList: [],
  },
  reducers: {
    GET_NOTIFICATION_LIST_REQUEST: () => {},
    GET_NOTIFICATION_LIST_SUCCESS: (data, action) => {
      data.notificationList = action.payload;
    },
    GET_NOTIFICATION_LIST_FAILED: () => {},
    SET_IS_OPENED_REQUEST: () => {},
    SET_IS_OPENED_SUCCESS: () => {},
    SET_IS_OPENED_FAILED: () => {},
  },
});

export default slice.reducer;
export const {
  GET_NOTIFICATION_LIST_REQUEST,
  GET_NOTIFICATION_LIST_SUCCESS,
  GET_NOTIFICATION_LIST_FAILED,
  SET_IS_OPENED_REQUEST,
  SET_IS_OPENED_SUCCESS,
  SET_IS_OPENED_FAILED,
} = slice.actions;
