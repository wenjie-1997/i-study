const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");
const UserAuth = require("../middlewares/userAuth");

router.post("/register_student", UserController.registerStudent);
router.post("/register_teacher", UserController.registerTeacher);
router.post("/login", UserController.login);
router.get("/get_users", UserController.viewUsers);
router.get("/teachers", UserController.viewTeachers);
router.get("/", UserAuth.verifyToken, UserController.getUser);
router.delete("/", UserController.deleteUser);
router.post("/verify_token", UserAuth.verifyToken, UserController.verifyToken);
router.post("/change_password", UserController.changePassword);

module.exports = router;
