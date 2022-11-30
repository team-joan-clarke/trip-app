import axios from "axios";
//action types
const GET_ALL_COMPLETED_TRIP = "GET_ALL_COMPLETED_TRIP";
const GET_ALL_ACTIVE_TRIP = "GET_ALL_ACTIVE_TRIPS";

//action creator
const getAllCompletedTrips = (trips) => {
  return {
    type: GET_ALL_COMPLETED_TRIP,
    trips,
  };
};

const getAllActiveTrips = (activeTrips) => {
  console.log("in action creator", activeTrips);
  return {
    type: GET_ALL_ACTIVE_TRIP,
    activeTrips,
  };
};

//thunk creator

export const getAllCompletedTripsThunk = (userId) => {
  return async (dispatch) => {
    try {
      const { data: trips } = await axios.get(
        `/api/trips/completedTrips/${userId}`
      );
      console.log("in think", trips);
      dispatch(getAllCompletedTrips(trips));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getAllActiveTripsThunk = (userId) => {
  return async (dispatch) => {
    try {
      const { data: trips } = await axios.get(
        `/api/trips/activeTrips/${userId}`
      );
      console.log("trips in active thunk", trips)
      dispatch(getAllActiveTrips(trips));
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
      return { ...state, complete: [action.trips] };
    case GET_ALL_ACTIVE_TRIP:
      return { ...state, active: [action.activeTrips] };
    default:
      return state;
  }
}
