import React, { useEffect } from "react";
import { getAllTripsThunk } from "../redux/tripReducer";
import { connect } from "react-redux";
import { link } from "react-router-dom";
// ^ to link to a specific trip in trip dashboard

const CompletedTrips = () => {
  return (
    <div>
      <h1>Hello these are completed Trips</h1>
      <p> I am trip</p>
    </div>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     trips: state.trips.allTrips,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getTrips: () => {
//       dispatch(getAllTripsThunk());
//     },
//   };
// };

// connect(mapStateToProps, mapDispatchToProps)(CompletedTrips);
export default CompletedTrips
