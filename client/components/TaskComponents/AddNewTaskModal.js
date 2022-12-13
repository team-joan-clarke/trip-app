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
import { addNewTask } from "../../redux/taskReducer";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

function AddNewTaskModal(props) {
  const dispatch = useDispatch();
  const [type, setType] = useState("");
  const [subtype, setSubtype] = useState("");
  const [provider_name, setProvider] = useState("");
  const [due_date, setDueDate] = useState(null);
  const [start_date, setStartDate] = useState(null);
  const [end_date, setEndDate] = useState(null);
  const [start_location, setStartLocation] = useState("");
  const [end_location, setEndLocation] = useState("");
  const [description, setDescription] = useState("");
  const [booking_num, setBookingNum] = useState("");
  const [link, setLink] = useState("");
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

  function conditionalSubtypeOptions(type) {
    if (type === "Transportation") {
      return (
        <Form.Select name="subtype" onChange={handleChange}>
          <option>Choose task subtype...</option>
          <option>Flight</option>
          <option>Train</option>
          <option>Bus</option>
          <option>Car</option>
          <option>Bike</option>
          <option>Public Transportation</option>
          <option>Walk</option>
        </Form.Select>
      );
    } else if (type === "Lodging") {
      return (
        <Form.Select name="subtype" onChange={handleChange}>
          <option>Choose task subtype...</option>
          <option>Hotel</option>
          <option>Private Rental</option>
          <option>Camping</option>
          <option>Couch Surfing</option>
          <option>Friends and Family</option>
        </Form.Select>
      );
    } else if (type === "Dining") {
      return (
        <Form.Select name="subtype" onChange={handleChange}>
          <option>Choose task subtype...</option>
          <option>Breakfast</option>
          <option>Brunch</option>
          <option>Lunch</option>
          <option>Dinner</option>
          <option>Snack</option>
        </Form.Select>
      );
    } else if (type === "Activity") {
      return (
        <Form.Select name="subtype" onChange={handleChange}>
          <option>Choose task subtype...</option>
          <option>Outdoors</option>
          <option>Entertainment</option>
          <option>Sports</option>
          <option>Arts</option>
          <option>Tour</option>
          <option>Other</option>
        </Form.Select>
      );
    } else if (type === "Business") {
      return (
        <Form.Select name="subtype" onChange={handleChange}>
          <option>Choose task subtype...</option>
          <option>Meeting</option>
          <option>Presentation</option>
          <option>Round Table</option>
          <option>Keynote</option>
          <option>Lab</option>
          <option>Mixer</option>
          <option>Check In</option>
        </Form.Select>
      );
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      errors.includes(
        "Error: Could not add task at this time. Please try again later."
      )
    ) {
      const filtered = errors.filter(
        (error) =>
          error !==
          "Error: Could not add task at this time. Please try again later."
      );
      setErrors(filtered);
    }
    try {
      if (due_date && type && subtype && provider_name) {
        if (errors.length === 0) {
          await dispatch(
            addNewTask(
              {
                type,
                subtype,
                provider_name,
                due_date,
                start_date,
                end_date,
                start_location,
                end_location,
                description,
                booking_num,
                link,
                status: "in progress",
                TripId: props.trip.id,
              },
              "editor"
            )
          );
          if (JSON.stringify(prevTasksRef.current) !== JSON.stringify(tasks)) {
            setType("");
            setSubtype("");
            setProvider("");
            setDueDate(null);
            setStartDate(null);
            setEndDate(null);
            setStartLocation("");
            setEndLocation("");
            setDescription("");
            setBookingNum("");
            setLink("");
            setAddedResStatus("success");
          } else {
            setErrors([
              ...errors,
              "Error: Could not update task at this time. Please try again later.",
            ]);
          }
        }
      } else {
        if (
          !provider_name &&
          !errors.includes(
            "Must include a location name, activity name, or title."
          )
        ) {
          const providerError = [
            ...errors,
            "Must include a location name, activity name, or title.",
          ];
          setErrors(providerError);
        }
        if (!subtype && !errors.includes("Must include subtype.")) {
          const subtypeError = [...errors, "Must include subtype."];
          setErrors(subtypeError);
        }
        if (!type && !errors.includes("Must include type.")) {
          const typeError = [...errors, "Must include type."];
          setErrors(typeError);
        }
        if (!due_date && !errors.includes("Must include dute date.")) {
          const dueDateError = [...errors, "Must include dute date."];
          setErrors(dueDateError);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    if (event.target.name === "type") {
      if (errors.includes("Must include type.")) {
        const filtered = errors.filter(
          (error) => error !== "Must include type."
        );
        setErrors([...filtered]);
      }
      setType(event.target.value);
    } else if (event.target.name === "subtype") {
      if (errors.includes("Must include subtype.")) {
        const filtered = errors.filter(
          (error) => error !== "Must include subtype."
        );
        setErrors([...filtered]);
      }
      setSubtype(event.target.value);
    } else if (event.target.name === "provider_name") {
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
      setProvider(event.target.value);
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
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        closeButton
        onClick={(e) => {
          e.preventDefault();
          setErrors([]);
        }}
      >
        <Modal.Title id="contained-modal-title-vcenter">
          Add New Task
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5 style={{ marginTop: "1rem" }}>Preparing for liftoff? </h5>
        <p style={{ marginTop: "1rem", marginBottom: "2rem" }}>
          Add a new task to keep track of your trip todos. Please add an
          activity type, subtype, title, and the due date by which information
          related to this task should be marked as complete.
        </p>
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
            {/* TYPE - SELECT */}
            <Form.Group className="mb-3" controlId="formTaskTYPE">
              <Form.Label>Task Type &#40;required&#41;</Form.Label>
              <Form.Select name="type" onChange={handleChange}>
                <option value="">Choose task type...</option>
                <option value="Transportation">Transportation</option>
                <option value="Lodging">Lodging</option>
                <option value="Dining">Dining</option>
                <option value="Activity">Recreation</option>
                <option value="Business">Business</option>
              </Form.Select>
            </Form.Group>
            {/* SUBTYPE - SELECT BASED ON TYPE */}
            <Form.Group className="mb-3" controlId="formTaskSUBTYPE">
              <Form.Label>Task SubType &#40;required&#41;</Form.Label>
              {type ? (
                conditionalSubtypeOptions(type)
              ) : (
                <Form.Select name="subtype" onChange={handleChange}>
                  <option>Choose task subtype...</option>
                </Form.Select>
              )}
            </Form.Group>
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
                        if (
                          !start_date &&
                          !errors.includes(
                            "Must set start date before setting end date."
                          )
                        ) {
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
              Add Task
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

export default connect(null)(AddNewTaskModal);
