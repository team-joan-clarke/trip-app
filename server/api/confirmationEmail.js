const mailRouter2 = require("express").Router();
const nodemailer = require("nodemailer");
const { requireToken } = require("./gatekeepingmiddleware");

mailRouter2.post("/sendEmailToPersonWhoReferred", requireToken, (req, res) => {
  console.log("made it to send email to person who referred");
  console.log("person invited", req.body.firstName);
  console.log("person who reffered", req.body.doTheyHaveReferralEmail);

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "trippnwebsite@gmail.com",
      pass: process.env.APP_PASS,
    },
  });

  var mailOptions = {
    from: "trippnwebsite@gmail.com",
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
