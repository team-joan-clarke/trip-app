const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const User = db.define("User", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  token: {
    type: DataTypes.TEXT,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  phoneNumber: {
    type: DataTypes.STRING,
  },
  // interests: {
  //   type: DataTypes.STRING,
  //   status:{
  //     type: DataTypes.ENUM("green", "red")
  //   }

  // },
});

module.exports = User;
