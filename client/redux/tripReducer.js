import axios from "axios";
import { getCookie } from "./users";

//action types
const GET_ALL_COMPLETED_TRIP = "GET_ALL_COMPLETED_TRIP";
const GET_ALL_ACTIVE_TRIP = "GET_ALL_ACTIVE_TRIPS";
const GET_SINGLE_TRIP = "GET_SINGLE_TRIP";
const CREATE_TRIP = "CREATE_TRIP";
const UPDATE_TRIP = "UPDATE_TRIP";

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

const updateTrip = (trip) => {
  return {
    type: UPDATE_TRIP,
    trip,
  };
};

const getSingleTrip = (trip) => {
  return {
    type: GET_SINGLE_TRIP,
    trip,
  };
};

//thunk creator

export const getAllCompletedTripsThunk = () => {
  return async (dispatch) => {
    try {
      const id = getCookie("userId");
      console.log("id", id);
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

export const updateThisTrip = (updatedData, tripId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `/api/trips/singleTrip/${tripId}`,
        updatedData
      );
      dispatch(updateTrip(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchSingleTrip = (tripId) => {
  return async (dispatch) => {
    try {
      const { data: trip } = await axios.get(`/api/trips/singleTrip/${tripId}`);
      dispatch(getSingleTrip(trip));
    } catch (error) {
      console.error(error);
    }
  };
};

const initialState = { active: [], complete: [], singleTripView: {} };

// reducer
export default function tripReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_COMPLETED_TRIP:
      return { ...state, complete: action.trips };
    case GET_ALL_ACTIVE_TRIP:
      return { ...state, active: action.activeTrips };
    case CREATE_TRIP:
      return { ...state, active: action.trip };
    case UPDATE_TRIP:
      const filteredTrips = state.active.filter(
        (trip) => trip.id !== action.trip.id
      );
      return { ...state, active: [...filteredTrips, action.trip] };
    case GET_SINGLE_TRIP:
      return {...state, singleTripView: {singleTrip: action.trip}}
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
