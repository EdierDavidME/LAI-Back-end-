const service = require("../services/index");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const Schema_user = require("../schemas/schema_user");

const logOut = (req, res) => {
  req.session.destroy();
  res.status(200).send({ message: "Closed session" });
};

const login = async (req, res) => {
  try {
    const { error } = await Schema_user.loginUserSchema.validateAsync(req.body);
    if (error)
      return res.status(400).send({ _error: error.details[0].message });

    if (
      req.body.username !== "" &&
      req.body.password !== ""
    ) {
      let data_reqget = {
        username: req.body.username,
        password: req.body.password,
      };

      const data = await User.findOne(
        { "username": data_reqget.username },
        (error, user_found) => {
          if (error) throw error;

          if (
            !user_found ||
            !bcrypt.compareSync(data_reqget.password, user_found.password)
          ) {

            let message_ = {
              type: "danger",
              intro: "info",
              message: "invalid username or password",
            };
            res.status(204).send({ message: message_ });
            return;
          }

          let userData = {
            userId: user_found._id,
            username: user_found.username,
            token: service.createToken(user_found),
          };

          res.status(200).send({ userData });
          return;
        }
      );
    }
  } catch (error) {
    console.log("-------------------->", error);
    res.status(400).send({ _error: error.details[0].message });
  }
};

module.exports = {
  logOut,
  login,
};
