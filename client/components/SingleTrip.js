import React, { Component } from "react";
import { connect } from "react-redux";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTasksByTrip } from "../redux/taskReducer";
import { fetchSingleTrip } from "../redux/tripReducer";
import TripTasks from "./TripTasks";
import TripTaskTodo from "./TripTaskTodo";

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
    <div
      className="container"
      style={{ width: "100%", alignContent: "center" }}
    >
      <main>
        <h2>Single Trip {trip.name}</h2>
        <TripTasks trip={trip["singleTrip"]} />
        <TripTaskTodo trip={trip["singleTrip"]} />
      </main>
    </div>
  );
};
export default connect(null)(SingleTrip);
