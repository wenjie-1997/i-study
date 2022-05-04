const express = require("express");
const TeacherController = require("../controllers/teacher");
const router = express.Router();

router.get("/", TeacherController.getList);
router.put("/", TeacherController.put);
router.get("/search_by_name", TeacherController.searchByName);

module.exports = router;
