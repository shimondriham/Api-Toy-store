const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  let token = req.header("x-api-key");
  if (!token) {
    return res.status(401).json({ msg: "You must send token" })
  }
  try {
    let decodToken = jwt.verify(token, "shimonSecret");
    req.userTokenData = decodToken;
    next();
  }
  catch (err) {
    console.log(err)
    res.status(401).json({ msg: "Token invalid or expired" })
  }
}
