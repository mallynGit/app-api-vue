const db = require("../db/connection");
const User = require("../models/user");
const multer = require("../middleware/multer");
const auth = require("../middleware/auth");
const AppError = require("../AppError");
const {
  NO_ID,
  BAD_REQUEST,
  BAD_LOGIN,
  ALREADY_LOGGED,
  NOT_LOGGED,
  USER_NOT_EXIST,
} = require("../constants/errorCodes");
const bcrypt = require("bcrypt");

const uploadUrl = "https://localhost:3000/uploads/"
const getAll = async (req, res) => {
  // res.header("Access-Control-Allow-Origin", "https://localhost:5173")
  // res.header("Access-Control-Allow-Credentials", "true")
  if (
    !req.headers.authorization ||
    !auth.verifyToken(req.headers.authorization)
  ) {
    throw new AppError(NOT_LOGGED, 401, "not logged in");
  }
  // console.log(req.cookies);
  // res.append('gotten', 'true')
  // res.cookie('token','aaa')
  res.json(await User.findAll());
};

const get = async (req, res) => {
  console.log(req.headers.authorization);
  console.log("HOLIIKOI!UUIOJHO:", auth.verifyToken(req.headers.authorization));
  if (
    !req.headers.authorization ||
    !auth.verifyToken(req.headers.authorization)
  ) {
    throw new AppError(NOT_LOGGED, 401, "not logged in");
  }
  const decodToken = JSON.parse(
    atob(req.headers.authorization.split(".")[1])
  ).data;
  console.log("token decoficidado", decodToken.id);
  if (decodToken.id === undefined) throw new AppError(NO_ID, 400);

  const user = await User.findOne({ where: { id: decodToken.id } });
  delete user.dataValues.password;
  delete user.dataValues.id;
  //console.log((await User.findOne({attributes: ['password'], where: {id: req.params.id}})).dataValues.password);
  res.send(user.dataValues);
};

const update = async (req, res) => {
  if (
    !req.headers.authorization ||
    !auth.verifyToken(req.headers.authorization)
  ) {
    throw new AppError(NOT_LOGGED, 401, "not logged in");
  }
  if (req.params.id === undefined) throw new AppError(NO_ID, 400);
  if (
    !req.body ||
    !req.body.email ||
    (req.body.email && Object.keys(req.body).length > 1)
  )
    throw new AppError(BAD_REQUEST, 400, "comprueba la peticion");
  if ((await User.update(req.body, { where: { id: req.params.id } })) !== 0) {
    res.send("user updated succesfully");
  } else {
    res.send("could not update user");
  }
};

const create = async (req, res) => {
  if (
    !req.headers.authorization ||
    !auth.verifyToken(req.headers.authorization)
  ) {
    throw new AppError(NOT_LOGGED, 401, "not logged in");
  }
  if (!req.body) throw new AppError(BAD_REQUEST, 400);
  if ((await User.findOne({ where: { username: req.body.username } })) !== null)
    throw new AppError(107, 200, "User already exists.");
  console.log("unencrypted: " + req.body.password);
  body = req.body;
  req.body.password = await bcrypt.hash(req.body.password, 10);
  console.log("encrypted: " + req.body.password);
  await User.create(req.body);
  res.json(body);
};

const remove = async (req, res) => {
  if (
    !req.headers.authorization ||
    !auth.verifyToken(req.headers.authorization)
  ) {
    throw new AppError(NOT_LOGGED, 401, "not logged in");
  }
  if (!req.params.id) throw new AppError(NO_ID, 404);
  res.json(await User.destroy({ where: { id: req.params.id } }));
};

const login = async (request, response) => {
  const user = await User.findOne({
    where: { username: request.body.username },
  });

  if (user === null) {
    throw new AppError(USER_NOT_EXIST, 404, "usuario no existe");
  }

  const encPass = user.dataValues.password;

  if (!request.body || !request.body.username || !request.body.password)
    throw new AppError(BAD_REQUEST, 400, "peticion malformada");
  if ((await bcrypt.compare(request.body.password, encPass)) === false)
    throw new AppError(BAD_LOGIN, 401, "login incorrecto");
  if (
    request.headers.authorization &&
    auth.verifyToken(request.headers.authorization)
  )
    throw new AppError(ALREADY_LOGGED, 301, "sesion ya iniciada");

  //console.log(req.body);
  delete user.dataValues.password;
  

  const token = auth.generateToken(user.dataValues);
  response.header("Access-Control-Allow-Origin", "https://localhost:5173");

  // console.log(token)
  response.status(200).json({ token: token });
};

const register = async (req, res) => {
  console.log(req.body);
  if (req.body.email === "") delete req.body.email;
  const unencrypted = req.body.password;
  if (!req.body || !req.body.username || !req.body.password)
    throw new AppError(BAD_REQUEST, 400, "peticion malformada");
  if ((await User.findOne({ where: { username: req.body.username } })) !== null)
    throw new AppError(107, 200, "User already exists.");
  req.body.password = await bcrypt.hash(req.body.password, 10);
  console.log("UNENCRYPTED", unencrypted);
  const u = await User.create(req.body);
  req.body.password = unencrypted;

  console.log("go", u);

  login(req, res);
};

const uploadImg = async (req, res) => {
  //guardo el mimetype para poder mostrarlo correctamente en el frontend
  console.log(
    "body:",
    req.body,

    "\n",
    req.files,
    "\n mimetype",
    req.file.mimetype
  );
const user = await User.findOne({where: {id: req.body.id}})
console.log(user.img);
user.img = req.file.filename
await user.save()
console.log(user.img);
  res.send("ok");
};

const getImg = async (req, res) => {
  //cuando la url lleva parametro a lo ?id=1, se almacena en req.query
  console.log("ID IMG", req.query.id);

  
  
  const decodToken = JSON.parse(
    atob(req.headers.authorization.split(".")[1])
  ).data;

  const user = await User.findOne({ where: { id: decodToken.id } });
  let img = user.dataValues.img;
  
  console.log("USER GETIMG", decodToken);
  console.log("USER DATA", img, uploadUrl+img);

  res.json({ img: uploadUrl+img });
};

module.exports.getAll = getAll;
module.exports.get = get;
module.exports.update = update;
module.exports.insert = create;
module.exports.remove = remove;
module.exports.login = login;
module.exports.register = register;
module.exports.uploadImg = uploadImg;
module.exports.getImg = getImg;
