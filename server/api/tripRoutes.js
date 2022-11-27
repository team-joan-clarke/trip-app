const tripRouter = require("express").Router();
const { Trip, User_Trip, User_Task, Task, User } = require("../../db/index");
const Sequelize = require("sequelize");

// get a single Trip by trip id include users and tasks
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

    res.send({ findSingleTripAndUsers, findTasksForTripAndUsers });
  } catch (error) {
    next(error);
  }
});


// get all trip associated with that user like all campuses
// post create a trip // look at all fields needed to make a trip
// put to edit a trip we need trip id to search for that specific trip
// delete a trip need trip id to search for that specific trip

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