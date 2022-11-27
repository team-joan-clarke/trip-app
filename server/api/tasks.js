const taskRouter = require("express").Router();
const {
  models: { Task },
} = require("../../db");
const Sequelize = require("sequelize");

taskRouter.post("/", async (req, res, next) => {
  try {
    const {
      type,
      subtype,
      provider_name,
      due_date,
      start_date,
      end_date,
      start_time,
      end_time,
      checkin_time,
      start_location,
      end_location,
      description,
      booking_num,
      link,
      status,
      TripId,
    } = req.body;
    const data = await Task.create({
      type,
      subtype,
      provider_name,
      due_date,
      start_date,
      end_date,
      start_time,
      end_time,
      checkin_time,
      start_location,
      end_location,
      description,
      booking_num,
      link,
      status,
      TripId,
    });
    res.status(201).send(data);
  } catch (error) {
    next(error);
  }
});

taskRouter.delete("/:taskId", async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const data = await Task.findByPk(taskId);
    await data.destroy();
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

taskRouter.put("/:taskId", async (req, res, next) => {
  try {
    const checkedFields = {};
    const { body } = req;
    const taskFields = [
      "provider_name",
      "due_date",
      "start_date",
      "end_date",
      "start_time",
      "end_time",
      "checkin_time",
      "start_location",
      "end_location",
      "description",
      "booking_num",
      "link",
      "status",
    ];
    for (const [key, value] of Object.entries(body)) {
      console.log(key);
      if (taskFields.includes(key)) {
        checkedFields[key] = value;
      }
    }
    console.log(checkedFields);
    const { taskId } = req.params;
    const data = await Task.findByPk(taskId);
    await data.update(checkedFields);
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

module.exports = taskRouter;
