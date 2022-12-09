import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import { Row, Col, Stack, Tooltip, OverlayTrigger } from "react-bootstrap";
import { getTasksByUser } from "../../../redux/taskReducer";
import TaskModal from "./TaskModal";
import { AvatarGroup, Avatar } from "@mui/material";

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

//Time Display:
function timeDisplayConverter(time) {
  const formattedTime = new Date(time).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return formattedTime;
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

// Actual Component:
const TasksInProgress = (props) => {
  const trips = props.trips.active;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasksByUser());
  }, []);

  const [seeMore, setSeeMore] = useState(false);

  const activeTripsId = trips.map((trips) => trips.id);

  const tasks = props.tasks.allItineraryTasks || [];
  let inProgressTasks = tasks
    .filter((task) => {
      if (
        task.status === "in progress" &&
        activeTripsId.includes(task.TripId)
      ) {
        return task;
      }
    })
    .sort(dueDateCompare);

  return (
    <div>
      <br></br>
      <div>
        {inProgressTasks.length == 0 ? (
          <h2>No past tasks</h2>
        ) : (
          inProgressTasks.map((singleTask) => {
            return (
              <Card
                className="mb-4"
                style={{
                  width: "auto",
                }}
                key={singleTask.id}
              >
                <Card.Body>
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

                  <Card.Title>{singleTask.type} </Card.Title>
                  <Card.Text>
                    <span>
                      <strong>Trip Name: </strong>
                      {singleTask.Trip ? (
                        <span>{singleTask.Trip.name}</span>
                      ) : null}
                    </span>
                  </Card.Text>
                  <Card.Text>
                    <strong>Due:</strong>
                    {new Date(singleTask.due_date).toLocaleDateString()}
                  </Card.Text>
                  {!seeMore && (
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
                  )}
                  {seeMore && (
                    <div>
                      <Card.Text>
                        <strong> Provider Name:</strong>
                        {singleTask.provider_name}
                      </Card.Text>
                      <Card.Text>
                        <strong>Booking Number:</strong>
                        {singleTask.booking_num}
                      </Card.Text>
                      <Row>
                        {singleTask.start_date && (
                          <div>
                            <Row>
                              <Col>
                                <Card.Text>
                                  <strong>Start Date:</strong>
                                  {new Date(
                                    singleTask.start_date
                                  ).toLocaleDateString()}
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
                                  {new Date(
                                    singleTask.end_date
                                  ).toLocaleDateString()}
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
                        <strong>Link: </strong>
                        {singleTask.link}
                      </Card.Text>
                      <Card.Text>
                        <strong>Description:</strong> {singleTask.description}
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
                  <br></br>
                  <TaskModal singleTask={singleTask} />
                </Card.Body>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    trips: state.trips,
  };
};

export default connect(mapStateToProps)(TasksInProgress);
