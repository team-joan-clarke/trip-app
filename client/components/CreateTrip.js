import React, { useState } from "react";
import { connect } from "react-redux";
import { createNewTrip } from "../redux/tripReducer";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

const CreateTrip = (props) => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [status, setStatus] = useState("active");
  const [show, setShow] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.createNewTrip({
      name,
      city,
      state,
      country,
      start_date,
      end_date,
      status,
    });
    setName("");
    setCity("");
    setState("");
    setCountry("");
    setStartDate("");
    setEndDate("");
    setStatus("active");
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Create Trip
      </Button>
      <Modal show={show} onHide={handleClose} scrollable={true}>
        <Modal.Header closeButton>
          <Modal.Title>Create Trip</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="edit-trip-form">
              <Form.Control
                type="text"
                name="name"
                placeholder="Trip Name"
                value={name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="edit-trip-form">
              <Form.Control
                type="text"
                name="city"
                placeholder="City"
                value={city}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="edit-trip-form">
              <Form.Control
                type="text"
                name="state"
                placeholder="State"
                value={state}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="edit-trip-form">
              <Form.Control
                type="text"
                name="country"
                placeholder="Country"
                value={country}
                onChange={handleChange}
              />
            </Form.Group>

            <div>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                className="date-picker"
              >
                <DatePicker
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
            <div>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                className="date-picker"
              >
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
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    createNewTrip: (trip) => dispatch(createNewTrip(trip)),
  };
};

export default connect(null, mapDispatch)(CreateTrip);
