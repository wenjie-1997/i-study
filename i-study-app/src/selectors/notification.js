import _ from "lodash";

export const getNotificationList = (state) =>
  _.get(state, "notificationList", []);

export const getNotificationId = (state) => _.get(state, "notificationId", 0);
export const getCreatedDate = (state) => _.get(state, "createdDate", "");
export const getIsOpened = (state) => _.get(state, "isOpened", false);
