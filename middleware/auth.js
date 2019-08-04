const jwt = require("jsonwebtoken");
const config = require("config");

//exporting the middleware function

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");
  //x-auth-token is header key to send the token

  //Check if not token

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    //decode the token by jwt.verify
    req.user = decoded.user;
    //take the request obj and assign the values to users
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

//if the token is there but not valid, then it is going to run catch
