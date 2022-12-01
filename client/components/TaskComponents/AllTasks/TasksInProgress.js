import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import {
  getTasksByUser,
  updateTask,
  deleteTask,
} from "../../../redux/taskReducer";
import TaskModal from "./TaskModal";
// ^ to link to a specific trip in trip dashboard

const TasksInProgress = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTasksByUser());
  }, []);

  const handleClick = (e, id) => {
    e.stopPropagation();
    dispatch(updateTask(id));
  };
  const tasks = props.tasks.allItineraryTasks || [];
  let inProgressTasks = tasks.filter((task) => task.status === "in progress");

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
                style={{ width: "40rem" }}
                key={singleTask.id}
              >
                <Card.Body>
                  {/* <Form>
                    <Form.Check
                      reverse
                      type="checkbox"
                      id="taskCheckbox"
                      label="completed"
                      onSubmit={handleChange(singleTask)}
                    />
                  </Form> */}
                  {/* <Checkbox singleTask={singleTask} /> */}
                  <Card.Title>{singleTask.type}</Card.Title>
                  <Card.Text>Task Due Date: {singleTask.due_date}</Card.Text>
                  <Card.Text>
                    Provider Name: {singleTask.provider_name}
                  </Card.Text>
                  <TaskModal singleTask={singleTask} />
                  <Button
                    variant="primary"
                    onClick={(e) => handleClick(e, singleTask.id)}
                  >
                    Delete Task From History
                  </Button>
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
