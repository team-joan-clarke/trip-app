const tripRouter = require("express").Router();
const { Trip, User_Trip, User_Task } = require("../../db/index");
const Sequelize = require("sequelize");

// get route to get a single trip based on trip id like single campus
// include tasks and user associated with trip
// two queries
// trip table to get trip
// user_trips find by tripId
// lets me find users ^ associated with trip
// tasks table has tripId find All tasks associated with a trip Id

// get a single trip include users and tasks for trip

console.log("trip table", Trip)
tripRouter.get("/:id", async (req, res, next) => {
  console.log("req.params", req.params.id);
  const findTrip = await Trip.findOne({
    where: {
      id: req.params.id,
    },
  });
  console.log("trip found", findTrip);
  res.send("found");
});

tripRouter.get("/", async (req, res, next) => {
    const findAllTrips = await Trip.findAll()
    res.send(findAllTrips)
})

// get all trip associated with that user like all campuses
// post create a trip // look at all fields needed to make a trip
// put to edit a trip we need trip id to search for that specific trip
// delete a trip need trip id to search for that specific trip

module.exports = tripRouter;
