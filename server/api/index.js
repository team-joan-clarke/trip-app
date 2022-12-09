const router = require("express").Router();

router.use("/users", require("./users"));
router.use("/userTrips", require("./userTrips"))

router.use("/tasks", require("./tasks"));

router.use("/mail", require("./mail"))

// router.use("/route2", require("./route2"));
router.use("/trips", require("./tripRoutes"));

router.use((req, res, next) => {
  const err = new Error("API route not found!");
  err.status = 404;
  next(err);
});

module.exports = router;
