// const {  } = require('../middlewares/autenToken');
const service = require("../services/index");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const schema = require("../schemas/schema_user");

const updateUsername = async (req, res) => {
  try {
    const { error } = await schema.updateUserSchema.validateAsync(req.body);
    if (error) {
      return res.status(400).send({ _error: error.details[0].message });
    }

    let userData = {
      currentName: req.body.currentName,
      newName: req.body.newName,
      password: req.body.password,
    };

    const data = await User.findOne(
      { username: userData.currentName },
      (erro, user_found) => {
        if (erro) throw erro;

        if (
          !user_found ||
          !bcrypt.compareSync(userData.password, user_found.password)
        ) {
          let message = (req.session.message = {
            type: "danger",
            intro: "info",
            message: "invalid username or password",
          });
          res.status(204).send({ message });
          return;
        }

        User.findByIdAndUpdate(
          user_found._id,
          { username: userData.newName },
          { new: true },
          (err, model) => {
            if (err) throw err;
          }
        );

        let _userData = {
          userId: user_found._id,
          username: userData.newName,
          token: service.createToken(user_found)
        };

        res.status(200).send({ _userData });
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(400).send({ _error: error.details[0].message });
  }
};

module.exports = {
  updateUsername,
};
