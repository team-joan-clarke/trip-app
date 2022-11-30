import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Form, FloatingLabel, Row, Col, FormGroup } from "react-bootstrap";
import { getTasksByUser, updateTask } from "../redux/taskReducer";
import Modal from "react-bootstrap/Modal";
// ^ to link to a specific trip in trip dashboard

const TasksInProgress = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTasksByUser());
  }, []);

  const [show, setShow] = useState(false);
  const handleClose = (event) => {
    setShow(false);
    // dispatch(updateTask({

    // }))
  };
  const handleShow = () => setShow(true);

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
                      <Form onSubmit={handleClose}>
                        <FloatingLabel
                          controlId="floatingSelect"
                          label="Select Type of Task"
                        >
                          <Form.Select aria-label="Floating label select example">
                            <option> {singleTask.type}</option>
                            <option value="Lodging">Lodging</option>
                            <option value="Dining">Dining</option>
                            <option value="Transportation">
                              Transportation
                            </option>
                            <option value="Activity">Activity</option>
                          </Form.Select>
                        </FloatingLabel>

                        <Row className="g-2">
                          <Col md>
                            <FloatingLabel
                              controlId="floatingInputGrid"
                              label="Start Date"
                            >
                              <Form.Control
                                type="text"
                                placeholder="Start Date"
                              />
                            </FloatingLabel>
                          </Col>
                          <Col md>
                            <FloatingLabel
                              controlId="floatingSelectGrid"
                              label="End Date"
                            >
                              <Form.Select aria-label="Floating label select example">
                                <option>End Date</option>
                              </Form.Select>
                            </FloatingLabel>
                          </Col>
                          <Col md>
                            <FloatingLabel
                              controlId="floatingInputGrid"
                              label="Start Time"
                            >
                              <Form.Control
                                type="text"
                                placeholder="Start Date"
                              />
                            </FloatingLabel>
                          </Col>
                          <Col md>
                            <FloatingLabel
                              controlId="floatingSelectGrid"
                              label="End Time"
                            >
                              <Form.Select aria-label="Floating label select example">
                                <option>End Date</option>
                              </Form.Select>
                            </FloatingLabel>
                          </Col>
                        </Row>

                        <Form.Group className="mb-3" controlId="taskForm">
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
                      <Button variant="primary" type="submit">
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
export default connect(mapStateToProps)(TasksInProgress);
