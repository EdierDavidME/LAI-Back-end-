const service = require("../services/index");
const User = require("../models/Users");
const bcrypt = require("bcrypt");
const Schema_user = require("../schemas/user.schema");

const logOut = (req, res) => {
  req.session.destroy();
  res.status(200).send({ message: "Closed session" });
};

const login = async (req, res) => {
  try {
    const { error } = await Schema_user.loginUserSchema.validateAsync(req.body);
    if (error)
      return res.status(400).send({ _error: error.details[0].message });

    if (req.body.username !== "" && req.body.password !== "") {
      let data_reqget = {
        username: req.body.username,
        password: req.body.password,
      };

      const data = await User.findOne(
        { username: data_reqget.username },
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
        }
      ).populate("roles");

      if (data) {
        let userData = {
          userId: data._id,
          username: data.username,
          roles: data.roles,
          token: service.createToken(data),
        };
        res.status(200).send({ userData });
        return;
      }
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
