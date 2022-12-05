import React, { Component } from "react";
import { connect } from "react-redux";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTasksByTrip } from "../redux/taskReducer";
import { fetchSingleTrip } from "../redux/tripReducer";
import TripTasks from "./TripTasks";
import TripTaskTodo from "./TripTaskTodo";
import EditTrip from "./EditTrip";
import { getCookie } from "../redux/users";
import TripAttendees from "./Attendees/TripAttendees";

const SingleTrip = () => {
  const dispatch = useDispatch();
  const { tripId } = useParams();

  useEffect(() => {
    dispatch(getTasksByTrip(tripId));
  }, []);

  useEffect(() => {
    dispatch(fetchSingleTrip(tripId));
  }, [trip]);

  const trip = useSelector((state) => state.trips.singleTripView);
  const singleTripUsers = trip?.Users
  if (!singleTripUsers) return null;

  const idOfUserLoggedIn = getCookie("userId");
  const allUsersInTrip = singleTripUsers;

  // ensures that that user logged in is owner if so they can edit trip
  const userLoggedInRelationshipToTrip = singleTripUsers.filter((user) => {
    if (user.id == idOfUserLoggedIn) {
      if (user.user_trip.role == "owner") {
        return user;
      }
    }
  });

  // const onlyOwnersAndEditors = singleTrip.Users.filter((user) => {
  //   return user.user_trip.role == "owner" || "editor";
  // });

  // const onlyOwners = singleTrip.Users.filter((user) => {
  //   return user.user_trip.role == "owner";
  // });

  return (
    <div>
      <div
        className="container"
        style={{ width: "100%", alignContent: "center" }}
      >
        <main>
          <h1>{trip.name}</h1>

          {userLoggedInRelationshipToTrip.length ? (
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
              <h3>Edit This Trip</h3>
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
                <EditTrip />
                {/* {userLoggedInRelationshipToTrip.length ? <EditTrip /> : <h1></h1>} */}
              </div>
            </div>
          ) : (
            <h1></h1>
          )}
          <TripAttendees />
          <TripTasks trip={trip} />
          <TripTaskTodo trip={trip} />
        </main>
      </div>
    </div>
  );
};

export default connect(null)(SingleTrip);
