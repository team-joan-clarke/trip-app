const tripRouter = require("express").Router();
const {
  models: { Trip, Task, User, User_Trip },
} = require("../../db/index");
const Sequelize = require("sequelize");
const { requireToken } = require("./gatekeepingmiddleware");

// get route to get a single Trip uses trip id includes users and their role
tripRouter.get("/singleTrip/:tripId", requireToken, async (req, res, next) => {
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
tripRouter.get("/activeTrips/:userId", requireToken, async (req, res, next) => {
  // gets role
  const findAllTripsForUser = await User_Trip.findAll({
    where: { UserId: req.params.userId },
  });

  // trip info
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

  const activeTrips = allActiveTripsForUser.filter((singleTrip) => {
    if (singleTrip) {
      return singleTrip;
    }
  });

  for (let i = 0; i < activeTrips.length; i++) {
    for (let j = 0; j < findAllTripsForUser.length; j++) {
      if (activeTrips[i].id === findAllTripsForUser[j].TripId) {
        console.log("active trips", activeTrips[i]);
        activeTrips[i].dataValues["role"] = findAllTripsForUser[j].role;
      }
    }
  }

  res.send(activeTrips).status(200);
});

// get route for trips dashboard gets completed Trips
tripRouter.get(
  "/completedTrips/:userId",
  requireToken,
  async (req, res, next) => {
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

    const completedTrips = allCompletedTripsForUser.filter((singleTrip) => {
      if (singleTrip) {
        return singleTrip;
      }
    });

    for (let i = 0; i < completedTrips.length; i++) {
      for (let j = 0; j < findAllTripsForUser.length; j++) {
        if (completedTrips[i].id === findAllTripsForUser[j].TripId) {
          completedTrips[i].dataValues["role"] = findAllTripsForUser[j].role;
        }
      }
    }

    res.send(completedTrips).status(200);
  }
);

// post route to create a trip
tripRouter.post("/", requireToken, async (req, res, next) => {
  try {
    const { userId } = req.body;
    const makeNewTrip = await Trip.create(req.body);

    await User_Trip.create({
      role: "owner",
      UserId: userId,
      TripId: makeNewTrip.dataValues.id,
    });
    res.send(makeNewTrip).status(200);
  } catch (error) {
    next(error);
  }
});

// put route to edit a trip uses tripId to search for specific trip
tripRouter.put("/singleTrip/:tripId", requireToken, async (req, res, next) => {
  console.log("req headers in update route", req.headers);
  try {
    const findTripToUpdate = await Trip.findByPk(req.params.tripId);
    findTripToUpdate.update(req.body);
    res.send(findTripToUpdate).status(200);
  } catch (error) {
    next(error);
  }
});

// delete route to delete a trip uses tripId to search for specific trip
tripRouter.delete("/:tripId", requireToken, async (req, res, next) => {
  try {
    const findTripToDelete = await Trip.findByPk(req.params.tripId);
    findTripToDelete.destroy();
    res.send(findTripToDelete).status(200);
  } catch (error) {
    next(error);
  }
});

module.exports = tripRouter;
