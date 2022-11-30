import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import { getTasksByUser } from "../redux/taskReducer";
import Modal from "react-bootstrap/Modal";
// ^ to link to a specific trip in trip dashboard

const CompletedTrips = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTasksByUser());
  }, []);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const tasks = props.tasks.allItineraryTasks || [];
  let inProgressTasks = tasks.filter((task) => task.status === "in progress");
  let completeTasks = tasks.filter((task) => task.status === "complete");

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
                  <Card.Title>{singleTask.type}</Card.Title>
                  <Card.Text>Task Due Date: {singleTask.due_date}</Card.Text>
                  <Card.Text>
                    Provider Name: {singleTask.provider_name}
                  </Card.Text>
                  <Button variant="primary" onClick={handleShow}>
                    Edit Task
                  </Button>

                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>{singleTask.type}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>Email address</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="name@example.com"
                            autoFocus
                          />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlTextarea1"
                        >
                          <Form.Label>Example textarea</Form.Label>
                          <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button variant="primary" onClick={handleClose}>
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Modal>
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
export default connect(mapStateToProps)(CompletedTrips);
