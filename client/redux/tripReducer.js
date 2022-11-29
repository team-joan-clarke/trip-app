import axios from "axios";
//action types
const GET_ALL_COMPLETED_TRIP = "GET_ALL_COMPLETED_TRIP";
const GET_ALL_ACTIVE_TRIP = "GET_ALL_ACTIVE_TRIPS"

//action creator
const getAllCompletedTrips = (trips) => {
  return {
    type: GET_ALL_COMPLETED_TRIP,
    trips,
  };
};

const getAllActiveTrips = (trips) => {
  return {
    type: GET_ALL_ACTIVE_TRIP,
    trips,
  };
};


//thunk creator

export const getAllCompletedTripsThunk = (userId) => {
  return async (dispatch) => {
    try {
      const { data: trips } = await axios.get(
        `/api/trips/completedTrips/${userId}`
      );
      dispatch(getAllCompletedTrips(trips));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getAllActiveTripsThunk = (userId) => {
  console.log("make it to thunk");
  return async (dispatch) => {
    try {
      const { data: trips } = await axios.get(
        `/api/trips/activeTrips//${userId}`
      );
      console.log("in thunk");
      dispatch(getAllActiveTrips(trips));
    } catch (error) {
      console.error(error);
    }
  };
};

const initialState = [];
// const initialState = { allTrips: [], singleTrip: {} };

// reducer
export default function tripReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_COMPLETED_TRIP:
      return action.trips;
    case GET_ALL_ACTIVE_TRIP:
      return action.trips
    default:
      return state;
  }
}
