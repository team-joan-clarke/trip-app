import React, { Component, useEffect, useState, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { Draggable } from "react-beautiful-dnd";
import EditTaskModal from "./EditTaskModal";
import { deleteTask, updateTask } from "../../redux/taskReducer";
import { Avatar, AvatarGroup, List } from "@mui/material";
import { getCookie } from "../../redux/users";

function timeDisplayConverter(time) {
  const formattedTime = new Date(time).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return formattedTime;
}

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

const TaskCard = (props) => {
  const dispatch = useDispatch();
  const [seeMore, setSeeMore] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  const taskStartTime = timeDisplayConverter(props.task.start_date);

  const handleClick = (e, id) => {
    e.preventDefault();
    const status = "complete";
    dispatch(updateTask({ status }, id));
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    setShow(false);
    dispatch(deleteTask(id));
  };
  const [show, setShow] = useState(false);

  // ROLE HANDLING
  const [isTripOwner, setIsTripOwner] = useState(false);
  const [isTripEditor, setIsTripEditor] = useState(false);
  const [isTaskEditor, setIsTaskEditor] = useState(false);
  const idOfUserLoggedIn = getCookie("userId");
  const { trip } = props;
  const usersInTrip = trip.Users ? trip.Users : [];
  const taskUsers = props.task.Users || [];

  useEffect(() => {
    // userLoggedIn is owner so they can create, edit and delete their own tasks and DELETE other users' tasks
    const userLoggedInIsOwnerOfTrip = usersInTrip.filter((user) => {
      if (user.id == idOfUserLoggedIn) {
        if (user.user_trip.role == "owner") {
          return user;
        }
      }
    });

    // user logged in is editor so they can delete tasks, can mark as complete
    const userLoggedInIsEditorOfTrip = usersInTrip.filter((user) => {
      if (user.id == idOfUserLoggedIn) {
        if (user.user_trip.role == "editor") {
          return user;
        }
      }
    });

    // USER IS EDITOR OF TASK
    const userLoggedInIsEditorOfTask = props.task.Users.filter((user) => {
      if (user.id == idOfUserLoggedIn) {
        if (user.user_task.role === "editor") {
          return user;
        }
      }
    });

    if (userLoggedInIsOwnerOfTrip.length > 0) {
      setIsTripOwner(true);
    } else {
      setIsTripOwner(false);
    }

    if (userLoggedInIsEditorOfTrip.length > 0) {
      setIsTripEditor(true);
    } else {
      setIsTripEditor(false);
    }
    if (userLoggedInIsEditorOfTask.length > 0) {
      setIsTaskEditor(true);
    } else {
      setIsTaskEditor(false);
    }
  }, [props.task.Users, trip.Users]);

  return (
    <>
      <Card
        style={
          props.type === "todo"
            ? {
                width: "auto",
                margin: "1rem",
                boxShadow: "0px 1px 1px grey",
              }
            : {
                width: "13rem",
                marginTop: ".5rem",
                marginBottom: ".5rem",
                boxShadow: "0px 1px 1px grey",
              }
        }
      >
        <Card.Body>
          <ListGroup>
            {props.type === "itinerary" ? (
              <ListGroup.Item
                style={
                  props.task.status === "complete"
                    ? { backgroundColor: "#BDED7E" }
                    : { backgroundColor: "#DFB51F" }
                }
              ></ListGroup.Item>
            ) : (
              <></>
            )}
            <ListGroup.Item>
              <div style={{ display: "flex" }}>
                <div style={{ flex: 1 }}>
                  <Card.Title>{props.task.provider_name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {props.task.type}:{" "}
                    {props.task.subtype ? props.task.subtype : ""}
                  </Card.Subtitle>
                </div>
                {props.type === "todo" ? (
                  <AvatarGroup style={{ flex: 1 }}>
                    {taskUsers.length > 0 ? (
                      props.task.Users.map((user, i) => {
                        const nameArr = [user.firstName, user.lastName];
                        const fullName = nameArr.join(" ");
                        return <Avatar {...stringAvatar(fullName)} key={i} />;
                      })
                    ) : (
                      <div></div>
                    )}
                  </AvatarGroup>
                ) : (
                  <></>
                )}
              </div>
              {props.type === "todo" ? (
                <Card.Text>
                  <strong>Due:</strong>{" "}
                  {new Date(props.task.due_date).toLocaleDateString()}
                </Card.Text>
              ) : (
                <Card.Text>
                  <strong>Start:</strong> {taskStartTime}
                </Card.Text>
              )}
              {props.task.description && seeMore ? (
                <Card.Text>
                  <strong>Description:</strong> {props.task.description}
                </Card.Text>
              ) : (
                <></>
              )}
              {props.task.start_location && seeMore ? (
                <Card.Text>
                  <strong>Start Location:</strong> {props.task.start_location}
                </Card.Text>
              ) : (
                <></>
              )}
              {props.task.end_location && seeMore ? (
                <Card.Text>
                  <strong>End Location:</strong> {props.task.end_location}
                </Card.Text>
              ) : (
                <></>
              )}
              {props.task.booking_num && seeMore ? (
                <Card.Text>
                  <strong>Booking Number:</strong> {props.task.booking_num}
                </Card.Text>
              ) : (
                <></>
              )}
              {props.type === "itinerary" && seeMore ? (
                <AvatarGroup style={{ flex: 1, float: "left" }}>
                  {props.task.Users.map((user, i) => {
                    const nameArr = [user.firstName, user.lastName];
                    const fullName = nameArr.join(" ");
                    return <Avatar {...stringAvatar(fullName)} key={i} />;
                  })}
                </AvatarGroup>
              ) : (
                <></>
              )}
              {props.task.link ? (
                <Card.Link href={props.task.link} target="_blank">
                  Visit Website
                </Card.Link>
              ) : (
                <></>
              )}
              <div style={{ flex: 1, alignItems: "center" }}>
                <Card.Link
                  className="mb-2 text-muted"
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    setSeeMore(!seeMore);
                  }}
                  style={{ float: "left" }}
                >
                  {seeMore ? "See Less" : "See More..."}
                </Card.Link>
                {props.type === "todo" &&
                (isTripOwner || isTaskEditor) &&
                !props.status ? (
                  <Button
                    variant="primary"
                    style={{
                      float: "right",
                    }}
                    onClick={(e) => handleClick(e, props.task.id)}
                  >
                    Mark as Complete
                  </Button>
                ) : (
                  <></>
                )}
                <Alert
                  show={show}
                  variant="danger"
                  style={{ flexDirection: "column" }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Alert.Heading style={{ float: "left" }}>
                      Are you sure you want to delete this task?
                    </Alert.Heading>
                    <p style={{ display: "block" }}>
                      To delete, press the delete button. To cancel request,
                      press cancel.
                    </p>
                  </div>
                  <hr />
                  <div
                    className="d-flex justify-content-end"
                    style={{ width: "100%" }}
                  >
                    <Button
                      onClick={() => setShow(false)}
                      variant="secondary"
                      size={props.type === "itinerary" ? "sm" : null}
                      style={{
                        marginRight: "1rem",
                        borderRadius: "50px",
                        float: "right",
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={(e) => handleDelete(e, props.task.id)}
                      variant="danger"
                      size={props.type === "itinerary" ? "sm" : null}
                      style={{
                        borderRadius: "50px",
                        float: "right",
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </Alert>
                <div
                  style={
                    props.type === "itinerary"
                      ? {
                          display: "inline-block",
                          float: "right",
                          marginTop: "1rem",
                        }
                      : {}
                  }
                >
                  {!show && (isTripOwner || isTaskEditor) && !props.status && (
                    <Button
                      variant="outline-danger"
                      size={props.type === "itinerary" ? "sm" : null}
                      onClick={() => setShow(true)}
                      style={{
                        marginRight: "1rem",
                        borderRadius: "50px",
                        float: "right",
                      }}
                    >
                      Delete
                    </Button>
                  )}
                  {(isTripOwner || isTaskEditor) && !props.status && (
                    <Button
                      variant="outline-secondary"
                      size={props.type === "itinerary" ? "sm" : null}
                      style={{
                        marginRight: "1rem",
                        borderRadius: "50px",
                        float: "right",
                      }}
                      onClick={() => setModalShow(true)}
                    >
                      Edit
                    </Button>
                  )}
                </div>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
      <EditTaskModal
        task={props.task}
        trip={props.trip}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default connect(null)(TaskCard);
