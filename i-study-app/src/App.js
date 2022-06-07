import React, { useEffect } from "react";

import { Routes, Route } from "react-router-dom";
import About from "./screens/About";
import Dashboard from "./screens/Dashboard";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import ManageUser from "./screens/ManageUser";
import Welcome from "./screens/Welcome";
import RegisterUser from "./screens/RegisterUser";
import { useDispatch, useSelector } from "react-redux";
import IndexNavBar from "./screens/IndexNavBar";
import ManageClass from "./screens/ManageClass";
import AddClass from "./screens/AddClass";
import ViewClass from "./screens/ViewClass";
import ManageSubject from "./screens/ManageSubject";
import AddSubject from "./screens/AddSubject";
import ViewClassSubject from "./screens/ViewClassSubject";
import ViewClassStudent from "./screens/ViewClassStudent";
import ViewClassTimetable from "./screens/ViewClassTimeTable";
import EditClassTimetable from "./screens/EditClassTimetable";
import ViewStudentTimetable from "./screens/ViewStudentTimetable";
import { verifyToken } from "./thunks/auth";
import * as authSelectors from "./selectors/auth";
import { USER_TYPE_NUMBER } from "./utilities/constants";
import Home from "./screens/Home";
import ViewTeacherTimetable from "./screens/ViewTeacherTimetable";
import ViewStudentSubject from "./screens/ViewStudentSubject";
import ViewTeacherSubject from "./screens/ViewTeacherSubject";
import ViewTeacherSubmission from "./screens/ViewTeacherSubmission";
import ViewTeacherForum from "./screens/ViewTeacherForum";
import ViewStudentSubmission from "./screens/ViewStudentSubmission";
import ViewStudentForum from "./screens/ViewStudentForum";
import ViewStudentHomework from "./screens/ViewStudentHomework";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken !== null) dispatch(verifyToken());
  }, [dispatch]);

  const auth = useSelector((state) => state.auth);
  const userType = authSelectors.getUserType(auth);

  return (
    <Routes>
      <Route path="/" element={<IndexNavBar />}>
        <Route index element={<Welcome />} />
        <Route path="about" element={<About />} />
        {userType === 0 && <Route path="login" element={<Login />} />}
      </Route>

      <Route path="/dashboard" element={<Dashboard />}>
        {userType === USER_TYPE_NUMBER.ADMIN && (
          <>
            <Route path="" element={<ManageUser />} />
            <Route path="register_user" element={<RegisterUser />} />
            <Route path="manage_class" element={<ManageClass />} />
            <Route path="add_class" element={<AddClass />} />
            <Route path="view_class/:class_id" element={<ViewClass />} />
            <Route
              path="view_class/subject/:class_id"
              element={<ViewClassSubject />}
            />
            <Route
              path="view_class/student/:class_id"
              element={<ViewClassStudent />}
            />
            <Route
              path="view_class/timetable/:class_id"
              element={<ViewClassTimetable />}
            />
            <Route
              path="view_class/edit_timetable/:class_id"
              element={<EditClassTimetable />}
            />
            <Route path="manage_subject" element={<ManageSubject />} />
            <Route path="add_subject" element={<AddSubject />} />
          </>
        )}
        {userType !== USER_TYPE_NUMBER.ADMIN && (
          <>
            <Route path="" element={<Home />} />
            <Route path="profile" element={<Profile />} />
            {userType === USER_TYPE_NUMBER.STUDENT && (
              <>
                <Route
                  path="subject/:class_subject_id"
                  element={<ViewStudentSubject />}
                />
                <Route path="timetable" element={<ViewStudentTimetable />} />
                <Route path="homework" element={<ViewStudentHomework />} />
                <Route
                  path="submission/:submission_id"
                  element={<ViewStudentSubmission />}
                />
                <Route path="forum/:forum_id" element={<ViewStudentForum />} />
              </>
            )}
            {userType === USER_TYPE_NUMBER.TEACHER && (
              <>
                <Route
                  path="subject/:class_subject_id"
                  element={<ViewTeacherSubject />}
                />
                <Route path="timetable" element={<ViewTeacherTimetable />} />
                <Route
                  path="submission/:submission_id"
                  element={<ViewTeacherSubmission />}
                />
                <Route path="forum/:forum_id" element={<ViewTeacherForum />} />
              </>
            )}
          </>
        )}
        <Route path="*" element={<p>Page not found</p>} />
      </Route>
    </Routes>
  );
};

export default App;
