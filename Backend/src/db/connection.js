const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('mssql://admin:123456@localhost:1433/login', {logging:false})

module.exports = sequelize