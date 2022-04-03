const jwt = require("jsonwebtoken");
const constants = require("../utilities/constants");

class UserAuth {
  verifyToken = (req, res, next) => {
    const token =
      req.headers.authorization ||
      req.body.token ||
      req.query.token ||
      req.headers["x-access-token"];
    if (!token || !token.includes("Bearer ")) {
      return res.status(403).send("A token is required for authentication");
    }
    try {
      const decoded = jwt.verify(
        token.replace("Bearer ", ""),
        constants.TOKEN_KEY
      );
      req.user = decoded;
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
    return next();
  };
}

module.exports = new UserAuth();
