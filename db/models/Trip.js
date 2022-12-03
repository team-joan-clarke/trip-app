const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const Trip = db.define("Trip", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    defaultValue: "TBD",
  },
  state: {
    type: DataTypes.STRING,
    defaultValue: "TBD",
  },
  country: {
    type: DataTypes.STRING,
    defaultValue: "TBD",
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
  imageUrl: {
    type: DataTypes.TEXT,
    validate: {
      isUrl: true,
    },
    defaultValue:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPalFmzItiv41uwG0LGteZ-243tFftPPUb1xfU8MQNo-iEOpBBT_Kflw56iuun22IgT-M&usqp=CAU",
  },
});

module.exports = Trip;
