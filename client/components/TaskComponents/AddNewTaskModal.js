import React, { Component, useEffect, useState } from "react";
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

function AddNewTaskModal(props) {
  const dispatch = useDispatch();
  const [type, setType] = useState("");
  const [subtype, setSubtype] = useState("");
  const [provider_name, setProvider] = useState("");
  const [due_date, setDueDate] = useState(null);

  const { tripId } = useParams();
  console.log(tripId);

  const handleSubmit = (event) => {
    event.preventDefault();
    addNewTask({
      type,
      subtype,
      provider_name,
      due_date,
      status: "in progress",
    });
    setType("");
    setSubtype("");
    setProvider("");
    setDueDate(null);
  };

  const handleChange = (event) => {
    if (event.target.name === "name") {
      setName(event.target.value);
    } else if (event.target.name === "city") {
      setCity(event.target.value);
    } else if (event.target.name === "state") {
      setState(event.target.value);
    } else if (event.target.name === "country") {
      setCountry(event.target.value);
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
        <Form>
          {/* TYPE - SELECT */}
          <Form.Group className="mb-3" controlId="formTaskTYPE">
            <Form.Label>Task Type &#40;required&#41;</Form.Label>
            <Form.Select>
              <option>Choose task type...</option>
            </Form.Select>
          </Form.Group>
          {/* SUBTYPE - SELECT BASED ON TYPE */}
          <Form.Group className="mb-3" controlId="formTaskSUBTYPE">
            <Form.Label>Task SubType &#40;required&#41;</Form.Label>
            <Form.Select>
              <option>Choose task subtype...</option>
            </Form.Select>
          </Form.Group>
          {/* LOCATION NAME/TITLE */}
          <Form.Group className="mb-3" controlId="formTaskPROVIDER">
            <Form.Label>
              Location Name, Activity, or Title &#40;required&#41;
            </Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          {/* DUE DATE */}
          <Form.Group className="mb-3" controlId="formTaskDUEDATE">
            <Form.Label>Due Date &#40;required&#41;</Form.Label>
            <div className="date-picker">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Due Date"
                  name="due_date"
                  value={""}
                  onChange={(newValue) => {
                    setStartDate(newValue);
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
                  <DatePicker
                    label="Start Date"
                    name="start_date"
                    value={""}
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
                    value={""}
                    onChange={(newValue) => {
                      setStartDate(newValue);
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
            <Form.Control type="text" />
          </Form.Group>
          {/* END_LOCATION - OPTIONAL */}
          <Form.Group className="mb-3" controlId="formTaskENDLOCATION">
            <Form.Label>End Location</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          {/* DESCRIPTION - OPTIONAL AVAIL */}
          <Form.Group className="mb-3" controlId="formTaskDESCRIPTION">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          {/* BOOKINGNUM - OPTIONAL */}
          <Form.Group className="mb-3" controlId="formTaskBOOKINGNUM">
            <Form.Label>Booking Number</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          {/* LINK - OPTIONAL AVAIL */}
          <Form.Group className="mb-3" controlId="formTaskLINK">
            <Form.Label>Link</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Button variant="primary" type="submit" style={{ float: "right" }}>
            Add Task
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default connect(null)(AddNewTaskModal);
