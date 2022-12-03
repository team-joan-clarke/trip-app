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
  const singleTrip = trip?.singleTrip;
  if (!singleTrip) return null;

  const idOfUserLoggedIn = getCookie("userId");
  console.log("loggedIn", idOfUserLoggedIn);

  // const userId = singleTrip.Users[0].id
  // const userRole = singleTrip.Users[0].user_trip.role
  const allUsers = singleTrip.Users;
  console.log("allUser", allUsers);

  const userRelationToTrip = singleTrip.Users.filter((user) => {
    console.log("singleUser", user);
    if (user.id == idOfUserLoggedIn) {
      if (user.user_trip.role !== "attendee") {
        console.log("role", user.user_trip.role);
        return user;
      }
    }
  });

  console.log("la relacion", userRelationToTrip);

  const onlyOwnersAndEditors = singleTrip.Users.filter((user) => {
    return user.user_trip.role == "owner" || "editor";
  });

  // const isOwner

  const onlyOwners = singleTrip.Users.filter((user) => {
    return user.user_trip.role == "owner";
  });

  console.log("onlyOwnersAndEditors", onlyOwnersAndEditors);
  // console.log("userId", userId)
  // console.log("userRole", userRole)
  return (
    <div>
      <div
        className="container"
        style={{ width: "100%", alignContent: "center" }}
      >
        <main>
          <h2>Trip name: {trip.singleTrip.name}</h2>

          {userRelationToTrip.length ? (
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
                {/* {userRelationToTrip.length ? <EditTrip /> : <h1></h1>} */}
              </div>
            </div>
          ) : (
            <h1></h1>
          )}

          <TripTasks trip={trip["singleTrip"]} />
          <TripTaskTodo trip={trip["singleTrip"]} />
        </main>
      </div>
    </div>
  );
};

export default connect(null)(SingleTrip);
