const express = require("express");
const StudentController = require("../controllers/student");
const router = express.Router();

router.get("/", StudentController.getList);
router.put("/", StudentController.put);
router.get("/search_by_name", StudentController.searchByName);
router.get("/timetable", StudentController.getTimetableByStudentId);
router.get("/subject", StudentController.getSubjectByStudentId);

module.exports = router;
