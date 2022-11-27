const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const User_Task = db.define("user_task", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("editor", "attendee"),
  },
});

// Cart_Item.delete = async function (id) {
//   const item = await Cart_Item.findByPk(id);
//   return await item.destroy();
// };

module.exports = User_Task;
