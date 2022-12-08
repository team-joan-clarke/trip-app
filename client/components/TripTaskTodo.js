import React, { Component } from "react";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import {
  Button,
  Card,
  Tab,
  Tabs,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import TaskCard from "./TaskComponents/TaskCard";
import AddNewTaskModal from "./TaskComponents/AddNewTaskModal";
import { getCookie } from "../redux/users";

function dueDateCompare(a, b) {
  return new Date(a.due_date) - new Date(b.due_date);
}

const popover = (
  <Popover id="popover-basic">
    <Popover.Header as="h3">How to use this checklist</Popover.Header>
    <Popover.Body>
      <strong>Add New Tasks</strong> to keep track of information about trip
      activities. Add trip members to tasks as an editor with editing
      privileges, or attendee. <strong>Mark as Complete</strong> once the task
      has been finalized in order to view activity on itinerary.
    </Popover.Body>
  </Popover>
);

const TripTaskTodo = (props) => {
  const { trip } = props;
  const tasks = useSelector((state) => state.tasks.allItineraryTasks);
  const [todo, setTodo] = useState([]);
  const [done, setDone] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);

  useEffect(() => {
    // SORTING TASKS BY DUE DATE
    const todoTasks = tasks.filter((task) => task.status === "in progress");
    const doneTasks = tasks.filter((task) => task.status === "complete");
    todoTasks.sort(dueDateCompare);
    doneTasks.sort(dueDateCompare);
    setTodo(todoTasks);
    setDone(doneTasks);
  }, [tasks]);

  // ROLE HANDLING
  const [isTripOwner, setIsTripOwner] = useState(false);
  const [isTripEditor, setIsTripEditor] = useState(false);
  const idOfUserLoggedIn = getCookie("userId");
  const tripUsers = trip.Users;
  const usersInTrip = tripUsers ? tripUsers : [];

  useEffect(() => {
    // userLoggedIn is owner so they can create new tasks
    const userLoggedInIsOwnerOfTrip = usersInTrip.filter((user) => {
      if (user.id == idOfUserLoggedIn) {
        if (user.user_trip.role == "owner") {
          return user;
        }
      }
    });

    // user logged in is editor so they can create tasks
    const userLoggedInIsEditorOfTrip = usersInTrip.filter((user) => {
      if (user.id == idOfUserLoggedIn) {
        if (user.user_trip.role == "editor") {
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
  }, [trip.Users, tasks]);

  return (
    <div
      style={{
        width: "auto",
        flexDirection: "row",
        flexWrap: "wrap",
        padding: "2rem",
        borderRadius: "5px",
        boxShadow: "2px 1px 20px grey",
        marginTop: "3rem",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}
      >
        <div
          style={{
            display: "flex",
            flex: 5,
            flexDirection: "row",
            flexWrap: "nowrap",
            alignContent: "center",
          }}
        >
          <h3 style={{ width: "fit-contents" }}>Task Planning Checklist</h3>
          <OverlayTrigger trigger="click" placement="right" overlay={popover}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-info-circle"
              viewBox="0 0 16 16"
              style={{ float: "left", margin: "10px" }}
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
            </svg>
          </OverlayTrigger>
        </div>
        {/* conditional render here to allow only editors and owners to add a new task to trip */}
        {isTripOwner || isTripEditor ? (
          <Button
            variant="primary"
            style={{
              flex: 1,
              width: "fit-contents",
              float: "right",
              marginRight: "1rem",
            }}
            onClick={() => setModalShow(true)}
          >
            Add New Task
          </Button>
        ) : (
          <h1></h1>
        )}
      </div>
      <Tabs defaultActiveKey="inProgress" id="uncontrolled-tab-example" fill>
        <Tab tabClassName="in-progress" eventKey="inProgress" title="Planning">
          <div>
            {todo.map((task, i) => {
              return (
                <TaskCard
                  key={i}
                  task={task}
                  type="todo"
                  style={{ width: "100%" }}
                  trip={props.trip}
                />
              );
            })}
          </div>
        </Tab>
        <Tab
          tabClassName="completed"
          eventKey="completed"
          title="Finalized"
          transition={false}
        >
          <div>
            {done.map((task, i) => {
              return (
                <TaskCard
                  key={i}
                  task={task}
                  type="todo"
                  status="done"
                  style={{ width: "100%" }}
                  trip={props.trip}
                />
              );
            })}
          </div>
        </Tab>
      </Tabs>
      <AddNewTaskModal
        trip={trip ? trip : null}
        show={modalShow}
        onHide={() => setModalShow(false)}
        tasks={tasks}
      />
    </div>
  );
};
export default connect(null)(TripTaskTodo);
