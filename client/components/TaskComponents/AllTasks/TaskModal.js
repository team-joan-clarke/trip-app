import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import { Form, FloatingLabel, Row, Col } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { updateTask, deleteTask } from "../../../redux/taskReducer";
// ^ to link to a specific trip in trip dashboard

const TaskEditForm = (props) => {
  const { singleTask } = props;
  console.log(singleTask);

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [start_date, setStart_Date] = useState(singleTask.start_date || null);
  const [end_date, setEnd_Date] = useState(singleTask.endt_date || null);
  const [start_time, setStart_Time] = useState(singleTask.start_time || null);
  const [end_time, setEnd_Time] = useState(singleTask.end_time || null);
  const [start_location, setStart_Location] = useState(
    singleTask.start_location || null
  );
  const [end_location, setEnd_Location] = useState(
    singleTask.end_location || ""
  );
  const [provider_name, setProvider_Namer] = useState(
    singleTask.provider_name || ""
  );
  const [booking_num, setBooking_Num] = useState(singleTask.booking_num || "");
  const [link, setLink] = useState(singleTask.link || "");
  const [description, setDescription] = useState(singleTask.description || "");
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      updateTask(
        {
          start_date,
          end_date,
          start_time,
          end_time,
          start_location,
          end_location,
          provider_name,
          booking_num,
          link,
          description,
        },
        singleTask.id
      )
    );
  };

  const handleClick = (e, id) => {
    e.stopPropagation();
    const status = "complete";
    dispatch(updateTask({ status }, id));
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    dispatch(deleteTask(id));
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Edit Task
      </Button>
      <Button variant="primary" onClick={(e) => handleClick(e, singleTask.id)}>
        Completed
      </Button>
      <Button variant="primary" onClick={(e) => handleDelete(e, singleTask.id)}>
        Delete
      </Button>

      <Modal show={show} onHide={handleClose} scrollable={true}>
        <Modal.Header closeButton>
          <Modal.Title>{singleTask.type}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="g-2">
              <Col md>
                <FloatingLabel controlId="floatingInputGrid" label="Start Date">
                  <Form.Control
                    type="text"
                    placeholder="Start Date"
                    onChange={(e) => setStart_Date(e.target.value)}
                  />
                </FloatingLabel>
              </Col>
              <Col md>
                <FloatingLabel controlId="floatingInputGrid" label="End Date">
                  <Form.Control
                    type="text"
                    placeholder="End Date"
                    onChange={(e) => setEnd_Date(e.target.value)}
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col md>
                <FloatingLabel controlId="floatingInputGrid" label="Start Time">
                  <Form.Control
                    type="text"
                    placeholder="Start Date"
                    onChange={(e) => setStart_Time(e.target.value)}
                  />
                </FloatingLabel>
              </Col>
              <Col md>
                <FloatingLabel controlId="floatingInputGrid" label="End Time">
                  <Form.Control
                    type="text"
                    placeholder="End Date"
                    onChange={(e) => setEnd_Time(e.target.value)}
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col>
                <FloatingLabel
                  controlId="floatingInputGrid"
                  label="Starting Location"
                >
                  <Form.Control
                    type="text"
                    placeholder="Starting Address"
                    onChange={(e) => setStart_Location(e.target.value)}
                  />
                </FloatingLabel>
              </Col>
              <Form.Check
                type="checkbox"
                id="taskCheckbox"
                label="Check if end location differs from start location."
                onChange={handleChange}
              />

              {checked && (
                <Col>
                  <FloatingLabel
                    controlId="floatingInputGrid"
                    label="End Location"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Ending Address"
                      onChange={(e) => setEnd_Location(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>
              )}
            </Row>

            <Form.Group className="mb-3" controlId="taskForm">
              <Form.Label>Provider Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Hotel Name, Airline, etc..."
                onChange={(e) => setProvider_Namer(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="taskForm">
              <Form.Label>Booking Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="booking/confirmation number"
                onChange={(e) => setBooking_Num(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="taskForm">
              <Form.Label>Link</Form.Label>
              <Form.Control
                type="url"
                placeholder="link"
                autoFocus
                onChange={(e) => setLink(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
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
