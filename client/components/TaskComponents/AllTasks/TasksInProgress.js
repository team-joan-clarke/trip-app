import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { Row, Col, OverlayTrigger } from "react-bootstrap";
import { getTasksByUser, deleteTask } from "../../../redux/taskReducer";
import TaskModal from "./TaskModal";
import { useNavigate } from "react-router-dom";
import { AvatarGroup, Avatar, Tooltip } from "@mui/material";

const TasksInProgress = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTasksByUser());
  }, []);

  const handleDelete = (e, id) => {
    e.stopPropagation();
    setShow(false);
    dispatch(deleteTask(id));
  };

  const [show, setShow] = useState(false);

  const tasks = props.tasks.allItineraryTasks || [];
  let inProgressTasks = tasks.filter((task) => task.status === "in progress");

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

                  <Alert show={show} variant="danger">
                    <Alert.Heading>
                      Are you sure you want to delete this task?
                    </Alert.Heading>
                    <p>
                      To delete, press the delete button. To cancel request,
                      press cancel.
                    </p>
                    <hr />
                    <div className="d-flex justify-content-end">
                      <Button
                        onClick={() => setShow(false)}
                        variant="secondary"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={(e) => handleDelete(e, singleTask.id)}
                        variant="danger"
                      >
                        Delete
                      </Button>
                    </div>
                  </Alert>

                  <Card.Title>{singleTask.type} </Card.Title>
                  <Card.Text>Trip Name: {singleTask.Trip.name}</Card.Text>
                  <Card.Text>Task Due Date: {singleTask.due_date}</Card.Text>
                  <Card.Text>
                    Provider Name: {singleTask.provider_name}
                  </Card.Text>
                  <Card.Text>
                    Booking Number: {singleTask.booking_num}
                  </Card.Text>
                  <Row>
                    <Col>
                      <Card.Text>Start Date: {singleTask.start_date}</Card.Text>
                    </Col>
                    <Col>
                      <Card.Text>End Date: {singleTask.end_date}</Card.Text>
                    </Col>
                  </Row>
                  <Card.Text>Link: {singleTask.link}</Card.Text>
                  <Card.Text>Description: {singleTask.description}</Card.Text>

                  {!show && singleTask.user_task.role === "editor" && (
                    <div
                      style={{
                        position: "absolute",
                        right: "2em",
                      }}
                    >
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => setShow(true)}
                      >
                        Delete
                      </Button>
                    </div>
                  )}

                  {singleTask.user_task.role === "editor" && (
                    <TaskModal singleTask={singleTask} />
                  )}
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
