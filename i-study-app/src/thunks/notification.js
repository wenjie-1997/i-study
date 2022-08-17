import {
  GET_NOTIFICATION_LIST_FAILED,
  GET_NOTIFICATION_LIST_REQUEST,
  GET_NOTIFICATION_LIST_SUCCESS,
  SET_IS_OPENED_REQUEST,
  SET_IS_OPENED_SUCCESS,
  SET_IS_OPENED_FAILED,
} from "../reducers/notification";
import * as notificationService from "../services/notificationService";
import * as notificationSelectors from "../selectors/notification";

export const getNotificationList = () => async (dispatch, getState) => {
  dispatch(GET_NOTIFICATION_LIST_REQUEST());
  try {
    const studentId = localStorage.getItem("studentId");
    const { data, status } = await notificationService.getNotificationList({
      studentId,
    });
    if (status === 200) {
      dispatch(GET_NOTIFICATION_LIST_SUCCESS(data));
    } else dispatch(GET_NOTIFICATION_LIST_FAILED());
  } catch (error) {
    console.log(error);
    dispatch(GET_NOTIFICATION_LIST_FAILED());
  }
};

export const setNotificationIsOpened = () => async (dispatch, getState) => {
  const state = getState();
  const notification = state.notification;
  const notificationList =
    notificationSelectors.getNotificationList(notification);
  const unreadNotificationList = notificationList.filter(
    (n) => !notificationSelectors.getIsOpened(n)
  );
  if (unreadNotificationList.length > 0) {
    dispatch(SET_IS_OPENED_REQUEST());
    try {
      const { status } = await notificationService.setNotificationListIsOpened(
        unreadNotificationList.map((n) =>
          notificationSelectors.getNotificationId(n)
        )
      );
      if (status === 200) {
        dispatch(SET_IS_OPENED_SUCCESS());
      } else dispatch(SET_IS_OPENED_FAILED());
    } catch (error) {
      dispatch(SET_IS_OPENED_FAILED());
    }
  }
};
