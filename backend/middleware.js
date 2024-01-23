const { JWT_SECRET } = require("./config");

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer"))
    return res.status(403).json({ mess: "No header!" });
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.userId = decoded.userId;
    next();
    res.status(200).json({ mess: "pass" });
  } catch (err) {
    console.log("🚀 ~ authMiddleware ~ err:", err);
    res.status(403).json({ mess: "Not verified!" });
  }
};

module.exports = authMiddleware;
