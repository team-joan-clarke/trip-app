const taskRouter = require("express").Router();
const {
  models: { Task, User, Trip },
} = require("../../db");
const Sequelize = require("sequelize");

taskRouter.get("/user/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findByPk(userId);
    if (user) {
      const data = await User.findAll({
        where: { id: userId },
        include: [{ model: Task }],
      });
      if (data) {
        const tasks = data[0]["Tasks"];
        if (tasks.length > 0) {
          res.status(200).send(tasks);
        } else {
          console.log(
            new Error("Error returning tasks for user in Get User Tasks.")
          );
        }
      } else {
        console.log(new Error("Error fetching task data in Get User Tasks."));
      }
    } else {
      console.log(new Error("Error fetching user data in Get User Tasks."));
    }
  } catch (error) {
    next(error);
  }
});

taskRouter.get("/trip/:tripId", async (req, res, next) => {
  try {
    const { tripId } = req.params;
    const trip = await User.findByPk(tripId);
    if (trip) {
      const data = await Trip.findAll({
        where: { id: tripId },
        include: [{ model: Task, include: [{ model: User }] }],
      });
      if (data) {
        const tasks = data[0]["Tasks"];
        if (tasks.length > 0) {
          res.status(200).send(tasks);
        } else {
          console.log(new Error("Error returning tasks in Get Trip Tasks."));
        }
      } else {
        console.log(new Error("Error fetching task data in Get Trip Tasks."));
      }
    } else {
      console.log(new Error("Error fetching user data in Get Trip Tasks."));
    }
  } catch (error) {
    next(error);
  }
});

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
    if (data) {
      const tasksWithNewTask = await Trip.findAll({
        where: { id: data.TripId },
        include: [{ model: Task, include: [{ model: User }] }],
      });
      if (tasksWithNewTask[0]["Tasks"]) {
        const tasks = tasksWithNewTask[0]["Tasks"];
        res.status(201).send(tasks);
      } else {
        console.log(new Error("Error returning tasks in Create New Task."));
      }
    } else {
      console.log(new Error("Error creating new Task."));
    }
  } catch (error) {
    next(error);
  }
});

taskRouter.delete("/:taskId", async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const data = await Task.findByPk(taskId);
    if (data) {
      const deleted = await data.destroy();
      if (deleted) {
        const tasksWithoutDeletedTask = await Trip.findAll({
          where: { id: data.TripId },
          include: [{ model: Task, include: [{ model: User }] }],
        });
        if (tasksWithoutDeletedTask[0]["Tasks"]) {
          const tasks = tasksWithoutDeletedTask[0]["Tasks"];
          res.status(200).send(tasks);
        } else {
          console.log(new Error("Error returning tasks in Delete Task."));
        }
      } else {
        console.log(new Error("Error deleting task in Delete Task."));
      }
    } else {
      console.log(new Error("Error fetching task in Delete Task"));
    }
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
      if (taskFields.includes(key)) {
        checkedFields[key] = value;
      }
    }
    const { taskId } = req.params;
    const data = await Task.findByPk(taskId);

    if (data) {
      const updated = await data.update(checkedFields);
      if (updated) {
        const tasksWithUpdatedTask = await Trip.findAll({
          where: { id: data.TripId },
          include: [{ model: Task, include: [{ model: User }] }],
        });
        if (tasksWithUpdatedTask[0]["Tasks"]) {
          const tasks = tasksWithUpdatedTask[0]["Tasks"];
          res.status(200).send(tasks);
        } else {
          console.log(new Error("Error returning tasks in Update Task."));
        }
      } else {
        console.log(new Error("Error updating task in Update Task."));
      }
    } else {
      console.log(new Error("Error fetching task in Update Task."));
    }
  } catch (error) {
    next(error);
  }
});

module.exports = taskRouter;
