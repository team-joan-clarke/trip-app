import React, { useParams, useEffect, useState } from "react";
import { connect } from "react-redux";
//import thunk
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { updateThisTrip, fetchSingleTrip } from "../redux/tripReducer";

const EditTrip = (props) => {
  const { singleTrip } = props.trips.singleTripView;

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

  useEffect(() => {
    //dummy id, update when in trip dashboard
    props.fetchSingleTrip(1);
    setTripInfo(singleTrip);
  }, []);

  const handleChange = (event) => {
    setTripInfo({ ...tripInfo, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //dummy id
    if (singleTrip) {
      props.updateThisTrip({ ...singleTrip, ...tripInfo }, 1);
      setTripInfo({
        name: "",
        city: "",
        state: "",
        country: "",
        start_date: "",
        end_date: "",
        status: "active",
      });
    //   window.location.reload();
    }
  };

  return (
    <div>
      {singleTrip ? (
        <form onSubmit={handleSubmit} className="trip-form">
          <h2>Edit Trip</h2>
          <div>
            <label htmlFor="name">Trip Name:</label>
            <input
              type="text"
              name="name"
              defaultValue={singleTrip.name || ''}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="city">City:</label>
            <input
              type="text"
              name="city"
              defaultValue={singleTrip.city || ''}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="state">State:</label>
            <input
              type="text"
              name="state"
              value={singleTrip.state || ''}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="country">Country:</label>
            <input
              type="text"
              name="country"
              value={singleTrip.country || ''}
              onChange={handleChange}
            />
          </div>
          <div className='date-picker'>
            <LocalizationProvider dateAdapter={AdapterDayjs} className='date-picker'>
              <DatePicker
                label="Start Date"
                name="start_date"
                value={singleTrip.start_date || ''}
                onChange={(newValue) => {
                  setStartDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div className='date-picker'>
            <LocalizationProvider dateAdapter={AdapterDayjs} className='date-picker'>
              <DatePicker
                label="End Date"
                name="end_date"
                value={singleTrip.end_date || ''}
                onChange={(newValue) => {
                  setEndDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div>
            <button className="btn-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      ) : (
        <div>
          <h3>dummy edit component</h3>
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
