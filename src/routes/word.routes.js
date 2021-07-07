const express = require("express");
const router = express.Router();
const palabrasController = require("../controllers/words.controller");
const { auth, corsOptions } = require("../middlewares/middleware");
const cors = require("cors");

router
  .get("/", palabrasController.index)
  .get("/my_words", auth, palabrasController.myWords)
  .get("/search", palabrasController.searchWord)
  .get(
    "/edit/:value",
    auth,
    palabrasController.findWord,
    palabrasController.editWord
  )
  .post(
    "/edit/:value",
    auth,
    palabrasController.updateWordUser
  )
  .delete(
    "/delete/:value",
    auth,
    palabrasController.findWord,
    palabrasController.deleteWord
  )
  .post("/new", auth, palabrasController.neWord); // Todas las palabras

module.exports = router;
