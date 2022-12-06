import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "react-bootstrap/Button";
import { Form, Alert } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";
import { updateThisTrip, fetchSingleTrip } from "../redux/tripReducer";

const EditTrip = (props) => {
  let initialStartDate;
  let initialEndDate;

  const singleTrip = props.trips.singleTripView;
  let { tripId } = useParams();

  if (singleTrip) {
    initialStartDate = singleTrip.start_date;
    initialEndDate = singleTrip.end_date;
  }

  const [tripInfo, setTripInfo] = useState({
    name: "",
    city: "",
    state: "",
    country: "",
    start_date: "",
    end_date: "",
    status: "active",
  });
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [errors, setErrors] = useState([]);
  const [show, setShow] = useState(false);
  const [showErrorMessage, setErrorMessage] = useState(false);

  const errorDictionary = {
    endDateAfterError: [6, "End date must come after start date"],
  };

  //check if error exists already
  const inCurrentErrors = (errorId) => {
    let isACurrentError;
    if (errors.length) {
      isACurrentError = errors.filter((error) => error[0] === errorId);

      if (isACurrentError.length) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  //get updated errors
  const getFilteredErrors = (errorId) => {
    const filteredErrors = errors.filter((error) => error[0] !== errorId);
    return filteredErrors;
  };

  useEffect(() => {
    props.fetchSingleTrip(tripId);
    if (singleTrip) {
      setStartDate(singleTrip.start_date);
      setEndDate(singleTrip.end_date);
    }
    setTripInfo(singleTrip);
  }, [initialStartDate, initialEndDate]);

  //ERROR MESSAGE
  useEffect(() => {
    if (errors.length < 1) {
      setErrorMessage(false);
    } else {
      setErrorMessage(true);
    }
  }, [errors]);

  //SPECIFIC ERROR HANDLING
  useEffect(() => {
    if (start_date > end_date) {
      if (!inCurrentErrors(6)) {
        errors.push(errorDictionary.endDateAfterError);
      }
    } else {
      setErrors(getFilteredErrors(6));
    }

    if (end_date < start_date) {
      if (!inCurrentErrors(6)) {
        errors.push(errorDictionary.endDateAfterError);
      }
    } else {
      setErrors(getFilteredErrors(6));
    }
  }, [start_date, end_date]);

  const handleChange = (event) => {
    setTripInfo({ ...tripInfo, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (singleTrip) {
      if (errors.length === 0) {
        props.updateThisTrip({ ...singleTrip, ...tripInfo }, tripId);
        setTripInfo({
          name: "",
          city: "",
          state: "",
          country: "",
          start_date: "",
          end_date: "",
          status: "active",
        });
        setErrors([]);
        setShow(false);
        setErrorMessage(false);
      } else {
        setErrorMessage(true);
      }
    }
  };

  const handleStartDate = (newValue) => {
    //casts date into comparable value
    let compValue = newValue.$d.toISOString();

    setStartDate(compValue);
    setTripInfo({ ...tripInfo, start_date: compValue });
  };

  const handleEndDate = (newValue) => {
    //casts date into comparable value
    let compValue = newValue.$d.toISOString();

    setEndDate(compValue);
    setTripInfo({ ...tripInfo, end_date: compValue });
  };

  const handleClose = () => {
    setShow(false);
    setErrorMessage(false);
  };

  const handleShow = () => setShow(true);

  return (
    <div>
      {singleTrip ? (
        <div>
          <Button variant="primary" onClick={handleShow}>
            Edit Trip
          </Button>
          <Modal show={show} onHide={handleClose} scrollable={true}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Trip</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="edit-trip-form">
                  <Form.Label>Trip Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    defaultValue={singleTrip.name || ""}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="edit-trip-form">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    defaultValue={singleTrip.city || ""}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="edit-trip-form">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    name="state"
                    defaultValue={singleTrip.state || ""}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="edit-trip-form">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    name="country"
                    defaultValue={singleTrip.country || ""}
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
                      onChange={handleStartDate}
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
                      onChange={handleEndDate}
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
                Save Changes
              </Button>
              <Alert show={showErrorMessage} variant="danger">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Alert.Heading>
                    Please fix required fields before proceeding
                  </Alert.Heading>
                  <ul>
                    {errors.map((error, i) => {
                      return <li key={i}>{error[1]}</li>;
                    })}
                  </ul>
                </div>
                <hr />
              </Alert>
            </Modal.Footer>
          </Modal>
        </div>
      ) : (
        <div>
          <h6>Loading... Please wait</h6>
        </div>
      )}
    </div>
  );
};

const mapState = ({ trips }) => ({
  trips: trips,
});

const mapDispatch = (dispatch) => ({
  updateThisTrip: (updatedData, tripId) =>
    dispatch(updateThisTrip(updatedData, tripId)),
  fetchSingleTrip: (tripId) => dispatch(fetchSingleTrip(tripId)),
});

export default connect(mapState, mapDispatch)(EditTrip);
