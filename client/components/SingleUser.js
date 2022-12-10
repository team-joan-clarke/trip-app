import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../redux/users";
import { Button, Toast, ToastContainer } from "react-bootstrap";
import AllTasks from "./TaskComponents/AllTasks/AllTasks";
import CompletedTrips from "./CompletedTrips";
import ActiveTrips from "./ActiveTrips";
import CreateTrip from "./CreateTrip";
import { getCookie } from "../redux/users";
import axios from "axios";

const SingleUser = () => {
  const dispatch = useDispatch();
  const firstName = useSelector((state) => state.auth.firstName);
  const token = getCookie("token");
  const [buttonStatus, setButtonStatus] = useState(true)
  const doTheyHaveReferralEmail = useSelector(
    (state) => state.auth.referralEmail
  );

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  const sendEmailConfirmationButton = async (event) => {
    console.log("in send emaul confirmation");
    setButtonStatus(false)
    try {
      if (doTheyHaveReferralEmail) {
        const sendEmailConfirmationToPersonWhoReferred = await axios.post(
          `/api/mail2/sendEmailToPersonWhoReferred`,
          { firstName, doTheyHaveReferralEmail },
          { headers: { authorization: token } }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="container">
        <main>
          <div
            style={{
              width: "auto",
              padding: "1.2rem",
              borderRadius: "5px",
              boxShadow: "2px 1px 20px grey",
              marginTop: "3rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              background: "white",
            }}
          >
            {!firstName && (
              <h3 className=" error"> User does not exist in the system!</h3>
            )}
            <h1 className="spicy-text"> Hello {firstName}</h1>
            <h4>Get Started</h4>
            <div
              style={{
                display: "flex",
                width: "auto",
                flexDirection: "row",
                flexWrap: "wrap",
                padding: "0.2rem",
                justifyContent: "center",
              }}
            >
              <CreateTrip />
              {doTheyHaveReferralEmail && buttonStatus ? (
                <Button
                  className="marginLeft"
                  onClick={sendEmailConfirmationButton}
                  type="submit"
                >
                  Send Email Confirmation
                </Button>
              ) : (
                <h1></h1>
              )}
            </div>
          </div>

          <ActiveTrips />
          <CompletedTrips />
          <AllTasks />
        </main>
      </div>
    </div>
  );
};

export default connect(null)(SingleUser);
