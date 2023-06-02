const express = require("express");
const https = require("https");
const config = require("./config");
const app = express();
const routes = require("./routes/routes");
const cors = require("cors");
const path = require("path")
const auth = require("./controllers/authcontroller")
const errorHandler = require("./middleware/errorhandler");
const cookieParser = require("cookie-parser");
const webSocket = require('ws')
const server = new webSocket.Server({port: "8080"})
const fs = require('fs')
const date = new Date(Date.now())
const today = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
const inspect = require('util').inspect
const msg = require('./models/msg')


const port = 3000;
async function createServer() {
  https.createServer(config.options, app).listen(port, () => {
    console.log(`Servidor HTTPS creado en el puerto ${port}`);
  });
  app.use(errorHandler);
  app.use(cors());
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://localhost:5173");
    res.setHeader("Access-Control-Allow-Credentials", "true")
    next();
  });
  app.use(cookieParser());
  app.use("/uploads", express.static(path.join(__dirname, "uploads")));

  //app.use(auth);
  app.use(routes);
  
  server.on('connection', socket => {
    console.log('Client connected');

    socket.on('message', message => {
      let incoming =message.toString().split(',')
      console.log(incoming);
      msg.create({user_id: incoming[0], message: incoming[2]}).then((res)=>{
        
      }).catch(err => {
        console.error(err)
      })
      // socket.send(incoming[1])
      server.clients.forEach(client => {
        
        if(client.readyState === webSocket.OPEN){
          
          client.send(incoming)
          fs.appendFile(`./logs/${today}.log`, `${message}\n`, {flag: 'a'},err=>{
            if(err) console.error(err)
          })
        }
      })
    })

    socket.on('close', (event)=>{
      console.log('Client disconnected');
    })

  })
  console.log('socket iniciado en puerto 8080');
  // app.use((err, req, res, next) => {
  //     if (! err) {
  //         return next();
  //     }
  //     console.log(err.status)
  //     res.status(500);
  //     res.send('500: Internal server error');
  // });
}

module.exports.createServer = createServer;
