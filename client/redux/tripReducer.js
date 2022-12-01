import axios from "axios";
import { getCookie } from "./users";
//action types
const GET_ALL_COMPLETED_TRIP = "GET_ALL_COMPLETED_TRIP";
const GET_ALL_ACTIVE_TRIP = "GET_ALL_ACTIVE_TRIPS";
const CREATE_TRIP = "CREATE_TRIP";

//action creator
const getAllCompletedTrips = (trips) => {
  return {
    type: GET_ALL_COMPLETED_TRIP,
    trips,
  };
};

const getAllActiveTrips = (activeTrips) => {
  return {
    type: GET_ALL_ACTIVE_TRIP,
    activeTrips,
  };
};

const createTrip = (trip) => {
  return {
    type: CREATE_TRIP,
    trip,
  };
};

//thunk creator

export const getAllCompletedTripsThunk = () => {
  return async (dispatch) => {
    try {
      const id = getCookie("userId");
      const { data: trips } = await axios.get(
        `/api/trips/completedTrips/${id}`
      );
      dispatch(getAllCompletedTrips(trips));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getAllActiveTripsThunk = () => {
  return async (dispatch) => {
    try {
      const id = getCookie("userId");
      const { data: trips } = await axios.get(`/api/trips/activeTrips/${id}`);
      dispatch(getAllActiveTrips(trips));
    } catch (error) {
      console.error(error);
    }
  };
};

export const createNewTrip = (trip) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/trips`, trip);
      dispatch(createTrip(data));
    } catch (error) {
      console.error(error);
    }
  };
};

const initialState = { active: [], complete: [] };

// reducer
export default function tripReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_COMPLETED_TRIP:
      const sortedDatesForComplete = action.trips
        .map((obj) => {
          return { ...obj, start_date: new Date(obj.start_date) };
        })
        .map((obj) => {
          return { ...obj, end_date: new Date(obj.end_date) };
        })
        .sort(
          (objA, objB) => Number(objA.start_date) - Number(objB.start_date)
        );
      return { ...state, complete: sortedDatesForComplete };
    case GET_ALL_ACTIVE_TRIP:
      const sortedDates = action.activeTrips
        .map((obj) => {
          return { ...obj, start_date: new Date(obj.start_date) };
        })
        .map((obj) => {
          return { ...obj, end_date: new Date(obj.end_date) };
        })
        .sort(
          (objA, objB) => Number(objA.start_date) - Number(objB.start_date)
        );
      return { ...state, active: sortedDates };
    case CREATE_TRIP:
      return { ...state, active: action.trip };
    default:
      return state;
  }
}

/*
initial
active: []

when there are no actives
active: []

when there are actives
active: [{ object 1}]



*/
