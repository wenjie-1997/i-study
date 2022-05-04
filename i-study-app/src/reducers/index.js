import userReducer from "./user";
import classReducer from "./class";
import subjectReducer from "./subject";
import authReducer from './auth';
import studentReducer from './student';
import teacherReducer from './teacher';
import { combineReducers } from "@reduxjs/toolkit";

export default combineReducers({
  user: userReducer,
  class: classReducer,
  subject: subjectReducer,
  auth: authReducer,
  student:studentReducer,
  teacher: teacherReducer
});
