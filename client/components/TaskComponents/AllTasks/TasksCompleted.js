import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {
  getTasksByUser,
  updateTask,
  deleteTask,
} from "../../../redux/taskReducer";
import Modal from "react-bootstrap/Modal";
// ^ to link to a specific trip in trip dashboard

const TasksCompleted = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTasksByUser());
  }, []);

  const handleClick = (e, id) => {
    e.stopPropagation();
    dispatch(deleteTask(id));
  };

  const tasks = props.tasks.allItineraryTasks || [];
  let completeTasks = tasks.filter((task) => task.status === "complete");

  return (
    <div>
      <h3>Past Tasks</h3>
      <div>
        {completeTasks.length == 0 ? (
          <h4>No past tasks</h4>
        ) : (
          completeTasks.map((singleTask) => {
            return (
              <Card
                className="mb-4"
                style={{ width: "40rem" }}
                key={singleTask.id}
              >
                <Card.Body>
                  <Card.Title>{singleTask.type}</Card.Title>
                  <Card.Text>Task Due Date: {singleTask.due_date}</Card.Text>
                  <Card.Text>
                    Provider Name: {singleTask.provider_name}
                  </Card.Text>
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

// export default CompletedTrips
export default connect(mapStateToProps)(TasksCompleted);
