const express = require("express");
const router = express.Router();
const controller_Registro = require("./../controllers/controller_signup");

router
  .get("/", controller_Registro.welcome)
  .post("/", controller_Registro.registrarme);

module.exports = router;
