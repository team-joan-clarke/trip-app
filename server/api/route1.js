const subRouter1 = require("express").Router();
const { Thing1 } = require("../db");
const Sequelize = require("sequelize");

subRouter1.get("/", async (req, res, next) => {
  try {
    const data = await Thing1.findAll();
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

subRouter1.post("/", async (req, res, next) => {
  try {
    const data = await Thing1.create(req.body);
    res.status(201).send(data);
  } catch (error) {
    next(error);
  }
});

subRouter1.delete("/:id", async (req, res, next) => {
  try {
    const data = await Thing1.findByPk(req.params.id);
    await data.destroy();
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

subRouter1.put("/:campusId", async (req, res, next) => {
  try {
    const data = await Thing1.findByPk(req.params.campusId);
    await data.update(req.body);
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

module.exports = subRouter1;
