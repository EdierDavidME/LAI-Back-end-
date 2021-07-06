const Rol = require("../models/Roles");
const User = require("../models/Users");

const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.userId);
  const roles = await Rol.find({ _id: { $in: user.roles } });

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "admin") next();
    next();
    return;
  }

  return res.status(403).send({ message: "Requier admin role" });
};

const isModerator = async (req, res, next) => {
  const user = await User.findById(req.userId);
  const roles = await Rol.find({ _id: { $in: user.roles } });

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "moderator") next();
    next();
    return;
  }

  return res.status(403).send({ message: "Requier Moderator role" });
};

module.exports = {
  isAdmin,
  isModerator,
};
