import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Form, FloatingLabel, Row, Col, FormGroup } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { updateTask } from "../redux/taskReducer";
// ^ to link to a specific trip in trip dashboard

const TaskEditForm = (props) => {
  const { singleTask } = props;
  console.log(singleTask);

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [start_date, setStart_Date] = useState(singleTask.start_date || "");
  const [end_date, setEnd_Date] = useState(singleTask.endt_date || "");
  const [start_time, setStart_Time] = useState(singleTask.start_time || "");
  const [end_time, setEnd_Time] = useState(singleTask.end_time || "");
  const [start_location, setStart_Location] = useState(
    singleTask.start_location || ""
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
          <Form>
            {/* <FloatingLabel
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
            </FloatingLabel> */}
            <Row className="g-2">
              <Col md>
                <FloatingLabel controlId="floatingInputGrid" label="Start Date">
                  <Form.Control
                    type="text"
                    placeholder="Start Date"
                    // value={start_date}
                    onChange={(e) => setStart_Date(e.target.value)}
                  />
                </FloatingLabel>
              </Col>
              <Col md>
                <FloatingLabel controlId="floatingInputGrid" label="End Date">
                  <Form.Control
                    type="text"
                    placeholder="End Date"
                    // value={end_date}
                    onChange={(e) => setStart_Date(e.target.value)}
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
                    // value={start_time}
                    onChange={(e) => setStart_Date(e.target.value)}
                  />
                </FloatingLabel>
              </Col>
              <Col md>
                <FloatingLabel controlId="floatingInputGrid" label="End Time">
                  <Form.Control
                    type="text"
                    placeholder="End Date"
                    // value={end_time}
                    onChange={(e) => setStart_Date(e.target.value)}
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
                    // value={start_location}
                    onChange={(e) => setStart_Date(e.target.value)}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingInputGrid"
                  label="Final Destination"
                >
                  <Form.Control
                    type="text"
                    placeholder="Ending Address"
                    // value={end_location}
                    onChange={(e) => setStart_Date(e.target.value)}
                  />
                </FloatingLabel>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="taskForm">
              <Form.Label>Provider Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Hotel Name, Airline, etc..."
                // value={provider_name}
                onChange={(e) => setStart_Date(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="taskForm">
              <Form.Label>Booking Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="booking/confirmation number"
                // value={booking_num}
                onChange={(e) => setStart_Date(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="taskForm">
              <Form.Label>Link</Form.Label>
              <Form.Control
                type="url"
                placeholder="link"
                autoFocus
                // value={link}
                onChange={(e) => setStart_Date(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                // value={description}
                onChange={(e) => setStart_Date(e.target.value)}
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
