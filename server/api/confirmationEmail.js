const mailRouter2 = require("express").Router();
const nodemailer = require("nodemailer");
const { requireToken } = require("./gatekeepingmiddleware");

mailRouter2.post("/sendEmailToPersonWhoReferred", requireToken, async (req, res) => {

  var transporter = nodemailer.createTransport({
    port: 587,
    service: "gmail",
    auth: {
      user: "trippnwebsite@gmail.com",
      pass: process.env.APP_PASS,
    },
  });

  var mailOptions = {
    from: process.env.GMAIL,
    to: `${req.body.doTheyHaveReferralEmail}`,
    subject: `The person you invited: ${req.body.firstName} joined trippn!`,
    text: `Hello there, the person you invited has joined trippn. ✈️ Navigate to the link to continue planning your trip! https://trippn.onrender.com/login thanks, trippn team`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});

module.exports = mailRouter2;
