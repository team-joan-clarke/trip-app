import React from "react";
import { connect } from "react-redux";
import CreateTrip from "./CreateTrip";
import EditTrip from "./EditTrip";

const DummyUserDash = () => {
  return (
    <div className="container">
      <main>
        <h3>Dummy Dash</h3>
        <CreateTrip />
        <EditTrip />
      </main>
    </div>
  );
};

export default connect(null)(DummyUserDash);