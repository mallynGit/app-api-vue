const db = require("../db/connection");
const auth = require('../middleware/auth')
const bcrypt = require('bcrypt');
require('dotenv').config()

const token = process.env.TOKEN_SECRET
async function authVerify(req,res)  {

    authToken = req.headers.authorization
    authToken = authToken.replace("Bearer ", "")
    if(auth.verifyToken(authToken)===false){
        res.status(401).json({msg: 'No se pudo autenticar'})
    }else if(auth.verifyToken(authToken)===true){
        res.status(200).json({msg: 'Autenticacion correcta'})
    }else{
        res.status(500).json({msg: 'Algo salio mal'})
    }
    

}

module.exports.authVerify = authVerify