import userReducer from "./user";
import { combineReducers } from "@reduxjs/toolkit";

export default combineReducers({
  user: userReducer,
});
