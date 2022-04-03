const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./db");
const UserAuth = require("./middlewares/userAuth");
const userRoute = require("./routers/user");
const studentRoute = require("./routers/student");
const teacherRoute = require("./routers/teacher");

const app = express();
const port = 3000;

db.testConnection();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());

// app.use(express.static("images"));

app.get("/", (req, res) => res.send("I-study index page"));
app.use("/user", userRoute);
app.use("/student", studentRoute);
app.use("/teacher", teacherRoute);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
