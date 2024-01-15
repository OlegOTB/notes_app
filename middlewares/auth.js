const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../constants");

function auth(req, res, next) {
  const token = req.cookies.token;
  try {
    const verifyResult = jwt.verify(token, JWT_SECRET);
    req.user = { email: verifyResult.email };
    next();
  } catch (e) {
    if (req.originalUrl.indexOf("/applicationTable") != -1) {
      res.redirect("/login");
    } else {
      req.user = { email: "patient@hospital.mir" };
    }
    next();
  }

  //   console.log(verifyResult);
}

module.exports = auth;
