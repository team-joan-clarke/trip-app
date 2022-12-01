import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
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
  const [show, setShow] = useState(false);

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
                  <Alert show={show} variant="danger">
                    <Alert.Heading>
                      Are you sure you want to delete this task from your
                      history?
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
                        onClick={(e) => handleClick(e, singleTask.id)}
                        variant="danger"
                      >
                        Delete
                      </Button>
                    </div>
                  </Alert>

                  {!show && (
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => setShow(true)}
                    >
                      Delete
                    </Button>
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

// export default CompletedTrips
export default connect(mapStateToProps)(TasksCompleted);
