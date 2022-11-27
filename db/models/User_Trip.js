const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const User_Trip = db.define("user_trip", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("owner", "editor", "attendee"),
  },
});

// Cart_Item.delete = async function (id) {
//   const item = await Cart_Item.findByPk(id);
//   return await item.destroy();
// };

module.exports = User_Trip;
