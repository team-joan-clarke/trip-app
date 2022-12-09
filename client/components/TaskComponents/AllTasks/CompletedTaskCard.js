import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { deleteTask, updateTask } from "../../../redux/taskReducer";
import { AvatarGroup, Avatar } from "@mui/material";
import { getCookie } from "../../../redux/users";
import { fetchSingleTrip } from "../../../redux/tripReducer";

//Time Display:
function timeDisplayConverter(time) {
  const formattedTime = new Date(time).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return formattedTime;
}

//Avatar Things:
function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

//Sorting by Due Date of Task:
function dueDateCompare(a, b) {
  const aTime = new Date(a.due_date);
  const bTime = new Date(b.due_date);
  if (aTime) {
    if (bTime) {
      if (aTime >= bTime) {
        return 1;
      } else {
        return -1;
      }
    } else {
      return 1;
    }
  } else {
    if (bTime) {
      return 1;
    } else {
      return 0;
    }
  }
}

const CompletedTaskCard = (props) => {
  const { singleTask } = props;
  const { TripId } = singleTask;
  const Users = props.tripUsers.singleTripView.Users || [];
  const activeTrips = props.trips.active || [];

  const dispatch = useDispatch();

  // USER IS EDITOR OF TASK:
  const idOfUserLoggedIn = getCookie("userId");

  const [isTaskEditor, setIsTaskEditor] = useState(false);
  const [isTripOwner, setIsTripOwner] = useState(false);

  //USER IS EDITOR OF TASK && OWNER OF TRIP
  useEffect(() => {
    const userLoggedInIsEditorOfTask = singleTask.Users.filter((user) => {
      if (user.id == idOfUserLoggedIn) {
        if (user.user_task.role === "editor") {
          return user;
        }
      }
    });

    const userLoggedInIsOwnerOfTrip = activeTrips.map((trip) => {
      if (trip.role == "owner") {
        return trip.id;
      }
    });
    // userLoggedIn is owner so they can create, edit and delete their own tasks and DELETE other users' tasks

    if (userLoggedInIsOwnerOfTrip.length > 0) {
      if (userLoggedInIsOwnerOfTrip.includes(TripId)) {
        setIsTripOwner(true);
      }
    } else {
      setIsTripOwner(false);
    }

    if (userLoggedInIsEditorOfTask.length > 0) {
      setIsTaskEditor(true);
    } else {
      setIsTaskEditor(false);
    }
  }, []);

  const handleClick = (e, id) => {
    e.stopPropagation();
    dispatch(deleteTask(id, TripId));
  };

  const handleRestore = (e, id) => {
    e.stopPropagation();
    const status = "in progress";
    dispatch(updateTask({ status, TripId }, id));
  };
  const [show, setShow] = useState(false);
  const [seeMore, setSeeMore] = useState(false);

  return (
    <div>
      {/* {userLoggedInIsOwnerOfTrip.includes(singleTask.TripId) &&
        setIsTripOwner(true)} */}
      <Card.Body>
        <Alert show={show} variant="danger">
          <Alert.Heading>
            Are you sure you want to delete this task from your history?
          </Alert.Heading>
          <p>
            To delete, press the delete button. To cancel request, press cancel.
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={() => setShow(false)} variant="secondary">
              Cancel
            </Button>
            <Button
              onClick={(e) => handleClick(e, singleTask.id)}
              variant="danger"
            >
              Delete
            </Button>
          </div>
        </Alert>
        <AvatarGroup style={{ flex: 1 }}>
          {singleTask.Users.length > 0 &&
            singleTask.Users.map((user, i) => {
              const nameArr = [user.firstName, user.lastName];
              const fullName = nameArr.join(" ");
              return (
                <div>
                  {["top"].map((placement) => (
                    <OverlayTrigger
                      key={placement}
                      placement={placement}
                      overlay={
                        <Tooltip id={`tooltip-${placement}`}>
                          {fullName}
                        </Tooltip>
                      }
                    >
                      <Avatar {...stringAvatar(fullName)} key={i} />
                    </OverlayTrigger>
                  ))}
                </div>
              );
            })}
        </AvatarGroup>
        <Card.Title>{singleTask.type}</Card.Title>
        <Card.Text>
          <span>
            <strong>Trip Name: </strong>
            {singleTask.Trip ? <span>{singleTask.Trip.name}</span> : null}
          </span>
        </Card.Text>
        <Card.Text>
          <strong>Task Due Date:</strong>
          {new Date(singleTask.due_date).toLocaleDateString()}
        </Card.Text>
        {!seeMore && (
          <div>
            <Card.Link
              className="mb-2 text-muted"
              href=""
              onClick={(e) => {
                e.preventDefault();
                setSeeMore(true);
              }}
              style={{ float: "left" }}
            >
              See More...
            </Card.Link>
          </div>
        )}
        {seeMore && (
          <div>
            <Card.Text>
              <strong>Provider Name: </strong>
              {singleTask.provider_name}
            </Card.Text>
            <Card.Text>
              <strong>Booking Number:</strong> {singleTask.booking_num}
            </Card.Text>
            <Row>
              {singleTask.start_date && (
                <div>
                  <Row>
                    <Col>
                      <Card.Text>
                        <strong>Start Date:</strong>
                        {new Date(singleTask.start_date).toLocaleDateString()}
                      </Card.Text>
                    </Col>
                    <Col>
                      <Card.Text>
                        <strong>Start Time:</strong>
                        {timeDisplayConverter(singleTask.start_date)}
                      </Card.Text>
                    </Col>
                  </Row>
                </div>
              )}
              {singleTask.end_date && (
                <div>
                  <Row>
                    <Col>
                      <Card.Text>
                        <strong>End Date:</strong>
                        {new Date(singleTask.end_date).toLocaleDateString()}
                      </Card.Text>
                    </Col>
                    <Col>
                      <Card.Text>
                        <strong>End Time:</strong>
                        {timeDisplayConverter(singleTask.end_date)}
                      </Card.Text>
                    </Col>
                  </Row>
                </div>
              )}
            </Row>

            <Card.Text>
              <strong>Link:</strong>
              {singleTask.link}
            </Card.Text>
            <Card.Text>
              <strong>Description:</strong>
              {singleTask.description}
            </Card.Text>
            <Card.Link
              className="mb-2 text-muted"
              href=""
              onClick={(e) => {
                e.preventDefault();
                setSeeMore(false);
              }}
              style={{ float: "left" }}
            >
              See Less
            </Card.Link>
          </div>
        )}

        {(isTaskEditor || isTripOwner) && (
          <div>
            <div style={{ position: "absolute", right: "5em", bottom: "1em" }}>
              <Button
                variant="primary"
                onClick={(e) => handleRestore(e, singleTask.id)}
              >
                Retsore to Planning
              </Button>
            </div>

            <div style={{ position: "absolute", right: "1em", bottom: "1em" }}>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => setShow(true)}
              >
                Delete
              </Button>
            </div>
          </div>
        )}
      </Card.Body>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    tripUsers: state.trips,
    trips: state.trips,
  };
};

export default connect(mapStateToProps)(CompletedTaskCard);
