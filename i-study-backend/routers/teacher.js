const express = require("express");
const TeacherController = require("../controllers/teacher");
const router = express.Router();

router.get("/", TeacherController.getList);
router.put("/", TeacherController.put);

module.exports = router;
