const jwt = require("jsonwebtoken");
const {config} = require("../config/secret");


exports.auth = (req, res, next) => {
  let token = req.header("x-api-key");
  if (!token) {
    return res.status(401).json({ msg: "You must send token" })
  }
  try {
    let decodToken = jwt.verify(token, config.TokenSecret);
    req.userTokenData = decodToken;
    next();
  }
  catch (err) {
    console.log(err)
    res.status(401).json({ msg: "Token invalid or expired" })
  }
}
