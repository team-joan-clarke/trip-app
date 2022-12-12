import React, { Component, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { connect } from "react-redux";
import { updateTask } from "../../redux/taskReducer";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

function EditTaskModal(props) {
  const dispatch = useDispatch();
  const [provider_name, setProviderName] = useState(props.task.provider_name);
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
    prevTasksRef.current = JSON.stringify(props.task);
  });

  useEffect(() => {
    if (errors.length > 0) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [errors]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      errors.includes(
        "Error: Could not update task at this time. Please try again later."
      )
    ) {
      const filtered = errors.filter(
        (error) =>
          error !==
          "Error: Could not update task at this time. Please try again later."
      );
      setErrors(filtered);
    }
    try {
      if (due_date && provider_name.length > 0) {
        if (errors.length === 0) {
          dispatch(
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
          setTimeout(() => {
            if (prevTasksRef.current !== JSON.stringify(props.task)) {
              setDueDate(props.task.due_date);
              setStartDate(props.task.start_date);
              setEndDate(props.task.end_date);
              setStartLocation(props.task.start_locaion);
              setEndLocation(props.task.end_location);
              setDescription(props.task.description);
              setBookingNum(props.task.booking_num);
              setLink(props.task.link);
              // setAddedResStatus("success");
              // setShow(false);
              props.onHide();
              props.onSuccess();
            } else {
              setErrors([
                ...errors,
                "Error: Could not update task at this time. Please try again later.",
              ]);
            }
          }, "1000");
          // setAddedResStatus("false");
        }
      } else {
        if (!due_date) {
          const dueDateError = [...errors, "Must include dute date."];
          setErrors(dueDateError);
        }
        if (provider_name.length < 1) {
          const providerError = [
            ...errors,
            "Must include a location name, activity name, or title.",
          ];
          setErrors(providerError);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    if (event.target.name === "provider_name") {
      if (
        errors.includes(
          "Must include a location name, activity name, or title."
        )
      ) {
        const filtered = errors.filter(
          (error) =>
            error !== "Must include a location name, activity name, or title."
        );
        setErrors([...filtered]);
      }
      setProviderName(event.target.value);
    } else if (event.target.name === "start_location") {
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
    <div>
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
            <></>
          ) : (
            <Form>
              {/* LOCATION NAME/TITLE */}
              <Form.Group className="mb-3" controlId="formTaskPROVIDER">
                <Form.Label>
                  Location Name, Activity, or Title &#40;required&#41;
                </Form.Label>
                <Form.Control
                  type="text"
                  name="provider_name"
                  value={provider_name}
                  onChange={handleChange}
                />
              </Form.Group>
              {/* DUE DATE */}
              <Form.Group
                className="mb-3"
                name="dueDate"
                controlId="formTaskDUEDATE"
              >
                <Form.Label>
                  {" "}
                  Task Confirmation Due Date &#40;goal date for
                  booking&#47;buying&#47;etc.&#41; &#40;required&#41;
                </Form.Label>
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
                  <Form.Label>Activity Start Date</Form.Label>
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
                  <Form.Label>Activity End Date</Form.Label>
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
          <Alert
            show={show}
            variant="danger"
            style={{ flexDirection: "column" }}
          >
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
    </div>
  );
}

export default connect(null)(EditTaskModal);
