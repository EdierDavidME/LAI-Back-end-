const express = require("express");
const router = express.Router();
const constroller_login = require("../controllers/login.controller");
const { auth, corsOptions } = require("../middlewares/middleware");
const cors = require("cors");

router
  .get("/log_out", auth, constroller_login.logOut)
  .post("/", constroller_login.login);

module.exports = router;
