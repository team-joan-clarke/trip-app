const mailRouter = require("express").Router();
const nodemailer = require("nodemailer");
const { requireToken } = require("./gatekeepingmiddleware");

mailRouter.post("/text-mail", requireToken, (req, res) => {
  const htmlToSend = `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  
      <style type="text/css">
        /* client specific styles */
        #outlook a {
          padding: 0;
        } /* Force Outlook to provide a "view in browser" message */
        .ReadMsgBody {
          width: 100%;
        }
        .ExternalClass {
          width: 100%;
        } /* Force Hotmail to display emails at full width */
        .ExternalClass,
        .ExternalClass p,
        .ExternalClass span,
        .ExternalClass font,
        .ExternalClass td,
        .ExternalClass div {
          line-height: 100%;
        } /* Force Hotmail to display normal line spacing */
        body,
        table,
        td,
        a {
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        } /* Prevent WebKit and Windows mobile changing default text sizes */
        table,
        td {
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
        } /* Remove spacing between tables in Outlook 2007 and up */
        img {
          -ms-interpolation-mode: bicubic;
        } /* Allow smoother rendering of resized image in Internet Explorer */
      </style>
    </head>
    <body bgcolor="#e5e4e1">
      <table
        width="100%"
        border="0"
        cellspacing="0"
        cellpadding="0"
        bgcolor="#e5e4e1"
      >
        <tr>
          <td>
            <!-- preheader for desktop -->
            <table
              width="620"
              border="0"
              cellspacing="0"
              cellpadding="10"
              align="center"
            >
              <tr>
                <td>
                  <table width="800" border="0" cellpadding="10" cellspacing="0">
                    <tr>
                      <td width="212"></td>
                      <td width="137"></td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <!-- end preheader for desktop -->
            <!-- background -->
            <table
              width="804"
              border="0"
              cellspacing="0"
              cellpadding="2"
              align="center"
              bgcolor="#e3e3e3"
            >
              <tr>
                <td>
                  <!-- body wrapper -->
                  <table
                    width="800"
                    border="0"
                    cellspacing="0"
                    cellpadding="2"
                    align="center"
                    bgcolor="#ffffff"
                  >
                    <tr>
                      <td>
                        <!-- all content added below  -->
                        <table
                          width="800"
                          border="0"
                          cellspacing="0"
                          cellpadding="30"
                          align="center"
                          bgcolor="#ffffff"
                        >
                          <tr>
                            <td>
                              <table
                                width="740"
                                border="0"
                                cellspacing="5"
                                cellpadding="20"
                                align="center"
                                bgcolor="#fcfaf4"
                                style="
                                  font-family: Arial, Helvetica, sans-serif;
                                  font-size: 10pt;
                                  line-height: 140%;
                                  color: #25272e;
                                "
                              >
                                <!-- first row -->
                                <tr>
                                  <td width="740" align="center">
                                    <a
                                      style="
                                        font-family: Arial, Helvetica, sans-serif;
                                        color: #25272e;
                                        font-size: 30pt;
                                        line-height: 140%;
                                        text-decoration: none;
                                      "
                                      href="https://trippn.onrender.com/"
                                      >trippn</a
                                    >
                                    <hr />
                                  </td>
                                </tr>
                                <!-- second row -->
                                <tr>
                                  <td align="center">
                                    <img
                                      style="width: 200px; height: 200px"
                                      alt="trippn's palm tree logo"
                                      src="https://raw.githubusercontent.com/team-joan-clarke/trip-app/main/public/logo.png"
                                    />
                                  </td>
                                </tr>
                                <!-- third row -->
                                <tr>
                                  <td align="center">
                                    <span
                                      style="
                                        font-family: Arial, Helvetica, sans-serif;
                                        color: #25272e;
                                        font-size: 20pt;
                                        line-height: 120%;
                                      "
                                      >You Have an Awesome Friend.</span
                                    >
                                  </td>
                                </tr>
                                <!-- fourth row -->
                                <tr>
                                  <td align="center">
                                    <br />
                                    <span
                                      style="
                                        font-family: Arial, Helvetica, sans-serif;
                                        color: #25272e;
                                        font-size: 15pt;
                                        line-height: 120%;
                                      "
                                    >
                                      You have been invited by your trippn friend
                                      <strong>${req.body.referralEmail}</strong> who thinks you'll enjoy using trippn to plan your upcoming trip!
                                    </span>
                                  </td>
                                </tr>
                                <!-- fifth row -->
                                <tr>
                                  <td>
                                    <span
                                      style="
                                        font-family: Arial, Helvetica, sans-serif;
                                        color: #25272e;
                                        font-size: 13pt;
                                        line-height: 120%;
                                      "
                                      >It's super simple. Here's how it
                                      works</span
                                    >
                                    <ul
                                      style="
                                        font-family: Arial, Helvetica, sans-serif;
                                        color: #25272e;
                                        font-size: 11pt;
                                        line-height: 120%;
                                      "
                                    >
                                      <li>
                                        Head on over to the link by clicking the
                                        button below
                                      </li>
                                      <li>
                                        When redirected to our sign-up page,
                                        locate the referral email input field on
                                        the sign-up form
                                      </li>
                                      <li>
                                        Include the name of your trippn friend in
                                        the referral email input field
                                      </li>
                                      <li>That's all we'll take it from here!</li>
                                    </ul>
                                  </td>
                                </tr>
  
                                <!-- row with button -->
                                <tr>
                                  <td align="center">
                                   <a 
                                    href="https://trippn.onrender.com/signup"
                                    style="
                                     display: inline-block; 
                                     padding: 10px 20px 10px 20px;
                                     width: 300px; height: 40px; 
                                     background-color: lightseagreen; 
                                     background-image: linear-gradient(115deg, lightseagreen, 68%, #bded7e); 
                                     color: #fff; 
                                     text-decoration: none; 
                                     border-radius: 10px; 
                                     text-align: center;"
                                     >
                                    Accept Invitation
                                   </a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        <!-- begin footer -->
                        <table
                          width="800"
                          border="0"
                          cellspacing="0"
                          cellpadding="30"
                          align="center"
                          bgcolor="#f1f1f1"
                          style="
                            font-family: Arial, Helvetica, sans-serif;
                            font-size: 10pt;
                            line-height: 130%;
                            color: #a1a1a1;
                          "
                        >
                          <!--Regulatory Footer-->
                          <tr>
                            <td>
                              <table
                                width="740"
                                border="0"
                                cellspacing="0"
                                cellpadding="0"
                                bgcolor="#f1f1f1"
                              >
                                <tr>
                                  <td>
                                    <table
                                      width="740"
                                      border="0"
                                      cellspacing="0"
                                      cellpadding="5"
                                    >
                                      <tr>
                                        <td width="140" align="center">
                                          <a href=""
                                            ><img
                                              class="social-icons"
                                              border="0"
                                              src="https://github.com/Anahisv23/referral-invite-email/blob/main/assets/icon-instagram.png?raw=true"
                                          /></a>
                                          <a href=""
                                            ><img
                                              class="social-icons"
                                              border="0"
                                              src="https://github.com/Anahisv23/referral-invite-email/blob/main/assets/icon-twitter.png?raw=true"
                                          /></a>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td width="400" align="center">
                                          <a
                                            href="https://trippn.onrender.com/home"
                                            style="color: gray"
                                            >View Online</a
                                          >
                                          |
  
                                          <a
                                            href="{$unsubscribe}"
                                            style="color: gray"
                                            >Unsubscribe</a
                                          >
                                          |
  
                                          <a href="" style="color: gray"
                                            >Privacy Policy</a
                                          >
                                          |
                                          <a
                                            href="{$unsubscribe}"
                                            style="color: gray"
                                            >Contact Us</a
                                          >
  
                                          <br /><br />
  
                                          <span
                                            style="
                                              font-family: Arial, Helvetica,
                                                sans-serif;
                                              color: #a1a1a1;
                                              font-size: 10px;
                                            "
                                          >
                                            123 E. Non-existent Street Los
                                            Angeles, CA 12345 |
                                            <a
                                              href="mailto:trippnwebsite@gmail.com"
                                              style="color: gray"
                                              >trippn</a
                                            ></span
                                          >
                                          <br /><br />
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        <!--end Regulatory footer-->
                      </td>
                    </tr>
                  </table>
                  <!-- end body wrapper -->
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;

  var transporter = nodemailer.createTransport({
    port: 465,
    service: "gmail",
    auth: {
      user: "trippnwebsite@gmail.com",
      pass: process.env.APP_PASS,
    },
  });

  var mailOptions = {
    from: "trippnwebsite@gmail.com",
    to: `${req.body.recipient}`,
    subject: "Your fellow trippn friend has invited you on a trip!",
    text: "",
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

module.exports = mailRouter;
