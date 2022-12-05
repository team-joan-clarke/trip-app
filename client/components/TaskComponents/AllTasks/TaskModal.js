import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import { Form, FloatingLabel, Row, Col } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { updateTask } from "../../../redux/taskReducer";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const TaskEditForm = (props) => {
  const { singleTask } = props;
  // console.log(singleTask);

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [start_date, setStart_Date] = useState(singleTask.start_date || null);
  const [end_date, setEnd_Date] = useState(singleTask.end_date || null);
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
  const [link, setLink] = useState(singleTask.link || null);
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
    handleClose();
  };

  const handleClick = (e, id) => {
    e.stopPropagation();
    const status = "complete";
    dispatch(updateTask({ status }, id));
  };

  // "2022-06-17"
  let currentDate = new Date().toJSON().slice(0, 10);

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Edit Task
      </Button>
      <Button variant="primary" onClick={(e) => handleClick(e, singleTask.id)}>
        Completed
      </Button>

      <Modal show={show} onHide={handleClose} scrollable={true}>
        <Modal.Header closeButton>
          <Modal.Title>{singleTask.type}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="taskForm">
              <Row className="g-2 ">
                <Col md>
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    className="date-picker"
                  >
                    <DateTimePicker
                      label="Start Date and Start Time"
                      name="start_date"
                      value={start_date}
                      onChange={(newValue) => {
                        setStart_Date(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                      minDate={dayjs(currentDate)}
                    />
                  </LocalizationProvider>
                </Col>
                <Col>
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    className="date-picker"
                  >
                    <DateTimePicker
                      label="End Date and End Time"
                      name="end_date"
                      value={end_date}
                      onChange={(newValue) => {
                        setEnd_Date(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                      minDate={dayjs(start_date)}
                      minTime={dayjs(start_date)}
                    />
                  </LocalizationProvider>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3" controlId="taskForm">
              <Form.Label>Start Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Starting Address"
                onChange={(e) => setStart_Location(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="taskForm">
              <Form.Check
                type="checkbox"
                id="taskCheckbox"
                label="Check if end location differs from start location."
                onChange={handleChange}
              />
            </Form.Group>

            {checked && (
              <Form.Group className="mb-3" controlId="taskForm">
                <Form.Label>End Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ending Address"
                  onChange={(e) => setEnd_Location(e.target.value)}
                />
              </Form.Group>
            )}

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
