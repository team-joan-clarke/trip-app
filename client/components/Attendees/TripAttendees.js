import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import { Card, Form, Popover, OverlayTrigger } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { getCookie } from "../../redux/users";
import {
  updateThisUserTrip,
  deleteThisUserTrip,
} from "../../redux/tripReducer";
import Searchbar from "./Searchbar";

const popover = (
  <Popover id="popover-basic">
    <Popover.Header as="h3">Overview: User Roles</Popover.Header>
    <Popover.Body>
      <div>
        <h6>Owner</h6>
        <p>
          Can edit trip details, attendees, and attendee roles. Can also add and
          edit all trip tasks.
        </p>
      </div>
      <div>
        <h6>Editor</h6>
        <p>
          Can edit trip attendees and attendee roles. Can also add tasks and
          edit the tasks they create.
        </p>
      </div>
      <div>
        <h6>Attendee</h6>
        <p>Can view trip attendees and tasks.</p>
      </div>
    </Popover.Body>
  </Popover>
);

const TripAttendees = (props) => {
  const { tripId } = useParams();
  const usersOnTrip = useSelector((state) => state.trips.singleTripView.Users);
  const [userId, setUserId] = useState("");
  const [userTripInfo, setUserTripInfo] = useState({
    role: "",
    UserId: "",
    TripId: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (userId !== "") {
      props.updateThisUserTrip(parseInt(tripId), { ...userTripInfo });
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
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
    console.log("delete in attendees", tripId);
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
        background: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
          <h3 style={{flex: 5, width: 'fit-contents'}}>Trip Attendees</h3>
          <OverlayTrigger trigger="click" placement="right" overlay={popover}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-info-circle"
              viewBox="0 0 16 16"
              style={{ float: "left", margin: "1rem" }}
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
            </svg>
          </OverlayTrigger>
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
                height: "22.5rem",
                overflowY: "scroll",
                flexDirection: "row",
                flexWrap: "wrap",
                padding: "0.3rem",
                borderRadius: "5px",
                boxShadow: "2px 1px 20px grey",
                margin: "0.3rem auto",
                background: "#e3dcef",
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
                      background: "#f5f1f9",
                    }}
                  >
                    <Card.Body
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
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
                                  background: "#f5f1f9",
                                }}
                              >
                                <option value="attendee">Attendee</option>
                                <option value="editor">Editor</option>
                                <option value="owner">Owner</option>
                              </Form.Select>
                              {user.id === userId
                                ? showSuccess && (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="25"
                                      height="25"
                                      fill="green"
                                      className="bi bi-check-lg"
                                      viewBox="0 0 16 16"
                                      style={{
                                        margin: "0.3rem",
                                        marginRight: "1rem",
                                      }}
                                    >
                                      <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                                    </svg>
                                  )
                                : null}
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
  updateThisUserTrip: (tripId, userTrip) =>
    dispatch(updateThisUserTrip(tripId, userTrip)),
  deleteThisUserTrip: (tripId, userId) =>
    dispatch(deleteThisUserTrip(tripId, userId)),
});

export default connect(mapState, mapDispatch)(TripAttendees);
