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
import { Image } from "react-bootstrap";

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
  const singleTripUsers = trip?.Users;
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
          <div
            style={{
              width: "auto",
              padding: "1.5rem",
              borderRadius: "5px",
              boxShadow: "2px 1px 20px grey",
              marginTop: "1rem",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              background: "white",
            }}
          >
            <Image
              src={trip.imageUrl}
              thumbnail
              style={{ width: "18rem", height: "18rem" }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "2rem",
              }}
            >
              <h1 className='spicy-text'>{trip.name}</h1>
              <h4 style={{marginBottom: '1.5rem'}}>
                Dates: {new Date(trip.start_date).toLocaleDateString()}-{" "}
                {new Date(trip.end_date).toLocaleDateString()}
              </h4>
              {userLoggedInRelationshipToTrip.length ? <EditTrip /> : null}
            </div>
          </div>

          <TripAttendees />
          <TripTasks trip={trip} />
          <TripTaskTodo trip={trip} />
        </main>
      </div>
    </div>
  );
};

export default connect(null)(SingleTrip);
