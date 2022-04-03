const express = require("express");
const StudentController = require("../controllers/student");
const router = express.Router();

router.get("/", StudentController.getList);
router.put("/", StudentController.put);

module.exports = router;
