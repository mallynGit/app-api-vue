const sequelize = require("../db/connection");
const { DataTypes } = require("sequelize");



const Msg = sequelize.define(
  "msg",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id:{
        type: DataTypes.INTEGER, allowNull:false
    },
    message: {
        type: DataTypes.STRING, allowNull: false
    }
  },
  { freezeTableName: true, timestamps: true }
);

module.exports = Msg