import React, { Component, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Alert } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { connect } from "react-redux";
import { updateTask } from "../../redux/taskReducer";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

function EditTaskModal(props) {
  const dispatch = useDispatch();
  const [due_date, setDueDate] = useState(props.task.due_date);
  const [start_date, setStartDate] = useState(props.task.start_date);
  const [end_date, setEndDate] = useState(props.task.end_date);
  const [start_location, setStartLocation] = useState(
    props.task.start_location
  );
  const [end_location, setEndLocation] = useState(props.task.end_location);
  const [description, setDescription] = useState(props.task.description);
  const [booking_num, setBookingNum] = useState(props.task.booking_num);
  const [link, setLink] = useState(props.task.link);
  const [errors, setErrors] = useState([]);
  const [show, setShow] = useState(false);
  const [addedResStatus, setAddedResStatus] = useState("");

  const prevTasksRef = useRef();
  useEffect(() => {
    prevTasksRef.current = tasks;
  });
  const { tasks } = props;

  useEffect(() => {
    if (errors.length > 0) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [errors]);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (due_date) {
        if (errors.length === 0) {
          await dispatch(
            updateTask(
              {
                due_date,
                start_date,
                end_date,
                start_location,
                end_location,
                description,
                booking_num,
                link,
                status: "in progress",
                TripId: props.tripId,
              },
              props.task.id
            )
          );
          if (JSON.stringify(prevTasksRef.current) !== JSON.stringify(tasks)) {
            setDueDate(null);
            setStartDate(null);
            setEndDate(null);
            setStartLocation("");
            setEndLocation("");
            setDescription("");
            setBookingNum("");
            setLink("");
            setAddedResStatus("success");
          }
        }
      } else {
        if (!due_date) {
          const dueDateError = [...errors, "Must include dute date."];
          setErrors(dueDateError);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    if (event.target.name === "start_location") {
      setStartLocation(event.target.value);
    } else if (event.target.name === "end_location") {
      setEndLocation(event.target.value);
    } else if (event.target.name === "description") {
      setDescription(event.target.value);
    } else if (event.target.name === "booking_num") {
      setBookingNum(event.target.value);
    } else if (event.target.name === "link") {
      const urlRegex = new RegExp(
        "^(https?:\\/\\/)?" +
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
          "((\\d{1,3}\\.){3}\\d{1,3}))" +
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
          "(\\?[;&a-z\\d%_.~+=-]*)?" +
          "(\\#[-a-z\\d_]*)?$",
        "i"
      );
      const linkBool = urlRegex.test(event.target.value);

      if (linkBool || event.target.value.length === 0) {
        if (errors.includes("Link must be a url.")) {
          const filtered = errors.filter(
            (error) => error !== "Link must be a url."
          );
          setErrors([...filtered]);
        }
      } else if (!linkBool && !errors.includes("Link must be a url.")) {
        setErrors([...errors, "Link must be a url."]);
      }
      setLink(event.target.value);
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit {`${props.task.provider_name}`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {addedResStatus === "success" && errors.length === 0 ? (
          <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img src="/palmtree_limegreen.png" style={{ height: "20rem" }} />
            </div>
            <h3>Task Successfully Added!</h3>
            <Button
              variant="primary"
              type="submit"
              style={{ float: "right" }}
              onClick={(e) => {
                setAddedResStatus("");
                props.onHide(e);
              }}
            >
              Done
            </Button>
          </div>
        ) : (
          <Form>
            {/* DUE DATE */}
            <Form.Group
              className="mb-3"
              name="dueDate"
              controlId="formTaskDUEDATE"
            >
              <Form.Label>Due Date</Form.Label>
              <div className="date-picker">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Due Date"
                    name="due_date"
                    minDate={new Date()}
                    maxDate={new Date(props.trip.end_date)}
                    value={due_date}
                    onChange={(newValue) => {
                      if (errors.includes("Must include dute date.")) {
                        const filtered = errors.filter(
                          (error) => error !== "Must include dute date."
                        );
                        setErrors([...filtered]);
                      }
                      setDueDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </div>
            </Form.Group>
            <div id="start-end-date-flex" style={{ display: "flex" }}>
              {/* STARTDATE W/ START TIME CALENDAR VIEW */}
              <Form.Group
                className="mb-3"
                controlId="formTaskSTARTDATE"
                style={{ flex: 1 }}
              >
                <Form.Label>Start Date</Form.Label>
                <div className="date-picker">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      label="Start Date"
                      name="start_date"
                      minDate={new Date(props.trip.start_date)}
                      maxDate={new Date(props.trip.end_date)}
                      value={start_date}
                      onChange={(newValue) => {
                        if (
                          errors.includes(
                            "Must set start date before setting end date."
                          )
                        ) {
                          const filtered = errors.filter(
                            (error) =>
                              error !==
                              "Must set start date before setting end date."
                          );
                          setErrors([...filtered]);
                        }
                        setStartDate(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </div>
              </Form.Group>
              {/* ENDDATE - OPTIONAL ASK? */}
              <Form.Group
                className="mb-3"
                controlId="formTaskENDDATE"
                style={{ flex: 1 }}
              >
                <Form.Label>End Date</Form.Label>
                <div className="date-picker">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="End Date"
                      name="end_date"
                      minDate={new Date(props.trip.start_date)}
                      maxDate={new Date(props.trip.end_date)}
                      value={end_date}
                      onChange={(newValue) => {
                        if (!start_date) {
                          setErrors([
                            ...errors,
                            "Must set start date before setting end date.",
                          ]);
                        } else {
                          if (newValue < start_date) {
                            setErrors([
                              ...errors,
                              "End date must come after start date.",
                            ]);
                          } else {
                            if (
                              errors.includes(
                                "End date must come after start date."
                              )
                            ) {
                              const filtered = errors.filter(
                                (error) =>
                                  error !==
                                  "End date must come after start date."
                              );
                              setErrors([...filtered]);
                            }
                            setEndDate(newValue);
                          }
                        }
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </div>
              </Form.Group>
            </div>
            {/* START LOCATION - OPTIONAL */}
            <Form.Group className="mb-3" controlId="formTaskSTARTLOCATION">
              <Form.Label>Start Location</Form.Label>
              <Form.Control
                type="text"
                name="start_location"
                value={start_location}
                onChange={handleChange}
              />
            </Form.Group>
            {/* END_LOCATION - OPTIONAL */}
            <Form.Group className="mb-3" controlId="formTaskENDLOCATION">
              <Form.Label>End Location</Form.Label>
              <Form.Control
                type="text"
                name="end_location"
                value={end_location}
                onChange={handleChange}
              />
            </Form.Group>
            {/* DESCRIPTION - OPTIONAL AVAIL */}
            <Form.Group className="mb-3" controlId="formTaskDESCRIPTION">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={description}
                onChange={handleChange}
              />
            </Form.Group>
            {/* BOOKINGNUM - OPTIONAL */}
            <Form.Group className="mb-3" controlId="formTaskBOOKINGNUM">
              <Form.Label>Booking Number</Form.Label>
              <Form.Control
                type="text"
                name="booking_num"
                value={booking_num}
                onChange={handleChange}
              />
            </Form.Group>
            {/* LINK - OPTIONAL AVAIL */}
            <Form.Group className="mb-3" controlId="formTaskLINK">
              <Form.Label>Link</Form.Label>
              <Form.Control
                type="text"
                name="link"
                value={link}
                onChange={handleChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={handleSubmit}
              style={{ float: "right" }}
            >
              Submit
            </Button>
          </Form>
        )}
        <Alert show={show} variant="danger" style={{ flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Alert.Heading style={{ float: "left" }}>
              Please fix these errors before proceeding:
            </Alert.Heading>
            <ul>
              {errors.map((error, i) => {
                return <li key={i}>{error}</li>;
              })}
            </ul>
          </div>
          <hr />
        </Alert>
      </Modal.Body>
    </Modal>
  );
}

export default connect(null)(EditTaskModal);
