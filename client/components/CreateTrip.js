import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Form,
  Alert,
  Button,
  Modal,
  Toast,
  ToastContainer,
  Tab,
  Tabs,
  Card,
} from "react-bootstrap";
import { createNewTrip } from "../redux/tripReducer";
import { getCookie } from "../redux/users";

const CreateTrip = (props) => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [errors, setErrors] = useState([]);
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [imageUrl, setImageUrl] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPalFmzItiv41uwG0LGteZ-243tFftPPUb1xfU8MQNo-iEOpBBT_Kflw56iuun22IgT-M&usqp=CAU"
  );
  const [status, setStatus] = useState("active");
  const [show, setShow] = useState(false);
  const [key, setKey] = useState("create");
  const [showSuccessToast, setSuccessToast] = useState(false);
  const [showErrorMessage, setErrorMessage] = useState(false);
  const userId = getCookie("userId");

  const stockTripImages = [
    "/stock-header-images/image1.jpg",
    "/stock-header-images/image5.jpg",
    "/stock-header-images/image4.jpg",
  ];

  const errorDictionary = {
    nameError: [1, "Must include a trip name"],
    countryError: [2, "Must include a country"],
    startDateError: [3, "Must set start date"],
    endDateError: [4, "Must set end date"],
    startDateBeforeError: [5, "Must set start date before setting end date"],
    endDateAfterError: [6, "End date must come after start date"],
  };

  //check if error exists already
  const inCurrentErrors = (errorId) => {
    const isACurrentError = errors.filter((error) => error[0] === errorId);
    if (isACurrentError.length) {
      return true;
    } else {
      return false;
    }
  };

  //if two error messages are not associated with that field, second errorId defaults to zero
  const getFilteredErrors = (errorId1, errorId2 = 0) => {
    const filteredErrors = errors.filter(
      (error) => error[0] !== errorId1 && error[0] !== errorId2
    );
    return filteredErrors;
  };

  //ERROR MESSAGE
  useEffect(() => {
    if (errors.length < 1) {
      setErrorMessage(false);
    }
  }, [errors]);

  //SPECIFIC ERROR HANDLING
  useEffect(() => {
    if (!name) {
      if (!inCurrentErrors(1)) {
        errors.push(errorDictionary.nameError);
      }
    } else {
      setErrors(getFilteredErrors(1));
    }

    if (!country) {
      if (!inCurrentErrors(2)) {
        errors.push(errorDictionary.countryError);
      }
    } else {
      setErrors(getFilteredErrors(2));
    }

    if (!start_date) {
      if (!inCurrentErrors(3)) {
        errors.push(errorDictionary.startDateError);
      }
    } else {
      setErrors(getFilteredErrors(3, 5));
    }

    if (!end_date) {
      if (!inCurrentErrors(4)) {
        errors.push(errorDictionary.endDateError);
      }
    } else {
      setErrors(getFilteredErrors(4, 6));
    }
  }, [name, country, start_date, end_date]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name && country && start_date && end_date) {
      if (errors.length === 0) {
        props.createNewTrip({
          name,
          city,
          state,
          country,
          start_date,
          end_date,
          imageUrl,
          status,
          userId,
        });
        setName("");
        setCity("");
        setState("");
        setCountry("");
        setStartDate("");
        setEndDate("");
        setStatus("active");
        setSuccessToast(true);
        setShow(false);
      }
    } else {
      setErrorMessage(true);
    }
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

  const handleStartDate = (newValue) => {
    setStartDate(newValue);
  };

  const handleEndDate = (newValue) => {
    if (!start_date) {
      if (!inCurrentErrors(5)) {
        errors.push(errorDictionary.startDateBeforeError);
      }
    } else {
      if (newValue < start_date) {
        if (!inCurrentErrors(6)) {
          errors.push(errorDictionary.endDateAfterError);
        }
      } else {
        setEndDate(newValue);
      }
    }
  };

  const handleImg = (event) => {
    setImageUrl(event.target.value);
  };

  const handleClose = () => {
    setShow(false);
    setErrorMessage(false);
  };

  const handleShow = () => setShow(true);

  return (
    <div>
      <ToastContainer position="top-end">
        <Toast
          bg="info"
          onClose={() => setSuccessToast(false)}
          show={showSuccessToast}
          delay={3000}
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
          <Toast.Body>Pack your bags. You just created a trip.</Toast.Body>
        </Toast>
      </ToastContainer>
      <Button variant="primary" onClick={handleShow}>
        Create Trip
      </Button>
      <Modal show={show} onHide={handleClose} scrollable={true}>
        <Modal.Header closeButton>
          <Modal.Title>Create Trip</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            id="create-trip-tabs"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
            fill
          >
            <Tab eventKey="create" title="Create">
              <Form>
                <Form.Group className="mb-3" controlId="edit-trip-form">
                  <small style={{ float: "right", color: "red" }}>*</small>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Trip Name"
                    value={name}
                    onChange={handleChange}
                    style={{ width: "98%", margin: "auto" }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="edit-trip-form">
                  <Form.Control
                    type="text"
                    name="city"
                    placeholder="City"
                    value={city}
                    onChange={handleChange}
                    style={{ width: "98%", margin: "auto" }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="edit-trip-form">
                  <Form.Control
                    type="text"
                    name="state"
                    placeholder="State"
                    value={state}
                    onChange={handleChange}
                    style={{ width: "98%", margin: "auto" }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="edit-trip-form">
                  <small style={{ float: "right", color: "red" }}>*</small>
                  <Form.Control
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={country}
                    onChange={handleChange}
                    style={{ width: "98%", margin: "auto" }}
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
                  <small style={{ position: "float", color: "red" }}>*</small>
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
                  <small style={{ position: "float", color: "red" }}>*</small>
                </div>
              </Form>
              <small style={{ float: "right", color: "red" }}>
                * indicates required field
              </small>
            </Tab>
            <Tab eventKey="trip-image" title="Select Trip Image">
              <Form style={{display: 'flex', justifyContent: 'center'}}>
                {stockTripImages.map((img) => (
                  <Card key={img} style={{ width: "18rem" }}>
                    <Card.Img
                      variant="top"
                      src={img}
                      height="180rem"
                      fluid="true"
                    />
                    <Card.Body>
                      <Form.Check
                        type="radio"
                        id="default-radio"
                        label="Select"
                        name="image-radio"
                        value={img}
                        onClick={handleImg}
                      />
                    </Card.Body>
                  </Card>
                ))}
              </Form>
            </Tab>
          </Tabs>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Create
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
  );
};

const mapDispatch = (dispatch) => {
  return {
    createNewTrip: (trip) => dispatch(createNewTrip(trip)),
  };
};

export default connect(null, mapDispatch)(CreateTrip);
