const express = require("express");
const https = require("https");
const config = require("./config");
const app = express();
const routes = require("./routes/routes");
const cors = require("cors");

const errorHandler = require("./middleware/errorhandler");
const cookieParser = require("cookie-parser");

const port = 3000;
async function createServer() {
  https.createServer(config.options, app).listen(port, () => {
    console.log(`Servidor HTTPS creado en el puerto ${port}`);
  });
  app.use(cors());
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://localhost:5173");
    res.setHeader("Access-Control-Allow-Credentials", "true")
    next();
  });
  app.use(cookieParser());
  
  app.use(routes);
  app.use(errorHandler);
  
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
