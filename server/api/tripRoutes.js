const tripRouter = require("express").Router();
const { Trip, Task, User } = require("../../db/index");
const Sequelize = require("sequelize");

// get route to get a single Trip by trip id includes users and tasks
tripRouter.get("/:tripId", async (req, res, next) => {
  try {
    const findSingleTripAndUsers = await Trip.findOne({
      where: { id: req.params.tripId },
      include: {
        model: User,
        through: "User_Trip",
      },
    });

    const findTasksForTripAndUsers = await Task.findAll({
      where: { TripId: req.params.tripId },
      include: {
        model: User,
        through: "User_Tasks",
      },
    });

    res.send({ findSingleTripAndUsers, findTasksForTripAndUsers }).status(200);
  } catch (error) {
    next(error);
  }
});

// post route to create a trip
tripRouter.post("/", async (req, res, next) => {
  console.log("req body", req.body);
  try {
    const makeNewTrip = await Trip.create(req.body);
    res.send(makeNewTrip).status(200);
  } catch (error) {
    next(error);
  }
});

// put route to edit a trip we need trip id to search for that specific trip
tripRouter.put("/:tripId", async (req, res, next) => {
  try {
    const findTripToUpdate = await Trip.findByPk(req.params.tripId);
    findTripToUpdate.update(req.body);
    res.send(findTripToUpdate).status(200);
  } catch (error) {
    next(error);
  }
});

// delete a trip need trip id to search for that specific trip
tripRouter.delete("/:tripId", async (req, res, next) => {
  try {
    const findTripToDelete = await Trip.findByPk(req.params.tripId);
    findTripToDelete.destroy()
    res.send(findTripToDelete).status(200)
  } catch (error) {
    next(error);
  }
});

module.exports = tripRouter;

// // get all trips associated with a user
// tripRouter.get("/allUserTrips/:userId", async (req, res, next) => {
//   const findAllTrips = await User_Trip.findAll({
//     where: {
//       UserId: req.params.userId,
//     },
//   });
//   res.send(findAllTrips);
// });
