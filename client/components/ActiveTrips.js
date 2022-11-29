import React, { useEffect } from "react";
import { getAllActiveTripsThunk } from "../redux/tripReducer";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
// ^ to link to a specific trip in trip dashboard

const ActiveTrips = () => {
  const { userId } = useParams();
  return (
    <div>
      <h1>Current trips</h1>
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
export default ActiveTrips;
