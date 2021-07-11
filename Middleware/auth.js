require( "dotenv" ).config();
const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
	const accessToken = req.header( "Authorization" );
	const token = accessToken.replace( 'Bearer ', '' );
  if (!token) return res.status(401).json({ message: "Authentication Failed" });
  try {
    const val = jwt.verify(token, process.env.secret);
    req.user = val;
    next();
  } catch (e) {
    res.status(500).send({ message: "Token Invalid" });
  }
};