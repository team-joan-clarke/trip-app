const mailRouter = require("express").Router();
const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   port: 465,
//   host: "smtp.gmail.com",
//   service: "gmail",
//   auth: {
//     user: "trippnwebsite@gmail.com",
//     pass: "greatengineershere!",
//   },
//   secure: true,
// });

let transporter;

mailRouter.post("/text-mail", (req, res) => {
  nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: account.user, // generated ethereal user
        pass: account.pass, // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false,
      }
    });

    const { to, subject, text } = req.body;

    const mailData = {
      from: "smtp.ethereal.email",
      to: to,
      subject: subject,
      text: text,
    };

    console.log("mail data", mailData);
    transporter.sendMail(mailData, (error, info) => {
      if (error) {
        return console.log("theres been an error :(");
      }

      res
        .status(200)
        .send({ message: "Mail send", message_id: info.messageId });
    });

    transporter.verify(function (error, success) {
      if (error) {
        console.log("transporter error");
      } else {
        console.log("Server is ready to take our messages");
      }
    });
  });
});

module.exports = mailRouter;

