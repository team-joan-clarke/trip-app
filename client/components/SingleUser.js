import React, { Component } from "react";
import { connect } from "react-redux";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../redux/users";
import CompletedTrips from "./CompletedTrips";
import ActiveTrips from "./ActiveTrips";
import AllTasks from "./TaskComponents/AllTasks/AllTasks";
import CreateTrip from "./CreateTrip";

const SingleUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  const user = useSelector((state) => state.users);
  const loggedIn = useSelector((state) => state.isLoggedIn);
  const firstName = user.firstName || "";

  return (
    <div>
      {loggedIn ? (
        <div className="container">
          <main>
            {user.length == 0 && (
              <h3 className=" error"> User does not exist in the system!</h3>
            )}
            <h2> Hello {firstName}</h2>

            <div
              style={{
                width: "auto",
                flexDirection: "row",
                flexWrap: "wrap",
                padding: "2rem",
                borderRadius: "5px",
                boxShadow: "2px 1px 20px grey",
                marginTop: "3rem",
              }}
            >
              <h3>Get Started</h3>
              <div
                style={{
                  display: "flex",
                  width: "auto",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  padding: "none",
                  justifyContent: "center",
                }}
              >
                <CreateTrip />
              </div>
            </div>

            <ActiveTrips />
            <CompletedTrips />

            <h3>Here are your tasks: </h3>
            <AllTasks />
          </main>
        </div>
      ) : (
        <div
          style={{
            width: "50%",
            flexDirection: "row",
            textAlign: "center",
            flexWrap: "wrap",
            padding: "2rem",
            borderRadius: "5px",
            boxShadow: "2px 1px 20px grey",
            margin: "5rem auto",
          }}
        >
          <h4>{"Please login to view this page."}</h4>
        </div>
      )}
    </div>
  );
};

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    user: state.users,
  };
};

export default connect(mapState)(SingleUser);
