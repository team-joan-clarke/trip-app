const users = require("express").Router();
const {
  models: { User },
} = require("../../db");
const Sequelize = require("sequelize");

// users.get("/", async (req, res, next) => {
//   try {
//     const data = await User.findAll();
//     res.status(200).send(data);
//   } catch (error) {
//     next(error);
//   }
// });

users.get("/:id", async (req, res, next) => {
  try {
    const data = await User.findByPk(req.params.id);
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

users.post("/", async (req, res, next) => {
  try {
    // const {firstName, lastName, password, email, phoneNumber} = req.body;
    const data = await User.create(req.body);
    res.status(201).send(data);
  } catch (error) {
    next(error);
  }
});

// users.delete("/:id", async (req, res, next) => {
//   try {
//     const data = await Thing2.findByPk(req.params.id);
//     await data.destroy();
//     res.status(200).send(data);
//   } catch (error) {
//     next(error);
//   }
// });

// users.put("/:campusId", async (req, res, next) => {
//   try {
//     const data = await Thing2.findByPk(req.params.campusId);
//     await data.update(req.body);
//     res.status(200).send(data);
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = users;
