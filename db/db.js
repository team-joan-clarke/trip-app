const { Sequelize } = require("sequelize");
const dbUrl = process.env.DATABASE_URL || `postgres://localhost:5432/trip-app`;

let config;
if (process.env.DATABASE_URL) {
  config = {
    logging: false,
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  };
} else {
  config = {
    logging: false,
  };
}
const db = new Sequelize(dbUrl, config);

module.exports = db;
