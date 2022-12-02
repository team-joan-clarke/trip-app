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

  return (
    <div>
      <div
        className="container"
        style={{ width: "100%", alignContent: "center" }}
      >
        <main>
          <h2>Single Trip {trip.name}</h2>

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
            </div>
          </div>

          <TripTasks trip={trip["singleTrip"]} />
          <TripTaskTodo trip={trip["singleTrip"]} />
        </main>
      </div>
    </div>
  );
};

export default connect(null)(SingleTrip);
