import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
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
  const [show, setShow] = useState(false);

  useEffect(() => {
    //dummy id, update when in trip dashboard
    props.fetchSingleTrip(tripId);
    if (singleTrip) {
      setStartDate(singleTrip.start_date);
      setEndDate(singleTrip.end_date);
    }
    setTripInfo(singleTrip);
  }, [initialStartDate, initialEndDate]);

  const handleChange = (event) => {
    setTripInfo({ ...tripInfo, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (singleTrip) {
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
    }
  };
  
  const handleClose = () => setShow(false);
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
                      onChange={(newValue) => {
                        setStartDate(newValue);
                        setTripInfo({ ...tripInfo, start_date: newValue });
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
                        setTripInfo({ ...tripInfo, end_date: newValue });
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
                Save Changes
              </Button>
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
