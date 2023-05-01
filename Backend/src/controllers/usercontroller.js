const db = require("../db/connection");
const User = require("../models/user");
const auth = require('../middleware/auth')
const AppError = require('../AppError');
const { NO_ID, BAD_REQUEST, BAD_LOGIN, ALREADY_LOGGED, NOT_LOGGED, USER_NOT_EXIST } = require("../constants/errorCodes");
const bcrypt = require('bcrypt');


const getAll = async(req,res) => {
    // res.header("Access-Control-Allow-Origin", "https://localhost:5173")
    // res.header("Access-Control-Allow-Credentials", "true")
    if(!req.cookies.token || !auth.verifyToken(req.cookies.token)){
        throw new AppError(NOT_LOGGED, 401, 'not logged in')
    }
    // console.log(req.cookies);
    // res.append('gotten', 'true')
    // res.cookie('token','aaa')
    res.json(await User.findAll())
    
}

const get = async(req,res) => {
    
    if(!req.cookies.token || !auth.verifyToken(req.cookies.token)){
        throw new AppError(NOT_LOGGED, 401, 'not logged in')
    }
    if(req.params.id===undefined) throw new AppError(NO_ID, 400)
    
    //console.log((await User.findOne({attributes: ['password'], where: {id: req.params.id}})).dataValues.password);
    res.json(await User.findAll({where: {id: req.params.id}}))

}

const update = async(req,res) => {

    if(!req.cookies.token || !auth.verifyToken(req.cookies.token)){
        throw new AppError(NOT_LOGGED, 401, 'not logged in')
    }
    if(req.params.id===undefined) throw new AppError(NO_ID, 400)
    if(!req.body || !req.body.email || (req.body.email && Object.keys(req.body).length>1)) throw new AppError(BAD_REQUEST, 400, 'comprueba la peticion')
    if(await User.update(req.body, {where: {id: req.params.id}})!==0) {
        res.send('user updated succesfully')
    }else{
        res.send('could not update user')
    }

}

const create = async(req,res) => {

    // if(!req.cookies.token || !auth.verifyToken(req.cookies.token)){
    //     throw new AppError(NOT_LOGGED, 401, 'not logged in')
    // }
    if(!req.body) throw new AppError(BAD_REQUEST, 400)
    if((await User.findOne({where:{username: req.body.username}}))!==null) throw new AppError(107, 200, 'User already exists.')
    console.log('unencrypted: '+req.body.password)
    req.body.password = await bcrypt.hash(req.body.password, 10)
    console.log('encrypted: '+req.body.password);
    res.json(await User.create(req.body))

}

const remove = async (req,res) => {

    if(!req.cookies.token || !auth.verifyToken(req.cookies.token)){
        throw new AppError(NOT_LOGGED, 401, 'not logged in')
    }
    if(!req.params.id) throw new AppError(NO_ID, 404)
    res.json(await User.destroy({where: {id: req.params.id}}))

}

const login = async (req,res)=>{

    const user = (await User.findOne({where: {username: req.body.username}}))
    
    if(user===null){throw new AppError(USER_NOT_EXIST, 404, 'usuario no existe')}

    const encPass = user.password
    const cookie = req.cookies.token

    if(!req.body || (!req.body.username || !req.body.password)) throw new AppError(BAD_REQUEST, 400, 'peticion malformada')
    if(await bcrypt.compare(req.body.password, encPass)===false) throw new AppError(BAD_LOGIN, 401, 'login incorrecto')
    if(cookie && auth.verifyToken(cookie)) throw new AppError(ALREADY_LOGGED, 301, 'sesion ya iniciada')


    const token = auth.generateToken({username: req.body.username, password: req.body.password})
    res.header("Access-Control-Allow-Origin", "https://localhost:5173")

    res.status(200).json({"token": token, "username": user.username, "email": user.email})

    

}


module.exports.getAll = getAll
module.exports.get = get
module.exports.update = update
module.exports.insert = create
module.exports.remove = remove
module.exports.login = login