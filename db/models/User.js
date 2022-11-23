const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const Thing1 = db.define("User", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
  },
});

module.exports = Thing1;
