const tripRouter = require("express").Router();
const {
  models: { Trip, Task, User, User_Trip },
} = require("../../db/index");
const Sequelize = require("sequelize");

// get route to get a single Trip uses trip id includes users and their role
tripRouter.get("/singleTrip/:tripId", async (req, res, next) => {
  try {
    const findSingleTripAndUsers = await Trip.findOne({
      where: { id: req.params.tripId },
      include: {
        model: User,
        through: "User_Trip",
      },
    });
    res.send(findSingleTripAndUsers).status(200);
  } catch (error) {
    next(error);
  }
});

// get route to get all trips associated with a user no tasks
tripRouter.get("/allUserTrips/:userId", async (req, res, next) => {
  const findAllTrips = await User_Trip.findAll({
    where: { UserId: req.params.userId },
  });

  const allTripsForUser = await Promise.all(findAllTrips.map(async (trip) => {
    return await Trip.findByPk(trip.TripId)
  }));

  res.send(allTripsForUser);
});

// post route to create a trip
tripRouter.post("/", async (req, res, next) => {
  try {
    const makeNewTrip = await Trip.create(req.body);
    res.send(makeNewTrip).status(200);
  } catch (error) {
    next(error);
  }
});

// put route to edit a trip uses tripId to search for specific trip
tripRouter.put("/:tripId", async (req, res, next) => {
  try {
    const findTripToUpdate = await Trip.findByPk(req.params.tripId);
    findTripToUpdate.update(req.body);
    res.send(findTripToUpdate).status(200);
  } catch (error) {
    next(error);
  }
});

// delete route to delete a trip uses tripId to search for specific trip
tripRouter.delete("/:tripId", async (req, res, next) => {
  try {
    const findTripToDelete = await Trip.findByPk(req.params.tripId);
    findTripToDelete.destroy();
    res.send(findTripToDelete).status(200);
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
