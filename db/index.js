const db = require("./db");
const Thing1 = require("./models/thing1");
const Thing2 = require("./models/thing2");

//associations could go here!

Thing1.hasMany(Thing2);
Thing2.belongsTo(Thing1);

module.exports = {
  db,
  models: {
    Thing1,
    Thing2,
  },
};
