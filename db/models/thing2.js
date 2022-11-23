const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const Thing2 = db.define("User", {
  petName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  breed: {
    type: DataTypes.STRING,
  },
});

module.exports = Thing2;
