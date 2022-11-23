const subRouter2 = require("express").Router();
const { Thing2 } = require("../../db");
const Sequelize = require("sequelize");

subRouter2.get("/", async (req, res, next) => {
  try {
    const data = await Thing2.findAll();
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

subRouter2.post("/", async (req, res, next) => {
  try {
    const data = await Thing2.create(req.body);
    res.status(201).send(data);
  } catch (error) {
    next(error);
  }
});

subRouter2.delete("/:id", async (req, res, next) => {
  try {
    const data = await Thing2.findByPk(req.params.id);
    await data.destroy();
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

subRouter2.put("/:campusId", async (req, res, next) => {
  try {
    const data = await Thing2.findByPk(req.params.campusId);
    await data.update(req.body);
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

module.exports = subRouter2;
