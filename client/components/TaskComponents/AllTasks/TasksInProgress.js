import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import { Row, Col, Stack } from "react-bootstrap";
import { getTasksByUser } from "../../../redux/taskReducer";
import TaskModal from "./TaskModal";
import { useNavigate } from "react-router-dom";
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTasksByUser());
  }, []);

  const [seeMore, setSeeMore] = useState(false);

  const tasks = props.tasks.allItineraryTasks || [];
  let inProgressTasks = tasks
    .filter((task) => task.status === "in progress")
    .sort(dueDateCompare);

  return (
    <div>
      <h3>Current Tasks</h3>
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
                        return <Avatar {...stringAvatar(fullName)} key={i} />;
                      })}
                  </AvatarGroup>

                  <Card.Title>{singleTask.type} </Card.Title>
                  <Card.Text>Trip Name: {singleTask.Trip.name}</Card.Text>
                  <Card.Text>
                    Task Due Date:
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
                      "See More..."
                    </Card.Link>
                  )}
                  {seeMore && (
                    <div>
                      <Card.Text>
                        Provider Name: {singleTask.provider_name}
                      </Card.Text>
                      <Card.Text>
                        Booking Number: {singleTask.booking_num}
                      </Card.Text>
                      <Row>
                        {singleTask.start_date && (
                          <div>
                            <Col>
                              <Card.Text>
                                Start Date:
                                {new Date(
                                  singleTask.start_date
                                ).toLocaleDateString()}
                              </Card.Text>
                            </Col>
                            <Col>
                              <Card.Text>
                                Start Time:
                                {timeDisplayConverter(singleTask.start_date)}
                              </Card.Text>
                            </Col>
                          </div>
                        )}
                        {singleTask.end_date && (
                          <div>
                            <Col>
                              <Card.Text>
                                End Date:
                                {new Date(
                                  singleTask.end_date
                                ).toLocaleDateString()}
                              </Card.Text>
                            </Col>
                            <Col>
                              <Card.Text>
                                End Time:
                                {timeDisplayConverter(singleTask.end_date)}
                              </Card.Text>
                            </Col>
                          </div>
                        )}
                      </Row>

                      <Card.Text>Link: {singleTask.link}</Card.Text>
                      <Card.Text>
                        Description: {singleTask.description}
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
                        "See Less"
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
  };
};

export default connect(mapStateToProps)(TasksInProgress);
