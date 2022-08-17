const express = require("express");
const NotificationController = require("../controllers/notification");
const router = express.Router();

router.get("/", NotificationController.get);
router.put("/", NotificationController.put);

module.exports = router;
