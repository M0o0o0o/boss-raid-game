const express = require("express");
const router = express.Router();

const { userController } = require("../controllers");

router.post("/", userController.addUser);
router.get("/:userId", userController.getUserRecord);

module.exports = router;
