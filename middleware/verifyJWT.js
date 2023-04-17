const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
  if (!token) return res.status(403).json({ message: "No access" });

  try {
    jwt.verify(token, process.env.KEY, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Invalid token" });
      req.userId = decoded._id;
      next();
    });
  } catch (err) {
    console.log(err);
    res.status(403).json({ message: "shit" });
  }
};

module.exports = verifyJWT;
