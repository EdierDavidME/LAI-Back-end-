const express = require("express");
const router = express.Router();
const controller_user = require("../controllers/controller_user");
const { auth } = require("../middlewares/autenToken");

router.post("/", auth, controller_user.updateUsername);

module.exports = router;
