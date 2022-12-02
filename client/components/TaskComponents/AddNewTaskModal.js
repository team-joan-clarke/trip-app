import React, { Component, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
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
  const [addedResStatus, setAddedResStatus] = useState("");

  const prevTasksRef = useRef();
  useEffect(() => {
    prevTasksRef.current = tasks;
  }, []);
  const { tasks } = props;

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
    } else if (type === "Recreation") {
      return (
        <Form.Select name="subtype" onChange={handleChange}>
          <option>Choose task subtype...</option>
          <option>Outdoors</option>
          <option>Entertainment</option>
          <option>Sports</option>
          <option>Arts</option>
          <option>Tours</option>
          <option>Other</option>
        </Form.Select>
      );
    } else if (type === "Business") {
      return (
        <Form.Select name="subtype" onChange={handleChange}>
          <option>Choose task subtype...</option>
          <option>Meeting</option>
          <option>Presentation</option>
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
    try {
      dispatch(
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
            TripId: props.trip,
          },
          "editor"
        )
      );
      if (prevTasksRef.current !== tasks) {
        setType("");
        setSubtype("");
        setProvider("");
        setDueDate(null);
        setAddedResStatus("success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    if (event.target.name === "type") {
      setType(event.target.value);
    } else if (event.target.name === "subtype") {
      setSubtype(event.target.value);
    } else if (event.target.name === "provider_name") {
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
          Add New Task
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {addedResStatus !== "success" ? (
          <Form>
            {/* TYPE - SELECT */}
            <Form.Group className="mb-3" controlId="formTaskTYPE">
              <Form.Label>Task Type &#40;required&#41;</Form.Label>
              <Form.Select name="type" onChange={handleChange}>
                <option value="">Choose task type...</option>
                <option value="Transportation">Transportation</option>
                <option value="Lodging">Lodging</option>
                <option value="Dining">Dining</option>
                <option value="Recreation">Recreation</option>
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
              <Form.Label>Due Date &#40;required&#41;</Form.Label>
              <div className="date-picker">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Due Date"
                    name="due_date"
                    value={due_date}
                    onChange={(newValue) => {
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
                      value={start_date}
                      onChange={(newValue) => {
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
                      value={end_date}
                      onChange={(newValue) => {
                        setEndDate(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </div>
              </Form.Group>
            </div>
            {/* START_TIME - ADDED AS START TIME AND TO STARTDATE*/}
            {/* END_TIME - OPTIONAL */}
            {/* CHECKIN - OPTIONAL */}
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
        ) : (
          <div>
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
        )}
      </Modal.Body>
    </Modal>
  );
}

export default connect(null)(AddNewTaskModal);
