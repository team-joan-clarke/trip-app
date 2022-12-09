const mailRouter = require("express").Router();
const nodemailer = require("nodemailer");
const {
    requireToken,
    isOwnerOrEditorOfTrip,
  } = require("./gatekeepingmiddleware");

const htmlToSend = `
<!DOCTYPE html>
<html>
<head>
  <title>Invitation to trippn</title>
</head>
<body>
  <div>
    <p>Hello there, </p>
    <p>You have been invited to join trippn ✈️ </p> 
    <p>Navigate to the link below to get started https://trippn.onrender.com/signup</p>
    <p>Thanks,</p>
    <p>trippn team</p>
  </div>
</body>
</html>`;

mailRouter.post("/text-mail", requireToken, isOwnerOrEditorOfTrip, (req, res) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "trippnwebsite@gmail.com",
      pass: process.env.APP_PASS,
    },
  });

  var mailOptions = {
    from: "trippnwebsite@gmail.com",
    to: `${req.body.email}`,
    subject: "You have been invited to join trippn",
    text: "",
    html: htmlToSend
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});

module.exports = mailRouter;


