const express = require("express");
const router = express.Router();
const controller_Registro = require("./../controllers/signup.controller");
const {
  checkRolesExisted,
  checkDuplicatedUsernameOrEmail,
} = require("./../middlewares/verifySignup");

router
  .get("/", controller_Registro.welcome)
  .post(
    "/",
    checkRolesExisted,
    checkDuplicatedUsernameOrEmail,
    controller_Registro.registrarme
  );

module.exports = router;
