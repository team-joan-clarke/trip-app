import React, { useState } from "react";
import {
  Button,
  Toast,
  ToastContainer,
  Popover,
  OverlayTrigger,
} from "react-bootstrap";
import axios from "axios";
import { getCookie } from "../redux/users";


const popover = (
  <Popover id="popover-basic">
    <Popover.Header as="h3">How to invite attendees</Popover.Header>
    <Popover.Body>
      <div>
        <h6>Add recipient's email</h6>
        <p>
          In the recipient input field add the email of the person you want to
          invite to trippn.
        </p>
      </div>
      <div>
        <h6>Add your email</h6>
        <p>
          In the your email input field add your email to let the recipient know
          who is inviting them to join!
        </p>
      </div>
      <div>
        <h6>What's next?</h6>
        <p>The recipient will recieve an invite email shortly and you will be notified when they join via email. Happy planning!</p>
      </div>
    </Popover.Body>
  </Popover>
);

const InviteEmailForm = () => {
  const token = getCookie("token");
  const [recipient, setrecipient] = useState("");
  const [referralEmail, setReferralEmail] = useState("");
  const [showSuccessToast, setSuccessToast] = useState(false);

  const handleInviteClick = async (event) => {
    event.preventDefault();
    setSuccessToast(true);
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
      <ToastContainer position="top-end">
        <Toast
          bg="info"
          onClose={() => setSuccessToast(false)}
          show={showSuccessToast}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">trippn</strong>
            <small>Now</small>
          </Toast.Header>
          <Toast.Body>Email successfully sent to recipient!</Toast.Body>
        </Toast>
      </ToastContainer>
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
          <OverlayTrigger trigger="click" placement="right" overlay={popover}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-info-circle"
              viewBox="0 0 16 16"
              style={{ float: "left", margin: "1rem" }}
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
            </svg>
          </OverlayTrigger>
          <form className="trip-form" onSubmit={handleInviteClick}>
            <div>
              <input
                name="recipient"
                placeholder="Recipient email"
                value={recipient}
                onChange={handleChanges}
                type="email"
              />
            </div>
            <div>
              <input
                name="referralEmail"
                value={referralEmail}
                placeholder="Your email"
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
