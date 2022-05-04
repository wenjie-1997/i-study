const express = require("express");
const SubjectController = require("../controllers/subject");
const router = express.Router();

router.get("/", SubjectController.get);
router.post("/", SubjectController.post);
router.put("/", SubjectController.put);
router.delete("/", SubjectController.delete);

module.exports = router;
