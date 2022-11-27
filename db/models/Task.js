const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const Task = db.define("Task", {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subtype: {
    type: DataTypes.STRING,
  },
  provider_name: {
    type: DataTypes.STRING,
  },
  due_date: {
    type: DataTypes.DATE,
  },
  start_date: {
    type: DataTypes.DATE,
  },
  end_date: {
    type: DataTypes.DATE,
  },
  start_time: {
    type: DataTypes.TIME,
  },
  end_time: {
    type: DataTypes.TIME,
  },
  checkin_time: {
    type: DataTypes.TIME,
  },
  start_location: {
    type: DataTypes.TEXT,
  },
  end_location: {
    type: DataTypes.TEXT,
  },
  description: {
    type: DataTypes.TEXT,
  },
  booking_num: {
    type: DataTypes.TEXT,
  },
  link: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.ENUM("in progress", "complete"),
  },
});

module.exports = Task;
