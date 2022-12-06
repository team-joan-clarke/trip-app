const {
  models: { User, User_Trip, User_Task },
} = require("../../db");

// user is logged in 
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


// isOwnerofTrip
const isOwnerofTrip = async (req, res, next) => {
  console.log("in ownerOfTrip");
  console.log("in owner userId", req.user.id);
  console.log("req.params", req.params.id)
  console.log("tripid", req.params.tripId);
  const isOwnerOfTrip = await User_Trip.findOne({
    where: {
      UserId: req.user.id,
      TripId: req.params.tripId,
      role: "owner",
    },
  });
  console.log("object for owner user", isOwnerOfTrip);

  if (!isOwnerOfTrip.role == "owner") {
    return res.status(403).send("You don't have access");
  } else {
    console.log("I HAVE ACCESS");
    next();
  }
};

// isEditorOfTrip
// const isEditorOfTrip = async (req, res, next) => {
//   console.log("in editor of trip");
//   console.log("in editor userId", req.user.id);
//   console.log("tripid", req.params.tripId);
//   const isEditorOfTrip = await User_Trip.findOne({
//     where: {
//       UserId: req.user.id,
//       TripId: req.params.tripId,
//       role: "editor",
//     },
//   });
//   if (!isEditorOfTrip.role == "editor") {
//     return res.status(403).send("You don't have access");
//   } else {
//     console.log("I HAVE ACCESS BCS TRIP EDITOR");
//     next();
//   }
// };

// isEditorOfTask
const isEditorOfTask = async (req, res, next) => {
  console.log("in editor of task");
  console.log("in editor of task userId", req.user.id);
  console.log("req.params", req.params.taskId)
  const isEditorOfTask = await User_Task.findOne({
    where: {
      UserId: req.user.id,
      TaskId: req.params.taskId,
      role: "editor",
    },
  });
  console.log("object for isEditorOfTask", isEditorOfTask);

  if (!isEditorOfTask.role == "editor") {
    return res.status(403).send("You don't have access");
  } else {
    console.log("I HAVE ACCESS bcs I am task Editor");
    next();
  }
};

module.exports = {
  requireToken,
  isOwnerofTrip,
  // isEditorOfTrip,
  isEditorOfTask
};
