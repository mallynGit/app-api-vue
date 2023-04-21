const user = require('./userroutes')
const Router = require('express').Router
const rou = Router()
const AppError = require('../AppError')
const errorHandler = require('../middleware/errorhandler')
const { NOT_FOUND } = require('../constants/errorCodes')

rou.use(errorHandler);
rou.use(function (req, res, next) {
    throw new AppError(NOT_FOUND, 404, 'not found, or invalid method')
  });


module.exports = [user, rou]