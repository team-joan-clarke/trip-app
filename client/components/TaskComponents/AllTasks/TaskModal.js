import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { Form, FloatingLabel, Row, Col, Alert } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { updateTask, deleteTask } from "../../../redux/taskReducer";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { getCookie } from "../../../redux/users";
import Searchbar from "../../Attendees/Searchbar";
import EditTaskAttendees from "./EditTaskAttendees";

const TaskEditForm = (props) => {
  const { singleTask } = props;

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [checked, setChecked] = useState(false);
  const [success, setSucess] = useState(false);
  const [alert, setAlert] = useState(false);
  const [deleteTask, setDeleteTask] = useState(false);
  const [timeError, setTimeError] = useState(false);
  const [isTaskEditor, setIsTaskEditor] = useState(false);
  const [showMarkAlert, setShowMarkAlert] = useState(false);

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

  // USER IS EDITOR OF TASK:
  const idOfUserLoggedIn = getCookie("userId");
  useEffect(() => {
    const userLoggedInIsEditorOfTask = singleTask.Users.filter((user) => {
      if (user.id == idOfUserLoggedIn) {
        if (user.user_task.role === "editor") {
          return user;
        }
      }
    });

    if (userLoggedInIsEditorOfTask.length > 0) {
      setIsTaskEditor(true);
    } else {
      setIsTaskEditor(false);
    }
  }, []);

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
    setSucess(true);
  };

  const handleClick = (e, id) => {
    e.stopPropagation();
    // const status = "complete";
    // dispatch(updateTask({ status }, id));
    console.log("I am in the click");
    if (start_date) {
      const status = "complete";
      dispatch(updateTask({ status }, id));
    } else {
      setShowMarkAlert(true);
    }
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    setDeleteTask(false);
    dispatch(deleteTask(id));
  };

  // for maxTime validation:
  let currentDate = new Date().toJSON().slice(0, 10); // "2022-06-17"

  return (
    <div>
      {isTaskEditor && (
        <div>
          <Alert show={deleteTask} variant="danger">
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
          <br></br>
          <div style={{ float: "left" }}>
            <EditTaskAttendees singleTask={singleTask} />
          </div>

          <Alert show={showMarkAlert} variant="warning">
            <Alert.Heading>
              Please fix these errors before proceeding:
            </Alert.Heading>
            <p style={{ display: "block" }}>
              This task does not have a start date. Please add a start date
              before marking as complete.
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
              onClick={() => setDeleteTask(true)}
            >
              Delete
            </Button>
          </div>

          <Modal show={show} onHide={handleClose} scrollable={true}>
            <Modal.Header closeButton>
              <Modal.Title>{singleTask.type}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* Alert when update is successful: */}
              <Alert variant="success" show={success}>
                <Alert.Heading>Sucess!</Alert.Heading>
                <hr />
                <p className="mb-0">Your Task was sucessfully updated!</p>
                <div className="d-flex justify-content-end">
                  <Button
                    variant="outline-success"
                    onClick={() => {
                      setSucess(false);
                      handleClose();
                    }}
                  >
                    Dashboard
                  </Button>
                </div>
              </Alert>

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
                    placeholder="https://www.yourURL"
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
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
  };
};

export default connect(mapStateToProps)(TaskEditForm);
