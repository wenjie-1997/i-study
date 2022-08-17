require("newrelic");
const express = require("express");
const cors = require("cors");
const http = require("http");
const fileupload = require("express-fileupload");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");
require("dotenv").config();

const db = require("./db");
const userRoute = require("./routers/user");
const studentRoute = require("./routers/student");
const teacherRoute = require("./routers/teacher");
const classRoute = require("./routers/class");
const subjectRoute = require("./routers/subject");
const topicRoute = require("./routers/topic");
const submissionRoute = require("./routers/submission");
const forumRoute = require("./routers/forum");
const notificationRoute = require("./routers/notification");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
  },
});
const port = process.env.PORT || 8000;

db.testConnection();

app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ extended: true, limit: "500mb" }));
app.use(cors());
app.use(
  fileupload({
    createParentPath: true,
  })
);

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("I-study index page"));
app.use("/user", userRoute);
app.use("/student", studentRoute);
app.use("/teacher", teacherRoute);
app.use("/class", classRoute);
app.use("/subject", subjectRoute);
app.use("/topic", topicRoute);
app.use("/submission", submissionRoute);
app.use("/forum", forumRoute);
app.use("/notification", notificationRoute);

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("join", (roomName) => {
    socket.join(roomName);
    console.log("a user joined a room named " + roomName);
    io.to(roomName).emit("notification", "hi");

    socket.on("disconnect", (reason) => {
      console.log("a user leave the room named " + roomName);
      socket.leave(roomName);
    });
  });
});

app.set("socketio", io);

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
