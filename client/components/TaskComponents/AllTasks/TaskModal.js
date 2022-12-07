import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { Form, Row, Col, Alert, Toast, ToastContainer } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { updateTask, deleteTask } from "../../../redux/taskReducer";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { getCookie } from "../../../redux/users";
import EditTaskAttendees from "./EditTaskAttendees";
import { fetchSingleTrip } from "../../../redux/tripReducer";

const TaskEditForm = (props) => {
  const { singleTask } = props;
  const { TripId } = singleTask;
  const Users = props.tripUsers.singleTripView.Users || [];

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [checked, setChecked] = useState(false);
  const [success, setSucess] = useState(false);
  const [alert, setAlert] = useState(false);
  const [delete_Task, setDelete_Task] = useState(false);
  const [timeError, setTimeError] = useState(false);
  const [isTaskEditor, setIsTaskEditor] = useState(false);
  const [isTripOwner, setIsTripOwner] = useState(false);
  const [showMarkAlert, setShowMarkAlert] = useState(false);
  const [showSuccessToast, setSuccessToast] = useState(false);

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

  const handleChange = () => {
    setChecked(!checked);
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //URL validation:
  const urlPatternValidation = (URL) => {
    const regex = new RegExp(
      "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"
    );
    return regex.test(URL);
  };

  useEffect(() => {
    dispatch(fetchSingleTrip(TripId));
  }, []);

  // USER IS EDITOR OF TASK or OWNER OF TRIP:
  const idOfUserLoggedIn = getCookie("userId");
  useEffect(() => {
    const userLoggedInIsEditorOfTask = singleTask.Users.filter((user) => {
      if (user.id == idOfUserLoggedIn) {
        if (user.user_task.role === "editor") {
          return user;
        }
      }
    });

    // userLoggedIn is owner so they can create, edit and delete their own tasks and DELETE other users' tasks
    const userLoggedInIsOwnerOfTrip = Users.filter((user) => {
      if (user.id == idOfUserLoggedIn) {
        if (user.user_trip.role == "owner") {
          return user;
        }
      }
    });

    if (userLoggedInIsOwnerOfTrip.length > 0) {
      setIsTripOwner(true);
    } else {
      setIsTripOwner(false);
    }

    if (userLoggedInIsEditorOfTask.length > 0) {
      setIsTaskEditor(true);
    } else {
      setIsTaskEditor(false);
    }
  }, [Users]);

  const handleSubmit = (event) => {
    event.preventDefault();
    //checking URL:
    if (link) {
      const isValid = urlPatternValidation(link);
      if (!isValid) {
        return setAlert(true);
      }
    }
    //checking end time is after start time:
    if (end_date) {
      let startDate = start_date.toString().slice(0, 10);
      let endDate = start_date.toString().slice(0, 10);
      if (startDate === endDate) {
        if (start_date > end_date) {
          return setTimeError(true);
        }
      }
    }
    dispatch(
      updateTask(
        {
          TripId,
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
    setShow(false);
    setSuccessToast(true);
  };

  const handleClick = (e, id) => {
    e.stopPropagation();
    if (start_date) {
      const status = "complete";
      dispatch(updateTask({ status, TripId }, id));
    } else {
      setShowMarkAlert(true);
    }
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    setDelete_Task(false);
    dispatch(deleteTask(id, TripId));
  };

  // for maxTime validation:
  let currentDate = new Date().toJSON().slice(0, 10); // "2022-06-17"

  return (
    <div>
      {(isTaskEditor || isTripOwner) && (
        <div>
          {/* Toast when update is successful: */}
          <ToastContainer position="top-end">
            <Toast
              bg="info"
              onClose={() => setSuccessToast(false)}
              show={showSuccessToast}
              delay={4000}
              autohide
            >
              <Toast.Header>
                <img
                  src="holder.js/20x20?text=%20"
                  className="rounded me-2"
                  alt=""
                />
                <strong className="me-auto">trippn</strong>
                <small>Now</small>
              </Toast.Header>
              <Toast.Body>You just edited this task.</Toast.Body>
            </Toast>
          </ToastContainer>

          <Alert show={delete_Task} variant="danger">
            <Alert.Heading>
              Are you sure you want to delete this task?
            </Alert.Heading>
            <p>
              To delete, press the delete button. To cancel request, press
              cancel.
            </p>
            <hr />
            <div className="d-flex justify-content-end">
              <Button onClick={() => setDeleteTask(false)} variant="secondary">
                Cancel
              </Button>
              <Button
                onClick={(e) => handleDelete(e, singleTask.id)}
                variant="danger"
              >
                Delete
              </Button>
            </div>
          </Alert>
          {/* {Adding start date before marking complete:} */}
          <div>
            <Alert show={showMarkAlert} variant="warning">
              <Alert.Heading>
                Please add a start date before proceeding:
              </Alert.Heading>
              <p style={{ display: "block" }}>
                In order to mark as complete a start date is required. Please
                edit task to input a start date.
              </p>
              <hr />
              <div className="d-flex justify-content-end">
                <Button
                  onClick={() => setShowMarkAlert(false)}
                  variant="secondary"
                  style={{
                    marginRight: "1rem",
                    borderRadius: "50px",
                    float: "right",
                  }}
                >
                  Close
                </Button>
              </div>
            </Alert>
          </div>
          <br></br>
          <div style={{ float: "left" }}>
            <EditTaskAttendees singleTask={singleTask} Users={Users} />
          </div>

          <Button
            variant="primary"
            onClick={handleShow}
            style={{ flex: "row", float: "left", marginRight: "1em" }}
          >
            Edit Task
          </Button>

          <Button
            variant="primary"
            onClick={(e) => handleClick(e, singleTask.id)}
            style={{ flex: "row", float: "left" }}
          >
            Completed
          </Button>

          <div
            style={{
              position: "absolute",
              right: "1em",
              bottom: "1em",
            }}
          >
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => setDelete_Task(true)}
            >
              Delete
            </Button>
          </div>

          <Modal show={show} onHide={handleClose} scrollable={true}>
            <Modal.Header closeButton>
              <Modal.Title>{singleTask.type}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* Alert when update unsuccessful: */}
              <Alert variant="warning" show={alert}>
                <Alert.Heading>Unsuccessful...</Alert.Heading>
                <hr />
                <p className="mb-0">Link address must begin a valid URL </p>
                <div className="d-flex justify-content-end">
                  <Button
                    variant="outline-success"
                    onClick={() => {
                      setAlert(false);
                    }}
                  >
                    Close
                  </Button>
                </div>
              </Alert>

              <Alert variant="warning" show={timeError}>
                <Alert.Heading>Unsuccessful...</Alert.Heading>
                <hr />
                <p className="mb-0">
                  End time must be later than the start time{" "}
                </p>
                <div className="d-flex justify-content-end">
                  <Button
                    variant="outline-success"
                    onClick={() => {
                      setTimeError(false);
                    }}
                  >
                    Close
                  </Button>
                </div>
              </Alert>

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
                    value={start_location}
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
                      value={end_location}
                      onChange={(e) => setEnd_Location(e.target.value)}
                    />
                  </Form.Group>
                )}

                <Form.Group className="mb-3" controlId="taskForm">
                  <Form.Label>Provider Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Hotel Name, Airline, etc..."
                    value={provider_name}
                    onChange={(e) => setProvider_Namer(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="taskForm">
                  <Form.Label>Booking Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="booking/confirmation number"
                    value={booking_num}
                    onChange={(e) => setBooking_Num(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="taskForm">
                  <Form.Label>Link</Form.Label>
                  <Form.Control
                    type="url"
                    placeholder="https://www.yourURL"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    value={description}
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
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    tripUsers: state.trips,
  };
};

export default connect(mapStateToProps)(TaskEditForm);
