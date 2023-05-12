const sequelize = require("../db/connection");
const { Sequelize, DataTypes } = require("sequelize");
const User = require("./user");
const fs =require('fs')
const buffer = fs.readFileSync("C:\\Users\\marl\\Desktop\\FrontBack\\app-api-vue\\Backend\\src\\resources\\default.jpg")

const UserImages = sequelize.define(
  "userimg",
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "User",
        key: "id",
        onDelete: 'CASCADE',
      },
      onDelete: 'CASCADE'
    },
    img: {
      type: DataTypes.BLOB,
      allowNull: true,
      defaultValue: buffer
    },
    imgName: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        isAlphanumeric: true,
      },
    },
    imgExtension: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  { freezeTableName: true, timestamps: false }
);

// UserImages.belongsTo(User, {
//     foreignKey:{
//         name: 'userId',
//         primaryKey: true
//     }
// })

module.exports = UserImages;
