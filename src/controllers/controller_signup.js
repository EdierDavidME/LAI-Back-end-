let User = require("./../models/users");

const welcome = (req, res) => {
  res.send({ message: "ok" });
};

const registrarme = (req, res) => {
  if (req.body._id === "") {
    // console.log("Entra");
    let user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    // console.log("Iniciando guardado");
    user
      .save()
      .then((user) => {
        res.status(200).send({ message: "Registered user" });
      })
      .catch((error) => {
        let message_set = {
          type: "danger",
          intro: "Username",
          message: "User already exists",
        };
        res.status(204).send({ message_set });
      });
  }
};

module.exports = {
  registrarme,
  welcome,
};
