const Router = require('express').Router
const rou = Router()
const db = require('../db/connection')
const {get, update, getAll, remove, insert, login, register, uploadImg, getImg} = require('../controllers/usercontroller')
const bodyParser = require('body-parser')
const tryCatch = require('../utils/tryCatch')
const jsonParser = bodyParser.json()
const AppError = require('../AppError')
const {authVerify} = require('../controllers/authcontroller')
const multer = require('multer')
const upload = multer()


rou.get('/getAllUsers', tryCatch(getAll))
rou.delete('/deleteUser/:id', tryCatch(remove))
rou.post('/createUser', jsonParser, tryCatch(insert))
rou.get('/getUser/:id', tryCatch(get))
rou.put('/updateUser/:id', jsonParser, tryCatch(update))
rou.post('/login',jsonParser, tryCatch(login))
rou.post('/auth', tryCatch(authVerify))
rou.post('/register', jsonParser, tryCatch(register))
rou.post('/uploadImg', upload.single('image'), tryCatch(uploadImg))
rou.get('/getImg/:id', tryCatch(getImg))

module.exports = rou