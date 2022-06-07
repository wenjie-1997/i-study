const express = require("express");
const TopicController = require("../controllers/topic");
const router = express.Router();

router.get("/", TopicController.get);
router.post("/", TopicController.post);
router.put("/", TopicController.put);
router.delete("/", TopicController.delete);
router.post("/component", TopicController.insertTopicComponent);
router.put("/component", TopicController.updateTopicComponent);
router.delete("/component", TopicController.deleteTopicComponent);

router.get("/download", TopicController.downloadMaterial);

module.exports = router;
