import React from "react";
import { connect, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import { Card, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { fetchSingleTrip } from "../../redux/tripReducer";
import {
  updateThisUserTrip,
  deleteThisUserTrip,
} from "../../redux/tripReducer";
import Searchbar from "./Searchbar";

const TripAttendees = (props) => {
  const { tripId } = useParams();
  const usersOnTrip = useSelector((state) => state.trips.singleTripView.Users);
  const [userId, setUserId] = useState("");
  const [userTripInfo, setUserTripInfo] = useState({
    role: "",
    UserId: "",
    TripId: "",
  });

  useEffect(() => {
    props.fetchSingleTrip(tripId);
  }, []);
  
  useEffect(() => {
    if (userId !== "") {
      props.updateThisUserTrip(parseInt(tripId), { ...userTripInfo });
    }
  }, [userTripInfo]);

  const handleAccess = (event) => {
    setUserTripInfo({
      role: event.target.value,
      UserId: parseInt(userId),
      TripId: tripId,
    });
  };

  const handleDelete = (e, userId) => {
    e.stopPropagation();
    props.deleteThisUserTrip(tripId, userId);
  };

  return (
    <div
      style={{
        width: "auto",
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
            <p className="loading">There are no attendees on this trip yet</p>
          ) : (
            <div
              style={{
                width: "100%",
                flexDirection: "row",
                flexWrap: "wrap",
                padding: "0.5rem",
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
                    <Card.Body>
                      <Card.Text>
                        <strong
                          style={{
                            fontSize: "18px",
                          }}
                        >
                          {user.firstName} {user.lastName}
                        </strong>
                        <Button
                          onClick={(e) => handleDelete(e, user.id)}
                          style={{
                            margin: "7px",
                            float: "right",
                          }}
                        >
                          Delete Attendee
                        </Button>
                        <Form.Select
                          defaultValue={user.user_trip.role}
                          onChange={handleAccess}
                          onClick={() => {
                            setUserId(user.id);
                          }}
                          style={{
                            width: "200px",
                            margin: "none",
                            boxShadow: "0px 1px 1px grey",
                            padding: "0.8rem",
                            float: "right",
                            fontSize: "14px",
                          }}
                        >
                          <option value="attendee">Attendee</option>
                          <option value="editor">Editor</option>
                          <option value="owner">Owner</option>
                        </Form.Select>
                      </Card.Text>
                    </Card.Body>
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
  return {
    trips: state.trips,
  };
};

const mapDispatch = (dispatch) => ({
  fetchSingleTrip: (tripId) => dispatch(fetchSingleTrip(tripId)),
  updateThisUserTrip: (tripId, userTrip) =>
    dispatch(updateThisUserTrip(tripId, userTrip)),
  deleteThisUserTrip: (tripId, userId) =>
    dispatch(deleteThisUserTrip(tripId, userId)),
});

export default connect(mapState, mapDispatch)(TripAttendees);
