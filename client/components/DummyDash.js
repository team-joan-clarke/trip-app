import React from "react";
import { connect } from "react-redux";
import TripAttendees from "./TripAttendees";

/**
 * COMPONENT
 */
export const DummyDash = (props) => {
  const { username } = props;

  return (
    <div>
      <h3>Welcome {username}</h3>
      <TripAttendees />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(DummyDash);
