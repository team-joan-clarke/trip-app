const {
  models: { User, User_Trip, User_Task },
} = require("../../db");

// checks if user is logged in
const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

// checks if user logged in is owner of trip
const isOwnerofTrip = async (req, res, next) => {
  const isOwnerOfTrip = await User_Trip.findOne({
    where: {
      UserId: req.user.id,
      TripId: req.params.tripId,
      role: "owner",
    },
  });

  if (!isOwnerOfTrip.role == "owner") {
    return res
      .status(403)
      .send("You don't have access bcs you are not trip owner");
  } else {
    console.log("I HAVE ACCESS bcs I'm trip owner");
    next();
  }
};

// checks if user logged in is owner or editor of trip
const isOwnerOrEditorOfTrip = async (req, res, next) => {
  const ownerOrEditOfTrip = await User_Trip.findOne({
    where: {
      UserId: req.user.id,
      TripId: req.params.tripId,
    },
  });

  if (
    !ownerOrEditOfTrip.role == "owner" ||
    !ownerOrEditOfTrip.role == "editor"
  ) {
    return res
      .status(403)
      .send("You don't have access bcs you are not trip owner or trip editor");
  } else {
    console.log("I have access bcs I'm trip owner or trip editor");
    next();
  }
};

// checks if user logged in is editor of a task or trip owner
// for all task routes that have trip id and task id in reqparams
// delete user from task also uses this gatekeeping middlware
const isEditorOfTaskOrTripOwner = async (req, res, next) => {
  console.log("in is editor of task or trip");
  const isEditorOfTask = await User_Task.findOne({
    where: {
      UserId: req.user.id,
      TaskId: req.params.taskId,
      role: "editor",
    },
    raw: true,
  });

  //are they also ownerOfTrip
  const isOwnerOfTrip = await User_Trip.findOne({
    where: {
      UserId: req.user.id,
      TripId: req.params.tripId,
      role: "owner",
    },
    raw: true,
  });

  if (isOwnerOfTrip || isEditorOfTask) {
    if (!isOwnerOfTrip.role == "owner") {
      if (isEditorOfTask.role === "editor") {
        console.log("I have access bcs I am task Editor or trip owner");
        next();
      }
    }
    next();
  } else {
    return res
      .status(403)
      .send("You don't have access bcs you are not task editor or trip owner");
  }
};

// checks if user logged in is editor of a task or trip owner
// for put and post user tasks routes that have req.body
const isEditorOfTaskOrTripOwnerForReqBody = async (req, res, next) => {
  console.log("task id", req.body.taskId);
  console.log("user id", req.user.id);
  const isEditorOfTaskAndHasReqBody = await User_Task.findOne({
    where: {
      UserId: req.user.id,
      TaskId: req.body.taskId,
      // role: "editor",
    },
  });

  let isEditor;
  let isOwner;
  if (isEditorOfTaskAndHasReqBody.role === "editor") {
    isEditor = true;
  } else {
    isEditor = false;
  }

  const isOwnerOfTripHasReqBody = await User_Trip.findOne({
    where: {
      UserId: req.user.id,
      TripId: req.params.tripId,
      // role: "owner",
    },
    // raw: true,
  });

  if (isOwnerOfTripHasReqBody.role === "owner") {
    isOwner = true;
  } else {
    isOwner = false;
  }

  if (isEditor || isOwner) {
    console.log(
      "In reqbody middleware, I have access bcs I am task Editor or trip owner"
    );
    next();
  } else {
    return res
      .status(403)
      .send(
        "In reqbody middleware, You don't have access bcs you are not task editor or trip owner"
      );
  }
};

module.exports = {
  requireToken,
  isOwnerofTrip,
  isOwnerOrEditorOfTrip,
  isEditorOfTaskOrTripOwnerForReqBody,
  isEditorOfTaskOrTripOwner,
};
