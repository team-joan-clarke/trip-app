const express = require("express");
const nodemailer = require('nodemailer')
const app = express();

const morgan = require("morgan");
app.use(morgan("dev"));

const path = require("path");
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", require("./api"));
app.use("/auth", require("./auth"));
// app.use("/mail", require("./mail"))

// const transporter = nodemailer.createTransport({
//   port: 465,
//   host: "smtp.gmail.com",
//   auth: {
//       user: 'trippnwebsite@gmail.com',
//       pass: 'greatengineershere!',
//   },
//   secure: true, // upgrades later with STARTTLS -- change this based on the PORT
// });

// route.post('/text-mail', (req, res) => {
//   const {to, subject, text } = req.body;
//   const mailData = {
//       from: 'trippnwebsite@gmail.com',
//       to: to,
//       subject: subject,
//       text: text,
//       html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>',
//   };
//   transporter.sendMail(mailData, (error, info) => {
//     if (error) {
//         return console.log("theres been an error");
//     }
//     res.status(200).send({ message: "Mail send", message_id: info.messageId });
// });


app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "/public/index.html"));
});

app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error");
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Your server, listening on port ${port}`);
});
