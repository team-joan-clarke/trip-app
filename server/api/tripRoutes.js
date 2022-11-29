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

// get route to get all trips associated with a user ONLY
// tripRouter.get("/allUserTrips/:userId", async (req, res, next) => {
tripRouter.get("/allUserTrips/:userId", async (req, res, next) => {
  //finds all tripIds for a specific user
  const findAllTrips = await User_Trip.findAll({
    where: { UserId: req.params.userId },
  });

  // uses findAllTrips trip ids to get trips from trip table
  const allTripsForUser = await Promise.all(
    findAllTrips.map(async (trip) => {
      return await Trip.findByPk(trip.TripId);
    })
  );

  res.send(allTripsForUser).status(200);
});

// get route for trips dashboard gets active trips
tripRouter.get("/activeTrips/:userId", async (req, res, next) => {
  const findAllTripsForUser = await User_Trip.findAll({
    where: { UserId: req.params.userId },
  });

  const allActiveTripsForUser = await Promise.all(
    findAllTripsForUser.map(async (trip) => {
      return await Trip.findOne({
        where: {
          id: trip.TripId,
          status: "active",
        },
      });
    })
  );

  res.send(allActiveTripsForUser).status(200);
});

// get route for trips dashboard gets completed Trips
tripRouter.get("/completedTrips/:userId", async (req, res, next) => {
  const findAllTripsForUser = await User_Trip.findAll({
    where: { UserId: req.params.userId },
  });

  const allCompletedTripsForUser = await Promise.all(
    findAllTripsForUser.map(async (trip) => {
      return await Trip.findOne({
        where: {
          id: trip.TripId,
          status: "complete",
        },
      });
    })
  );

  res.send(allCompletedTripsForUser).status(200);
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
