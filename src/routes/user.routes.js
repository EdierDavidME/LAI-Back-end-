const express = require("express");
const router = express.Router();
const controller_user = require("../controllers/user.controller");
const { auth } = require("../middlewares/middleware");

router.post("/", auth, controller_user.updateUsername);

module.exports = router;
