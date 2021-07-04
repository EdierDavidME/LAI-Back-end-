const services = require("../services/index");

const auth = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[0];

    services
      .decodeToken(token)
      .then((response) => {
        req.user = response;
        next();
      })
      .catch((response) => {
        res.status(response.status).send(response.message);
        return;
      });
  } else res.status(401).send({ message: "No tiene autorización" });
};

const login = (req, res, next) => {
  if (!req.session.userId)
    res.status(511).send({ message: "User not logged in" });
  else next();
};

const csrfToken = (sessionId) => {
  const token = service.createToken(sessionId);
  const userToken = service.tokens.get(sessionId);
  userToken.add(token);
  return token;
};

const csrf = (req, res, next) => {
  const token = req.body.csrf;
  console.log("CSRF: ", csrf);

  if (!token || !service.tokens.get(req.sessionID).hash(token))
    res.status(403).send({ message: "CSRF: expired session" });
  else next();
};

module.exports = {
  login,
  csrfToken,
  csrf,
  auth,
};
