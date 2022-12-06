import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import { Card, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { getCookie } from "../../redux/users";
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

  const idOfUserLoggedIn = getCookie("userId");

  const userHasPermissions = usersOnTrip.filter((user) => {
    if (user.id == idOfUserLoggedIn) {
      if (user.user_trip.role === "owner" || user.user_trip.role === "editor") {
        return user;
      }
    }
  });

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
        {userHasPermissions.length ? <Searchbar /> : null}
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
            <h6 className="loading">There are no attendees on this trip yet</h6>
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
                      height: "70px",
                      boxShadow: "0px 1px 1px grey",
                      padding: "none",
                    }}
                  >
                    <Card.Body
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: 'center',
                        padding: "none",
                      }}
                    >
                      <strong
                        style={{
                          fontSize: "16px",
                        }}
                      >
                        {user.firstName} {user.lastName}
                      </strong>
                      {userHasPermissions.length ? (
                        <section>
                          {user.user_trip.role === "owner" ? (
                            <h6
                              style={{
                                float: "right",
                                fontSize: "14px",
                              }}
                            >
                              Trip Owner
                            </h6>
                          ) : (
                            <section>
                              <Button
                                onClick={(e) => handleDelete(e, user.id)}
                                variant="outline-danger"
                                style={{
                                  height: "35px",
                                  marginLeft: "10px",
                                  float: "right",
                                  position: "float",
                                  padding: "0.5rem",
                                  fontSize: "12px",
                                }}
                              >
                                Delete
                              </Button>
                              <Form.Select
                                defaultValue={user.user_trip.role}
                                onChange={handleAccess}
                                onClick={() => {
                                  setUserId(user.id);
                                }}
                                style={{
                                  width: "150px",
                                  height: "35px",
                                  boxShadow: "0px 1px 1px grey",
                                  padding: "0.5rem",
                                  float: "right",
                                  fontSize: "12px",
                                }}
                              >
                                <option value="attendee">Attendee</option>
                                <option value="editor">Editor</option>
                                <option value="owner">Owner</option>
                              </Form.Select>
                            </section>
                          )}
                        </section>
                      ) : null}
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
