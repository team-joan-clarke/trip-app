const mailRouter = require("express").Router();
const nodemailer = require("nodemailer");
const {
    requireToken,
  } = require("./gatekeepingmiddleware");

  
  mailRouter.post("/text-mail", requireToken, (req, res) => {
    console.log("in mail post route")

  const htmlToSend = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Invitation to trippn</title>
  </head>
  <body>
    <div>
      <p>Hello there, </p>
      <p>${req.body.referralEmail} has invited you to join trippn! </p> 
      <p>Upon sign up add the email of the person who invited you to the referral email input field.</p>
      <p>Navigate to the link to get started https://trippn.onrender.com/signup</p>
      <p>Thanks,</p>
      <p>trippn team ✈️ </p>
    </div>
  </body>
  </html>`;

  var transporter = nodemailer.createTransport({
    port: 587,
    service: "gmail",
    auth: {
      user: "trippnwebsite@gmail.com",
      pass: process.env.APP_PASS,
    },
  });

  var mailOptions = {
    from: "trippnwebsite@gmail.com",
    to: `${req.body.recipient}`,
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


