import React, { useEffect } from "react";
import { getAllCompletedTripsThunk } from "../redux/tripReducer";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
// ^ to link to a specific trip in trip dashboard

const CompletedTrips = (props) => {
  console.log("these are props", props);

  useEffect(() => {
    props.getTrips(4);
  }, []);

  const { trips } = props;

  return (
    <div>
      <h1>Hello these are completed Trips</h1>
      <div>
        {trips.map((singleTrip) => {
          console.log("one trip", singleTrip);
          return (
            <article key={singleTrip.id}>
              <h1>{singleTrip.name}</h1>
            </article>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log("this is state", state.trips);
  return {
    trips: state.trips,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTrips: (userId) => {
      dispatch(getAllCompletedTripsThunk(userId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompletedTrips);
