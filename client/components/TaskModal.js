import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Form, FloatingLabel, Row, Col, FormGroup } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
// ^ to link to a specific trip in trip dashboard

const TaskEditForm = (props) => {
  const { singleTask } = props;
  console.log(singleTask);

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [type, setType] = useState(singleTask.type);

  const handleClose = (event) => {
    setShow(false);
    // dispatch(updateTask({

    // }))
  };
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Edit Task
      </Button>
      <Modal show={show} onHide={handleClose} scrollable={true}>
        <Modal.Header closeButton>
          <Modal.Title>{singleTask.type}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleClose}>
            <FloatingLabel
              controlId="floatingSelect"
              label="Select Type of Task"
            >
              <Form.Select
                aria-label="Floating label select example"
                onSelect={(event) => setType(event.target.value)}
              >
                <option> {singleTask.type}</option>
                <option value="Lodging">Lodging</option>
                <option value="Dining">Dining</option>
                <option value="Transportation">Transportation</option>
                <option value="Activity">Activity</option>
                <option value="Entertainment">Activity</option>
              </Form.Select>
            </FloatingLabel>
            <Row className="g-2">
              <Col md>
                <FloatingLabel controlId="floatingInputGrid" label="Start Date">
                  <Form.Control type="text" placeholder="Start Date" />
                </FloatingLabel>
              </Col>
              <Col md>
                <FloatingLabel controlId="floatingSelectGrid" label="End Date">
                  <Form.Select aria-label="Floating label select example">
                    <option>End Date</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col md>
                <FloatingLabel controlId="floatingInputGrid" label="Start Time">
                  <Form.Control type="text" placeholder="Start Date" />
                </FloatingLabel>
              </Col>
              <Col md>
                <FloatingLabel controlId="floatingSelectGrid" label="End Time">
                  <Form.Select aria-label="Floating label select example">
                    <option>End Date</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col>
                <FloatingLabel
                  controlId="floatingInputGrid"
                  label="Starting Location"
                >
                  <Form.Control type="text" placeholder="Starting Address" />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingInputGrid"
                  label="Final Destination"
                >
                  <Form.Control type="text" placeholder="Ending Address" />
                </FloatingLabel>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="taskForm">
              <Form.Label>Booking Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="booking/confirmation number"
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="taskForm">
              <Form.Label>Link</Form.Label>
              <Form.Control type="url" placeholder="link" autoFocus />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Details</Form.Label>
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
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
  };
};

// export default CompletedTrips
export default connect(mapStateToProps)(TaskEditForm);
