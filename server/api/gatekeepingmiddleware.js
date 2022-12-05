const {
  models: { User },
} = require("../../db");

const requireToken = async (req, res, next) => {
  console.log("in require token authorization", req.headers.authorization);
  try {
      const token = req.headers.authorization
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
// isOwnerOfTask
// isEditorOfTrip
// isEditorOfTask

module.exports = {
  requireToken,
};
