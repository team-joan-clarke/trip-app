const router = require("express").Router();
const {
  models: { User },
} = require("../../db");

router.post("/login", async (req, res, next) => {
  console.log("in login route");
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const { firstName, lastName, username, password, email, phoneNumber, referralEmail } =
      req.body;
    const user = await User.create({
      firstName,
      lastName,
      username,
      password,
      email,
      phoneNumber,
      referralEmail
    });
    const token = await user.generateToken();
    user.update({ token });
    res.status(201).send(user);
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.get("/verified", async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
