const express = require("express");
const ClassController = require("../controllers/class");
const router = express.Router();

router.get("/", ClassController.getClassList);
router.post("/", ClassController.insertClass);
router.put("/", ClassController.updateClass);
router.delete("/", ClassController.deleteClass);
router.get("/subject", ClassController.getClassSubject);
router.post("/subject", ClassController.insertClassSubject);
router.delete("/subject", ClassController.deleteClassSubject);
router.get("/student", ClassController.getClassStudent);
router.post("/student", ClassController.insertClassStudent);
router.delete("/student", ClassController.deleteClassStudent);
router.get("/timetable", ClassController.getClassTimetable);
router.put("/timetable", ClassController.updateClassTimetable);

module.exports = router;
