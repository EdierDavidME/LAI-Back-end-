const User = require("./../models/users");
const Word = require("./../models/words");

const index = (req, res) => {
  // res.send({ message : "index ok"});
  // req.session.userId = "020";
  //   console.log("index");
  idUser = 020;
  user = null;
  // User.findById(idUser, (err, user)=>{
  // if (err) throw err;

  let words = null;

  Word.find((err, palabras) => {
    if (err) throw err;

    words = {
      palabras: palabras.map((palabras) => palabras.toJSON()),
      token: user ? "TokenValido" : "pop",
      username: user ? user.username : "Anónimo",
    };

    return res.send(words);
  });
  // });
};

const neWord = async (req, res, next) => {
  if (req.body.error) return res.status(404).send("Error 404 page not found!");

  //   const user = await User.findById(req.session.userId, (err, user) => {
  // if (err) throw err;
  // if (!user) return res.status(403).send({ message: "User not found" });
  if (req.body._id === "") {
    // idUser: usario._id,
    let word_get = new Word({
      idUser: req.body.idUser,
      word: req.body.word,
      espanol: req.body.espanol,
      mean: req.body.mean,
      significado: req.body.significado,
      link_get: req.body.link_get,
      image_get: req.body.image_get,
    });
    word_get.save();
  } else {
    Word.findByIdAndUpdate(
      req.body._id,
      { $set: req.body },
      { new: true },
      (err, model) => {
        if (err) throw err;
      }
    );
  }
  res.status(200).send({ message: "Data saved successfully" });
  //   });
};

const myWords = (req, res) => {
  User.findById(req.session.userId, (err, user) => {
    if (err) throw err;
    let myWords_get = null;

    Word.find({ idUser: user._id }, (err, words_list) => {
      if (err) throw err;
      if (!user) return res.status(511).send({ message: "login, please" });

      myWords_get = {
        words: words_list.map((words_list) => words_list.toJSON()),
        toke: "tokenValido",
        username: user.username,
      };

      res.send({ myWords_get });
    });
  });
};

const editWord = (req, res, next) => {
  if (req.body.error)
    return res.status(503).send({ message: "Something went wrong" });
  if (!req.body.word)
    return res.status(204).send({ message: "Word not found" });

  let idWord = req.body.word[0];
  Word.findById(idWord, (err, word_found) => {
    if (err) throw err;
    let word = {
      word_get: word_found.toJSON(),
      toke: "tokenValido",
    };

    res.send({ word });
  });
};

const deleteWord = (req, res) => {
  if (req.body.error)
    return res.status(503).send({ message: "Something went wrong" });
  if (!req.body.word)
    return res.status(409).send({ message: "Word not found" });

  const user = Word.findById(req.session.userId);
  if (!user) return res.status(403).send({ message: "User not logged in" });

  let idWord = req.body.word[0];
  Word.remove({ _id: idWord }, (err) => {
    if (err) throw err;

    res.status(200).send({ message: "Word deleted" });
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

const searchWord = (req, res) => {
  if (req.body.error)
    return res.status(503).send({ message: "Something went wrong" });

  let word_get = req.body.find;

  console.log("Buscando: ", word_get);

  return Word.find({
    $or: [
        { "word": { $regex: word_get} },
        { "espanol": { $regex: word_get} }
        ],
  }, (err, word_found) =>{
      if (err) throw err;
        console.log(word_found);
      if (!word_found.length) return res.status(409).send({ message: "Word not found" });
      
      return res.status(200).send({ word_found });
  });

};

module.exports = {
  index,
  neWord,
  myWords,
  findWord,
  editWord,
  deleteWord,
  searchWord,
};
