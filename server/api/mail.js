// const mailRouter = require("express").Router();
// const sendgridTransport = require("nodemailer-sendgrid-transport");
// const nodemailer = require("nodemailer");


// mailRouter.post("/text-mail", (req, res) => {
//   const transport = nodemailer.createTransport(
//     sendgridTransport({
//       auth: {
//         api_key: "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",
//       },
//     })
//   );

//   transport
//     .sendMail({
//       to: `${req.body.email}`,
//       from: "trippnwebsite@gmail.com",
//       subject: "Test Email",
//       html: "<h2>Please Like Share Comment And Subscribe</h2>",
//     })
//     .then(console.log("Success!"))
//     .catch((err) => console.log(err));
// });

// module.exports = mailRouter;
