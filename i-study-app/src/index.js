import React from "react";
import ReactDOM from "react-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/vendor/bootstrap/css/bootstrap.min.css";
import "./assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "./assets/vendor/boxicons/css/boxicons.min.css";
import "./assets/vendor/quill/quill.snow.css";
import "./assets/vendor/quill/quill.bubble.css";
import "./assets/vendor/remixicon/remixicon.css";
import "./assets/vendor/simple-datatables/style.css";

// import "./assets/vendor/apexcharts/apexcharts.min.js";
// import "./assets/vendor/bootstrap/js/bootstrap.bundle.min.js";
// import "./assets/vendor/chart.js/chart.min.js";
// import "./assets/vendor/echarts/echarts.min.js";
// import "./assets/vendor/quill/quill.min.js";
// import "./assets/vendor/simple-datatables/simple-datatables.js";
// import "./assets/vendor/tinymce/tinymce.min.js";
// import "./assets/vendor/php-email-form/validate.js";

// import "./assets/js/main.js";
import "../src/assets/css/style.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store";
import CustomRouter from "./utilities/CustomRouter";
import history from "./utilities/history";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CustomRouter history={history}>
        <App />
      </CustomRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
