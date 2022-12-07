const userTripsRouter = require("express").Router();
const {
  models: { User, User_Trip },
} = require("../../db/index");
const Sequelize = require("sequelize");
const {
  requireToken,
  isOwnerOrEditorOfTrip,
} = require("./gatekeepingmiddleware");

//GET ROUTE
//get all users on a single trip
userTripsRouter.get("/:tripId", async (req, res, next) => {
  try {
    const findAllUsersOnTrip = await User_Trip.findAll({
      where: { TripId: req.params.tripId },
    });

    const allUsersOnTrip = await Promise.all(
      findAllUsersOnTrip.map(async (user) => {
        return await User.findOne({
          where: {
            id: user.UserId,
          },
        });
      })
    );

    res.send(allUsersOnTrip).status(200);
  } catch (error) {
    next(error);
  }
});

//POST ROUTE
//add new user to trip
userTripsRouter.post(
  "/:tripId",
  requireToken,
  isOwnerOrEditorOfTrip,
  async (req, res, next) => {
    try {
      const createUserTrip = await User_Trip.create(req.body);
      res.status(200).send(createUserTrip);
    } catch (error) {
      next(error);
    }
  }
);

//PUT ROUTE
//update user from trip
userTripsRouter.put(
  "/:tripId",
  requireToken,
  isOwnerOrEditorOfTrip,
  async (req, res, next) => {
    try {
      const findUserTrip = await User_Trip.findOne({
        where: {
          UserId: req.body.UserId,
          TripId: req.params.tripId,
        },
      });

      await findUserTrip.update(req.body);
      res.send(findUserTrip);
    } catch (error) {
      next(error);
    }
  }
);

//DELETE ROUTE
//delete user from trip
userTripsRouter.delete(
  "/:tripId/:userId",
  requireToken,
  isOwnerOrEditorOfTrip,
  async (req, res, next) => {
    try {
      const findUserTrip = await User_Trip.findOne({
        where: {
          UserId: req.params.userId,
          TripId: req.params.tripId,
        },
      });
      await findUserTrip.destroy();
      res.send(findUserTrip);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = userTripsRouter;
