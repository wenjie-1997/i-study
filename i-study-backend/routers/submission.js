const express = require("express");
const SubmissionController = require("../controllers/submission");
const router = express.Router();

router.get("/", SubmissionController.get);
router.get("/bySubmissionId", SubmissionController.getList);
router.post("/", SubmissionController.post);
router.put("/", SubmissionController.put);
router.delete("/", SubmissionController.delete);

router.get("/download", SubmissionController.downloadMaterial);
router.get("/homework", SubmissionController.getHomeworkList);

module.exports = router;
