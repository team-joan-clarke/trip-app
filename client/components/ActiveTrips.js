import React, { useEffect } from "react";
import { getAllTripsThunk } from "../redux/tripReducer";
import { connect } from "react-redux";
import { link } from "react-router-dom";
// ^ to link to a specific trip in trip dashboard

const ActiveTrips = () => {
  return (
    <div>
      <h1>Hello these are active trips</h1>
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
export default ActiveTrips