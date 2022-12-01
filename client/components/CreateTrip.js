import React, { useState } from "react";
import { connect } from "react-redux";
import { createNewTrip } from "../redux/tripReducer";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const CreateTrip = (props) => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [status, setStatus] = useState("active");

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

  return (
    <div>
      <form onSubmit={handleSubmit} id="add-trip">
        <h2>Create a New Trip: </h2>
        <div>
          <label htmlFor="name">Trip Name:</label>
          <input type="text" name="name" value={name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <input type="text" name="city" value={city} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="state">State:</label>
          <input
            type="text"
            name="state"
            value={state}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            name="country"
            value={country}
            onChange={handleChange}
          />
        </div>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
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
        <div>
          <button className="submit" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    createNewTrip: (trip) => dispatch(createNewTrip(trip)),
  };
};

export default connect(null, mapDispatch)(CreateTrip);
