const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access denied");
  try {
    const verify = jwt.verify(token, process.env.AUTH_TOKEN);
    // @ts-ignore
    const { _id } = verify;
    req._id = _id;
    next();
  } catch (err) {
    return res.status(400).send("invalid token");
  }
};
