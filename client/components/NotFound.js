import React from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";

/**
 * COMPONENT
 */
export const NotFound = (props) => {
  const { firstName } = props;

  return (
      <div
        style={{
          width: "60%",
          flexDirection: "row",
          padding: "2rem",
          borderRadius: "5px",
          boxShadow: "2px 1px 20px grey",
          margin: "5rem auto",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "80%",
            margin: "auto",
            flexDirection: "column",
            padding: "none",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img src="/palmtree_limegreen.png" style={{ height: "20rem" }} />
          </div>
          <h3>Hey {firstName}!</h3>
          <h6>The page you were looking for does not exist.</h6>
          <Button href="/user">Go back to User Dashboard</Button>
        </div>
      </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    firstName: state.auth.firstName,
  };
};

export default connect(mapState)(NotFound);
