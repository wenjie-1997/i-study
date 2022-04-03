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
import { verifyToken } from "./thunks/user";
import IndexNavBar from "./screens/IndexNavBar";

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
      </Route>
    </Routes>
  );
};

export default App;
