const jwt = require("jwt-simple");
const moment = require("moment");
const CONFIG = require("./../config/config");

const tokens = new Map();

const createToken = (user) => {
  const payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(CONFIG.TVENCE, CONFIG.BVENCE).unix(),
  };

  return jwt.encode(payload, CONFIG.SECRET_TOKEN);
};

const decodeToken = (token) => {
  const decoded = new Promise((resolve, reject) => {
    try {
      const payload = jwt.decode(token, CONFIG.SECRET_TOKEN);
      if (payload.exp <= moment().unix()) {
        reject({
          status: 401,
          message: "Expired token",
        });
      }
      resolve(payload.sub);
    } catch (err) {
      reject({
        status: 500,
        message: "Invalid token",
      });
    }
  });
  return decoded;
};

module.exports = {
  createToken,
  decodeToken,
  tokens,
};
