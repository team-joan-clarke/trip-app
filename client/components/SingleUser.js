import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../redux/users";
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
  const doTheyHaveReferralEmail = useSelector(
    (state) => state.auth.referralEmail
  );
  console.log("auth", doTheyHaveReferralEmail);

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (doTheyHaveReferralEmail) {
        const sendEmailConfirmationToPersonWhoReferred = axios.post(
          `/api/mail2/sendEmailToPersonWhoReferred`,
          { firstName, doTheyHaveReferralEmail },
          { headers: { authorization: token } }
        );
      }
    }
    fetchData();
  }, []);

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
