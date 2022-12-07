import React, { Component } from "react";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import { Button, Card, Tab, Tabs } from "react-bootstrap";
import TaskCard from "./TaskComponents/TaskCard";
import AddNewTaskModal from "./TaskComponents/AddNewTaskModal";
import { getCookie } from "../redux/users";

function dueDateCompare(a, b) {
  return new Date(a.due_date) - new Date(b.due_date);
}

const TripTaskTodo = (props) => {
  const dispatch = useDispatch();
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
        <h3 style={{ flex: 5, width: "fit-contents" }}>Tasks</h3>
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
        <Tab
          tabClassName="in-progress"
          eventKey="inProgress"
          title="In Progress"
        >
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
          title="Completed"
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
