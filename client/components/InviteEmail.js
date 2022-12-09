// import React from "react"
// make form to send info to post route in backend server/api/mail.js


const sendEmail = (recipient) => {
    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(
      "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"
    );
    const msg = {
      to: recipient,
      from: "trippnwebsite@gmail.com",
      subject: "Sending with SendGrid is Fun",
      text: "and easy to do anywhere, even with Node.js",
      html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  sendEmail("anahisvq7@gmail.com")