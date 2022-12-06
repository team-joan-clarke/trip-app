const {
  models: { User, User_Trip },
} = require("../../db");

const requireToken = async (req, res, next) => {
  console.log("in require token authorization", req.headers.authorization);
  try {
    const token = req.headers.authorization;
    console.log("token", token);
    const user = await User.findByToken(token);
    // include user_trip to get user role in trip
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

// add
// isOwnerofTrip

const isOwnerofTrip = async (req, res, next) => {
  console.log("in ownerOfTrip");
  console.log("in owner userId", req.user.id);
  console.log("tripid", req.params.tripId);
  const isOwnerOfTrip = await User_Trip.findOne({
    where: {
      UserId: req.user.id,
      TripId: req.params.tripId,
      role: "owner"
    },
  });
  console.log("object for owner user", isOwnerOfTrip)
  if(!isOwnerOfTrip.role == "owner"){
    return res.status(403).send("You don't have access")
  } else {
    console.log("I HAVE ACCESS")
    next()
  }
};
// isOwnerOfTask
// isEditorOfTrip
const isEditorOfTrip = (req, res, next) => {
  console.log("in ownerOfTrip");
  console.log("in owner userId", req.user.id);
  console.log("tripid", req.params.tripId);
}

// isEditorOfTask

module.exports = {
  requireToken,
  isOwnerofTrip,
};
