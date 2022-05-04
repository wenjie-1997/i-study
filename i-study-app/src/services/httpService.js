import axios from "axios";
import { logout } from "../thunks/auth";
import store from "../store";

const instance = axios.create({
  baseURL: "http://localhost:8000/",
  timeout: 10000,
});

instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("accessToken");
    config.headers["Authorization"] = token ? `Bearer ${token}` : "";
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (
      (error.response.status === 403 || error.response.status === 401) &&
      !originalRequest._retry
    ) {
      store.dispatch(logout());
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    return Promise.reject(error);
  }
);

export default instance;
