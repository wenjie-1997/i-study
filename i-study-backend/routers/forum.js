const express = require("express");
const ForumController = require("../controllers/forum");
const router = express.Router();

router.get("/", ForumController.get);
router.post("/", ForumController.post);
router.put("/", ForumController.put);
router.delete("/", ForumController.delete);

module.exports = router;
