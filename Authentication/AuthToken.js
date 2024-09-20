const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const AuthToken = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      req.user = decoded;
      next();
    });
  } catch (err) {
    return res.status(401).json({ message: `Server Error in ath: ${err}` });
  }
};
module.exports = AuthToken;
