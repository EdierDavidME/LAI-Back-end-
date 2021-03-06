const User = require("../models/Users");

// const { ROLES } = require("../models/Roles");
const ROLES = ["user", "moderator", "admin"];

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res
          .status(400)
          .send({ message: `Role: ${req.body.roles[i]} does not exists` });
      }
    }
  }

  next();
};

const checkDuplicatedUsernameOrEmail = async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).send({ message: "The user already exists" });

  const email = await User.findOne({ email: req.body.email });
  if (email)
    return res.status(400).send({ message: "The email already exists" });

  next();
};

module.exports = {
  checkRolesExisted,
  checkDuplicatedUsernameOrEmail,
};
