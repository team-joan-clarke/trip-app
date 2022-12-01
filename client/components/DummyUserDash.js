import React from "react";
import { connect } from "react-redux";
import CreateTrip from "./CreateTrip";

const DummyUserDash = () => {
  return (
    <div className="container">
      <main>
        <h3>Dummy Dash</h3>
        <CreateTrip />
      </main>
    </div>
  );
};

export default connect(null)(DummyUserDash);