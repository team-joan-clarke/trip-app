const users = require("express").Router();
const {
  models: { User },
} = require("../../db");
const Sequelize = require("sequelize");

users.get("/", async (req, res, next) => {
  try {
    const data = await User.findAll();
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

users.get("/:id", async (req, res, next) => {
  try {
    const data = await User.findByPk(req.params.id);
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

users.put("/:id/update", async (req, res, next) => {
  try {
    const { firstName, lastName, username, email, password, phoneNumber } =
      req.body;
    const user = await User.findByPk(req.params.id);
    await user.update({
      firstName,
      lastName,
      username,
      email,
      phoneNumber,
      password,
    });
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
});

users.delete("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.status(202).send(user);
  } catch (error) {
    next(error);
  }
});

// users.post("/", async (req, res, next) => {
//   try {
//     // const {firstName, lastName, password, email, phoneNumber} = req.body;
//     const data = await User.create(req.body);
//     res.status(201).send(data);
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = users;
