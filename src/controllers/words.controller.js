const User = require("../models/Users");
const Word = require("../models/Words");
const user_words_relationship = require("../middlewares/user.words");
const wordSchema = require("../schemas/word.schema");

const index = (req, res) => {
  Word.find({}, { _id: 0 }, (err, palabras) => {
    if (err) throw err;

    const words = {
      palabras: palabras.map((palabras) => palabras.toJSON()).reverse(),
    };
    // token: user ? "TokenValido" : "pop",
    // username: user ? user.username : "Anónimo",

    return res.send(words);
  });
  // });
};

const neWord = async (req, res, next) => {
  if (req.body.error) return res.status(404).send("Error 404 page not found!");

  const user = await User.findById(req.userId, (err, user) => {
    if (err) throw err;
  });

  if (!user) return res.status(403).send({ message: "User not found" });
  if (req.body._id === "") {
    try {
      const { error } = await wordSchema.createNewWordSchema.validateAsync(
        req.body
      );
    } catch (error) {
      if (error) {
        res.status(400).send({ _error: error.details[0].message });
        return;
      }
    }

    let word_get = new Word({
      word: req.body._word,
      espanol: req.body.espanol,
      mean: req.body.mean,
      significado: req.body.significado,
      link_get: req.body.link_get,
      image_get: req.body.image_get,
    });

    // agregar relacion libro - usuario
    word_get.save().then((word_saved) => {
      const user_words = user.books;
      user_words.push(word_saved._id);
      updateUserBooks(user._id, user_words);
    });
  } else {
    res.status(400).send({ message: "Something went wrong" });
    return;
  }
  res.status(201).send({ message: "Data saved successfully" });
  return;
};

const updateWordUser = async (req, res) => {
  const { _id, _word, mean, espanol, significado, link_get, image_get } =
    req.body;
  if (req.body.error) return res.status(404).send("Error 404 page not found!");

  const user = await user_words_relationship.relationshipUserWord(req, _id);
  if (!user) return res.status(403).send({ message: "Invalid user" });

  try {
    const { error } = await wordSchema.updateNewWordSchema.validateAsync(
      req.body
    );
  } catch (error) {
    res.status(400).send({ _error: error.details[0].message });
    return;
  }

  const word_update = {
    word: _word,
    mean: mean,
    espanol: espanol,
    significado: significado,
    link_get: link_get,
    image_get: image_get,
  };

  Word.findByIdAndUpdate(
    _id,
    { $set: word_update },
    { new: true },
    (err, model) => {
      if (err) throw err;
    }
  );

  res.status(201).send({ message: "Data saved successfully" });
  return;
};

const myWords = (req, res) => {
  User.findById({ _id: req.userId }, (err, user) => {
    if (err) throw err;
    if (!user) return res.status(400).send({ message: "User not found" });

    Word.find({ _id: { $in: user.books } }, { _id: 0 }, (err, words_list) => {
      if (err) throw err;
      if (!user) return res.status(511).send({ message: "login, please" });

      const myWords_get = {
        words: words_list.map((words_list) => words_list.toJSON()),
      };

      res.send({ myWords_get });
    });
  });
};

const editWord = async (req, res, next) => {
  if (req.body.error)
    return res.status(503).send({ message: "Something went wrong" });
  if (!req.body.word)
    return res.status(204).send({ message: "Word not found" });

  const idWord = req.body.word[0]._id;
  const user = await user_words_relationship.relationshipUserWord(req, idWord);
  if (!user) return res.status(403).send({ message: "Invalid user" });

  Word.findById(idWord, (err, word_found) => {
    if (err) throw err;
    res.status(200).send({ word_send: word_found.toJSON() });
    return;
  });
};

const deleteWord = async (req, res) => {
  if (req.body.error)
    return res.status(503).send({ message: "Something went wrong" });
  if (!req.body.word)
    return res.status(409).send({ message: "Word not found" });

  const idWord = req.body.word[0]._id;
  // console.log(idWord);
  const user = await user_words_relationship.relationshipUserWord(req, idWord);
  // console.log("user: ", user);

  if (!user) return res.status(403).send({ message: "Invalid user" });
  // console.log("User Found: ", user);

  // Eliminar el Id relacionado entre usario - palabra
  const count = user.books.splice(user.books.indexOf(idWord), 1);
  if (count.length !== 1)
    return res.status(403).send({ message: "Invalid user and word" });

  // Eliminar la palabra desde Words -> BD
  Word.findByIdAndDelete(idWord, (err) => {
    if (err) throw err;
    // Realizar cambio desde usuario -> BD
    updateUserBooks(req.userId, user.books);
    res.status(200).send({ message: "Word deleted" });
    return;
  });
};

const findWord = (req, res, next) => {
  wordId = req.params.value;
  Word.find({ _id: wordId }, (err, word_found) => {
    if (err) throw err;
    if (!word_found.length) return next();
    req.body.word = word_found;
    return next();
  });
};

const searchWord = async (req, res) => {
  if (req.body.error) {
    return res.status(503).send({ message: "Something went wrong" });
  }

  try {
    const { error } = await wordSchema.findWordSchema.validateAsync(req.body);
  } catch (error) {
    if (error) {
      res.status(400).send({ _error: error.details[0].message });
      return;
    }
  }

  const word_get = req.body.find;
  return Word.find(
    {
      $or: [
        { word: { $regex: word_get, $options: "i" } },
        { espanol: { $regex: word_get, $options: "i" } },
      ],
    },
    { _id: 0 },
    (err, word_found) => {
      if (err) throw err;
      if (!word_found.length)
        return res.status(409).send({ message: "Word not found" });

      return res.status(200).send({ word_found });
    }
  );
};

const updateUserBooks = (user_id, user_words) => {
  User.findByIdAndUpdate(
    user_id,
    { books: user_words },
    { new: true },
    (err) => {
      if (err) throw err;
    }
  );
  return;
};

module.exports = {
  index,
  neWord,
  myWords,
  findWord,
  editWord,
  deleteWord,
  updateWordUser,
  searchWord,
};
