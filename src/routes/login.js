const express = require("express");
const router = express.Router();
const constroller_login = require("../controllers/controller_login");
const { auth } = require("../middlewares/autenToken");

router.get("/log_out", auth, constroller_login.logOut)
.post("/", constroller_login.login);

module.exports = router;
