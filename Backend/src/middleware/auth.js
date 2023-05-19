//aqui va toda la autenticacion con jwt
require("dotenv").config();
const jwt = require("jsonwebtoken");

function generateToken(data) {
  return jwt.sign({ data }, process.env.TOKEN_SECRET, { expiresIn: "1h" });
}

function verifyToken(token) {
  if (token === null) {
    return 401;
  }
  try {
    return jwt.verify(token, process.env.TOKEN_SECRET, function (err, decoded) {
      if (err) {
        console.log(err)
        return false;
      } else {
        return true;
      }
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports.verifyToken = verifyToken;
module.exports.generateToken = generateToken;
