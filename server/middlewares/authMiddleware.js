const jwt = require("jsonwebtoken");
const SECRET_KEY = `My kitty says meow...`;

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    //console.log(decoded, "decoded");
    const { id, userEmail } = decoded;
    req.user = { id, userEmail };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
