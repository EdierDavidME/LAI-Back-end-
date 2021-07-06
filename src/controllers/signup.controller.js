let User = require("../models/Users");
let Role = require("../models/Roles");

const welcome = (req, res) => {
  res.send({ message: "ok" });
};

const registrarme = async (req, res) => {
  if (req.body._id === "") {
    // console.log("Entra");
    const { roles } = req.body;

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    if (roles) {
      const roles_found = await Role.find({ name: { $in: roles } });
      newUser.roles = roles_found.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "user" });
      newUser.roles = [role._id];
    }

    // console.log("Iniciando guardado");
    newUser
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
