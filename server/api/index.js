const router = require("express").Router();

// router.use("/route1", require("./route1"));

// router.use("/route2", require("./route2"));
router.use("/trips", require("./tripRoutes"))

router.use((req, res, next) => {
  const err = new Error("API route not found!");
  err.status = 404;
  next(err);
});

module.exports = router;
