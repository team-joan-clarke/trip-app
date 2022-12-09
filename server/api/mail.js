const mailRouter = require("express").Router();
const sendgridTransport = require("nodemailer-sendgrid-transport");
const nodemailer = require("nodemailer");

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

mailRouter.post("/text-mail", (req, res) => {
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

// const transport = nodemailer.createTransport(sendgridTransport({
//     auth: {
//         api_key: "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"
//     }
// }))

// mailRouter.post("/text-mail", (req, res) => {
//   const sgMail = require("@sendgrid/mail");
//   sgMail.setApiKey(
//     "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"
//   );
//   const msg = {
//     to: "ashley.valenzuela73@yahoo.com",
//     from: "trippnwebsite@gmail.com",
//     subject: "Sending with SendGrid is Fun",
//     text: "and easy to do anywhere, even with Node.js",
//     html: "<strong>and easy to do anywhere, even with Node.js</strong>",
//   };
//   sgMail
//     .send(msg)
//     .then(() => {
//       console.log("Email sent");
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// })

//   const transport = nodemailer.createTransport(
//     sendgridTransport({
//       auth: {
//         api_key:
//           "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",
//       },
//     })
//   );

//   transport
//     .sendMail({
//       to: "anahisvq7@gmail.com",
//       from: 'trippnwebsite@gmail.com',
//       subject: "Test Email",
//       html: "<h2>Some email content</h2>",
//     })
//     .then(console.log("Success!"))
//     .catch((err) => console.log(err));

// mailRouter.post("/text-mail", (req, res) => {
//     require('dotenv').config()
//     const sgMail = require('@sendgrid/mail')
//     sgMail.setApiKey("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")
//     const msg = {
//       to: `${req.body.email}`,
//       from: "trippnwebsite@gmail.com",
//       subject: 'Sending with SendGrid is Fun',
//       text: 'and easy to do anywhere, even with Node.js',
//       html: '<strong>and easy to do anywhere, even with Node.js</strong>',
//     }
//     sgMail
//       .send(msg)
//       .then(() => {
//         console.log('Email sent')
//       })
//       .catch((error) => {
//         console.error(error)
//       })
// });
