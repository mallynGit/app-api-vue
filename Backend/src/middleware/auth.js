//aqui va toda la autenticacion con jwt
require('dotenv').config()
const jwt = require('jsonwebtoken');
const tryCatch = require('../utils/tryCatch');


function generateToken(data) {
  return jwt.sign({ data }, process.env.TOKEN_SECRET, { expiresIn: 60 * 100 });
}

function verifyToken(token) {
  if (token === null) {
    return 401;
  }
  try{
  return jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
    if (err){return false}else{return true}
  });
}catch(err){
console.log(err)

}


}

module.exports.verifyToken = verifyToken;
module.exports.generateToken = generateToken
