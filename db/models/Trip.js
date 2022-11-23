const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const Trip = db.define("Trip", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
  },
  state: {
    type: DataTypes.STRING,
  },
  country: {
    type: DataTypes.STRING,
  },
  start_date: {
    type: DataTypes.DATE,
  },
  end_date: {
    type: DataTypes.DATE,
  },
  status: {
    type: DataTypes.ENUM("active", "complete"),
  },
});

module.exports = Trip;
