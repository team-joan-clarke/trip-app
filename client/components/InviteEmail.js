import React, { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { getCookie } from "../redux/users";
// make form to send info to post route in backend server/api/mail.js

const InviteEmailForm = () => {
  const token = getCookie("token");
  const [recipient, setrecipient] = useState("");
  const [referralEmail, setReferralEmail] = useState("");

  const handleInviteClick = async (event) => {
    event.preventDefault();
    try {
      const sendEmail = await axios.post(
        `/api/mail/text-mail`,
        { recipient, referralEmail },
        {
          headers: { authorization: token },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleChanges = (event) => {
    if (event.target.name == "recipient") {
      setrecipient(event.target.value);
    } else {
      setReferralEmail(event.target.value);
    }
  };

  return (
    <div>
      <div
        style={{
          width: "40%",
          flexDirection: "row",
          padding: "2rem",
          borderRadius: "5px",
          boxShadow: "2px 1px 20px grey",
          margin: "10rem auto",
          backgroundImage: "url(/gradient1.png)",
          opacity: "0.9",
          backgroundSize: "cover",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "80%",
            margin: "auto",
            flexDirection: "column",
            padding: "none",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h3>Invite attendees to trippn</h3>
          <form className="trip-form" onSubmit={handleInviteClick}>
            <div>
              <input
                name="recipient"
                placeholder="recipient"
                value={recipient}
                onChange={handleChanges}
                type="email"
              />
            </div>
            <div>
              <input
                name="referralEmail"
                value={referralEmail}
                placeholder="referral email"
                onChange={handleChanges}
                type="email"
              />
            </div>
            <div>
              <Button style={{ margin: "0.6rem 4rem" }} type="submit">
                Send email invite
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InviteEmailForm;
