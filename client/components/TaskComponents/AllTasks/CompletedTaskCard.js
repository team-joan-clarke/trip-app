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
  const dispatch = useDispatch();

  // USER IS EDITOR OF TASK:
  const idOfUserLoggedIn = getCookie("userId");

  const [isTaskEditor, setIsTaskEditor] = useState(false);

  useEffect(() => {
    const userLoggedInIsEditorOfTask = singleTask.Users.filter((user) => {
      if (user.id == idOfUserLoggedIn) {
        if (user.user_task.role === "editor") {
          return user;
        }
      }
    });

    if (userLoggedInIsEditorOfTask.length > 0) {
      setIsTaskEditor(true);
    } else {
      setIsTaskEditor(false);
    }
  }, []);

  const handleClick = (e, id) => {
    e.stopPropagation();
    dispatch(deleteTask(id));
  };

  const handleRestore = (e, id) => {
    e.stopPropagation();
    const status = "in progress";
    dispatch(updateTask({ status }, id));
  };
  const [show, setShow] = useState(false);
  const [seeMore, setSeeMore] = useState(false);

  return (
    <div>
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
          Task Due Date:
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
              "See More..."
            </Card.Link>
          </div>
        )}
        {seeMore && (
          <div>
            <Card.Text>Provider Name: {singleTask.provider_name}</Card.Text>
            <Card.Text>Booking Number: {singleTask.booking_num}</Card.Text>
            <Row>
              {singleTask.start_date && (
                <div>
                  <Col>
                    <Card.Text>
                      Start Date:
                      {new Date(singleTask.start_date).toLocaleDateString()}
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
                      {new Date(singleTask.end_date).toLocaleDateString()}
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
            <Card.Text>Description: {singleTask.description}</Card.Text>
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

        {!show && isTaskEditor && (
          <div>
            <div style={{ position: "absolute", right: "5em", bottom: "1em" }}>
              <Button
                variant="primary"
                onClick={(e) => handleRestore(e, singleTask.id)}
              >
                Return to In Progress
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

export default connect(null)(CompletedTaskCard);