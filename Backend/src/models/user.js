const sequelize = require("../db/connection");
const { Sequelize, DataTypes } = require("sequelize");

const roles = ['Aficionado','Veterinario','Entrenador','Dueño']

const User = sequelize.define(
  "user",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    img: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "https://localhost:3000/uploads/default.jpg"
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { notEmpty: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { isEmail: true },
    },

    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'N',
      validate: {
        isIn: [['H','M','N']]
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: roles[0],
      validate: {
        isIn: roles
      },
      
    },
    hobbies: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
      }
    }
  },
  { freezeTableName: true, timestamps: false }
);

module.exports = User