import React, { useEffect } from "react";

import { Routes, Route } from "react-router-dom";
import About from "./screens/About";
import Dashboard from "./screens/Dashboard";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import ManageUser from "./screens/ManageUser";
import Welcome from "./screens/Welcome";
import RegisterUser from "./screens/RegisterUser";
import { useDispatch } from "react-redux";
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

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken !== null) dispatch(verifyToken());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<IndexNavBar />}>
        <Route index element={<Welcome />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
      </Route>
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="profile" element={<Profile />} />
        <Route path="manage_user" element={<ManageUser />} />
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
        <Route path="timetable" element={<ViewStudentTimetable />} />
      </Route>
    </Routes>
  );
};

export default App;
