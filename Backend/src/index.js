require("dotenv").config();
const app = require('./app')
const db = require('./db/connection')
require('./models/user')
require('./models/msg')


app.createServer()
if(db.sync()) console.log('Conexion a base de datos establecida');