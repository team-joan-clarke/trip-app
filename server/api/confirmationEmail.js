const mailRouter2 = require("express").Router();
const nodemailer = require("nodemailer");
const { requireToken } = require("./gatekeepingmiddleware");

mailRouter2.post("/sendEmailToPersonWhoReferred", requireToken, async (req, res) => {
  const htmlToSend = `
  <!DOCTYPE html>
  <html lang="en>
  <head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
    <meta content="telephone=no" name="format-detection">
    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport">
    <meta content="IE=edge" http-equiv="X-UA-Compatible">
    <link rel="stylesheet" href="../../index.css"/>
    <title>Confirmation email that the user you invited joined trippn</title>
  </head>
  <body>
    <table align="center">
      <tbody>
        <tr>
          <td align="center" style="background-color: #fcfaf4;">
          <img style="margin-top: 30px" alt="trippn's circular palm tree logo" src="https://github.com/team-joan-clarke/trip-app/blob/main/public/logo.png?raw=true"/>
          <h1>trippn</h1>
          <h3>Hello there trip planner 👋 </h3>
          <p>The trip planner you invited: ${req.body.firstName} has joined trippn! </p> 
          <h4>Click the button below to continue planning your trip 🗺️ </h4>
          <a href="https://trippn.onrender.com/login" style="display: inline-block;  padding: 10px 20px; width: 300px; background-color: lightseagreen; background-image: linear-gradient(115deg, lightseagreen, 68%, #bded7e);; color: #fff; text-align: center; text-decoration: none; border-radius: 10px; font-family: Arial, sans-serif;">Continue Planning</a>
          <p>trippn team ✈️ </p>
           </td>
        </tr>
      </tbody>
    </table>
  </body>
  </html>`
  

  var transporter = nodemailer.createTransport({
    port: 465,
    service: "gmail",
    auth: {
      user: "trippnwebsite@gmail.com",
      pass: process.env.APP_PASS,
    },
  })

  var mailOptions = {
    from: "trippnwebsite@gmail.com",
    to: `${req.body.doTheyHaveReferralEmail}`,
    subject: `The person you invited: ${req.body.firstName} joined trippn!`,
    html: htmlToSend,
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
