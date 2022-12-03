import React, { Component, useEffect, useState, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { Draggable } from "react-beautiful-dnd";
import EditTaskModal from "./EditTaskModal";
import { deleteTask, updateTask } from "../../redux/taskReducer";

function timeDisplayConverter(time) {
  const formattedTime = new Date(time).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return formattedTime;
}

const TaskCard = (props) => {
  const dispatch = useDispatch();
  const [seeMore, setSeeMore] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  const taskStartTime = timeDisplayConverter(props.task.start_date);

  const handleClick = (e, id) => {
    // e.stopPropagation();
    e.preventDefault();
    const status = "complete";
    dispatch(updateTask({ status }, id));
  };

  const handleDelete = (e, id) => {
    // e.stopPropagation();
    e.preventDefault();
    setShow(false);
    dispatch(deleteTask(id));
  };
  const [show, setShow] = useState(false);

  return (
    <>
      <Card
        style={
          props.type === "todo"
            ? { width: "auto", margin: "1rem", boxShadow: "0px 1px 1px grey" }
            : {
                width: "13rem",
                marginTop: ".5rem",
                marginBottom: ".5rem",
                boxShadow: "0px 1px 1px grey",
              }
        }
      >
        <Card.Body>
          <Card.Title>{props.task.provider_name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {props.task.type}: {props.task.subtype ? props.task.subtype : ""}
          </Card.Subtitle>
          {props.type === "todo" ? (
            <Card.Text>
              Due: {new Date(props.task.due_date).toLocaleDateString()}
            </Card.Text>
          ) : (
            <Card.Text>Start: {taskStartTime}</Card.Text>
          )}
          {props.task.description && seeMore ? (
            <Card.Text>Description: {props.task.description}</Card.Text>
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
            {props.type === "todo" ? (
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
                  To delete, press the delete button. To cancel request, press
                  cancel.
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
              {!show && (
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
            </div>
          </div>
        </Card.Body>
      </Card>
      <EditTaskModal
        task={props.task}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default connect(null)(TaskCard);
