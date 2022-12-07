const taskRouter = require("express").Router();
const {
  models: { Task, User, Trip, User_Task },
} = require("../../db");
const Sequelize = require("sequelize");
const User_Trip = require("../../db/models/User_Trip");
const {
  requireToken,
  isOwnerofTrip,
  isEditorOfTask,
  isOwnerOrEditorOfTrip,
  isEditorOfTaskOrTripOwner,
} = require("./gatekeepingmiddleware");

// GET TASKS BY USER ID (1 USER -> TASKS FROM ALL USER TRIPS)
//Used in Single User to render task for complete and in progress tabs
taskRouter.get("/user/:userId", requireToken, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findByPk(userId);
    if (user) {
      const data = await User.findAll({
        where: { id: userId },
        include: [
          {
            model: Task,
            include: [
              {
                model: Trip,
                attributes: ["name"],
              },
              { model: User, through: "User_Trip" },
            ],
          },
        ],
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

// GET TASKS BY TRIP ID (1 TRIP -> TRIP TASKS FOR ALL USERS)
taskRouter.get("/trip/:tripId", requireToken, async (req, res, next) => {
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

// POST A NEW TASK AND ASSIGN TO USER (MUST BE ASSIGNED TO A USER)
// adding new task in trip dash
// trip owners and editors can add new task
taskRouter.post(
  "/:tripId",
  requireToken,
  isOwnerOrEditorOfTrip,
  async (req, res, next) => {
    console.log("in post route to add a new task");
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
        userId,
        role,
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
      const user = await User.findByPk(userId);
      if (data && user) {
        const userAddedToTask = await user.addTask(data, {
          through: { role },
        });
        const tasksWithNewTask = await Trip.findAll({
          where: { id: data.TripId },
          include: [
            { model: Task, where: { id: data.id }, include: [{ model: User }] },
          ],
        });
        if (tasksWithNewTask[0]["Tasks"]) {
          const tasks = tasksWithNewTask[0]["Tasks"];
          res.status(201).send(tasks[0]);
        } else {
          console.log(new Error("Error returning tasks in Create New Task."));
        }
      } else {
        console.log(new Error("Error creating new Task."));
      }
    } catch (error) {
      next(error);
    }
  }
);

// ADD ADDITIONAL USER TO EXISTING TASK

// adding, editing, and deleting users from a trip task
// task editor and trip owner can do this ^
// task editor can only edit their tasks

taskRouter.post("/task-user/:tripId", requireToken, async (req, res, next) => {
  try {
    const { userId, taskId, role } = req.body;
    const data = await Task.findByPk(taskId);
    const user = await User.findByPk(userId);
    if (data && user) {
      const userAddedToTask = await user.addTask(data, {
        through: { role },
      });
      if (userAddedToTask) {
        const tasksWithUpdatedTask = await Trip.findAll({
          where: { id: data.TripId },
          include: [
            {
              model: Task,
              where: { id: data.id },
              include: [
                { model: User },
                {
                  model: Trip,
                  attributes: ["name"],
                },
              ],
            },
          ],
        });
        if (tasksWithUpdatedTask) {
          const tasks = tasksWithUpdatedTask[0]["Tasks"];
          res.status(201).send(tasks[0]);
        } else {
          console.log(new Error("Error returning tasks in Create Task User."));
        }
      } else {
        console.log(
          new Error("Error adding user to task in Create Task User.")
        );
      }
    } else {
      console.log(
        new Error("Error fetching task or user data in Create Task User.")
      );
    }
  } catch (error) {
    next(error);
  }
});

// REMOVE USER FROM EXISTING TASK
// owner can do
taskRouter.delete(
  "/task-user/:userId/:taskId/:tripId",
  requireToken,
  async (req, res, next) => {
    try {
      const { taskId, userId } = req.params;

      const data = await Task.findByPk(taskId);
      const user = await User.findByPk(userId);
      if (data && user) {
        const userRemovedFromTask = await user.removeTask(data);
        console.log("removed in this route", userRemovedFromTask);
        if (userRemovedFromTask) {
          const tasksWithUpdatedTask = await Trip.findAll({
            where: { id: data.TripId },
            include: [
              {
                model: Task,
                where: { id: data.id },
                include: [{ model: User }],
              },
            ],
          });
          if (tasksWithUpdatedTask) {
            const tasks = tasksWithUpdatedTask[0]["Tasks"];
            res.status(200).send(tasks[0]);
          } else {
            console.log(
              new Error("Error returning tasks in Delete Task User.")
            );
          }
        } else {
          console.log(
            new Error("Error removing user to task in Delete Task User.")
          );
        }
      } else {
        console.log(
          new Error("Error fetching task or user data in Delete Task User.")
        );
      }
    } catch (error) {
      next(error);
    }
  }
);

// UPDATE USER ROLE ON EXISTING TASK
// update on single view attendees/editor roles
taskRouter.put("/task-user/:tripId", requireToken, async (req, res, next) => {
  try {
    const { taskId, userId, role } = req.body;
    const data = await Task.findByPk(taskId);
    const user = await User.findByPk(userId);

    if (data && user && role) {
      const taskUserData = await User_Task.findOne({
        where: { UserId: userId, TaskId: taskId },
      });

      if (taskUserData) {
        const updated = await taskUserData.update({ role });
        if (updated) {
          const tasksWithUpdatedTask = await Trip.findAll({
            where: { id: data.TripId },
            include: [
              {
                model: Task,
                where: { id: data.id },
                include: [
                  { model: User },
                  {
                    model: Trip,
                    attributes: ["name"],
                  },
                ],
              },
            ],
          });
          if (tasksWithUpdatedTask[0]["Tasks"]) {
            const tasks = tasksWithUpdatedTask[0]["Tasks"];
            res.status(200).send(tasks[0]);
          } else {
            console.log(
              new Error("Error returning tasks in Update Task User.")
            );
          }
        } else {
          console.log(
            new Error("Error updating user role in Update Task User.")
          );
        }
      } else {
        console.log(new Error("Error fetching user role in Update Task User."));
      }
    } else {
      console.log(
        new Error(
          "Error fetching user, task, or role data in Update Task User."
        )
      );
    }
  } catch (error) {
    next(error);
  }
});

// DELETE TASK
// trip owner can delete a task
// if you are a trip editor lets make sure you are editor of that task
taskRouter.delete(
  "/:taskId/:tripId",
  requireToken,
  isOwnerOrEditorOfTrip,
  isEditorOfTaskOrTripOwner,
  async (req, res, next) => {
    try {
      const { taskId } = req.params;
      const data = await Task.findByPk(taskId);
      if (data) {
        const deleted = await data.destroy();
        if (deleted) {
          res.status(200).send(data);
        } else {
          console.log(new Error("Error deleting task in Delete Task."));
        }
      } else {
        console.log(new Error("Error fetching task in Delete Task"));
      }
    } catch (error) {
      next(error);
    }
  }
);

// UPDATE TASK
// trip owner can edit a task
// if you are a trip editor lets make sure you are editor of that task
taskRouter.put(
  "/:taskId/:tripId",
  requireToken,
  isOwnerOrEditorOfTrip,
  isEditorOfTaskOrTripOwner,
  async (req, res, next) => {
    console.log("in task update route");
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
            include: [
              {
                model: Task,
                where: { id: data.id },
                include: [
                  {
                    model: Trip,
                    attributes: ["name"],
                  },
                  { model: User },
                ],
              },
            ],
          });
          if (tasksWithUpdatedTask[0]["Tasks"]) {
            const tasks = tasksWithUpdatedTask[0]["Tasks"];
            res.status(200).send(tasks[0]);
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
  }
);

module.exports = taskRouter;
