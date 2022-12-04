import React from "react";
import { connect, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import { Card } from "react-bootstrap";
import { fetchAllUsersOnTrip } from "../redux/users";
import Searchbar from "./Searchbar";

const TripAttendees = (props) => {
  //dummyid change to useparams
  const tripId = 1;
  const usersOnTrip = useSelector((state) => state.users.usersOnTrip);
  useEffect(() => {
    props.fetchAllUsersOnTrip(tripId);
  }, []);

  return (
    <div
      style={{
        width: "85%",
        flexDirection: "row",
        flexWrap: "wrap",
        padding: "2rem",
        borderRadius: "5px",
        boxShadow: "2px 1px 20px grey",
        margin: "2rem auto",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}
      >
        <h3 style={{ flex: 5, width: "fit-contents" }}>Trip Attendees</h3>
        <Searchbar />
      </div>
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
        <DragDropContext>
          {!usersOnTrip ? (
            <p className="loading">No Users Yet</p>
          ) : (
            <div
              style={{
                width: "100%",
                flexDirection: "row",
                flexWrap: "wrap",
                padding: "1rem",
                borderRadius: "5px",
                boxShadow: "2px 1px 20px grey",
                margin: "1rem auto",
              }}
            >
              {usersOnTrip.map((user) => {
                return (
                  <Card
                    key={user.id}
                    style={{
                      width: "auto",
                      margin: "1rem",
                      boxShadow: "0px 1px 1px grey",
                      padding: "0.8rem",
                    }}
                  >
                    <h3>
                      {user.firstName} {user.lastName}
                    </h3>
                  </Card>
                );
              })}
            </div>
          )}
        </DragDropContext>
      </div>
    </div>
  );
};

const mapState = (state) => {
  console.log("state", state.users.usersOnTrip);
  return {
    usersOnTrip: state.usersOnTrip,
  };
};

const mapDispatch = (dispatch) => ({
  fetchAllUsersOnTrip: (tripId) => dispatch(fetchAllUsersOnTrip(tripId)),
});

export default connect(mapState, mapDispatch)(TripAttendees);
