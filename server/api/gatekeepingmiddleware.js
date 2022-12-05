const {
  models: { User },
} = require("../../db");

const requireToken = async (req, res, next) => {
  console.log("in require token authorization", req.headers.authorization);
//   const parseCookie = (str) =>
//     str
//       .split(";")
//       .map((v) => v.split("="))
//       .reduce((acc, v) => {
//         acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
//         return acc;
//       }, {});

//   const cookie = parseCookie(req.headers.cookie);

  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization
      console.log("token", token);
      const user = await User.findByToken(token);
      req.user = user;
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  requireToken,
};
