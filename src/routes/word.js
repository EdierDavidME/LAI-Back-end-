const express = require("express");
const router = express.Router();
const palabrasController = require("../controllers/controller_words");
const { auth } = require("../middlewares/autenToken");

router
  .get("/", palabrasController.index)
  .get("/new")
  .get("/my_words", auth , palabrasController.myWords)
  .get("/search", palabrasController.searchWord)
  .get("/edit/:value")
  .post(
    "/edit/:value",
    auth,
    palabrasController.findWord,
    palabrasController.editWord
  )
  .post(
    "/delete/:value",
    auth,
    palabrasController.findWord,
    palabrasController.deleteWord
  )
  .post("/new", auth, palabrasController.neWord); // Todas las palabras

module.exports = router;
