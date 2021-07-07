const User = require("../models/Users");
const relationshipUserWord = async(req, word_id, next) => {
  return await User.findOne(
    { $and: [{ _id: req.userId }, { books: { $in: word_id } }] },
    { _id: 0, password: 0, singUp: 0, createdAt: 0, updatedAt: 0, roles:0 }
  );
};

module.exports = {
  relationshipUserWord,
};
