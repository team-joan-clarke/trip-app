import axios from "axios";
//action types
const GET_ALL_TRIPS = "GET_ALL_TRIPS";

//action creator
const getAllTrips = (trips) => {
  return {
    type: GET_ALL_TRIPS,
    trips,
  };
};

//thunk creator

const getAllTripsThunk = (userId) => {
  return async (dispatch) => {
    try {
      const { data: trips } = await axios.get(
        `/api/trips/allUserTrips/${userId}`
      );
      dispatch(getAllTrips(trips));
    } catch (error) {
      console.error(error);
    }
  };
};

const initialState = { allTrips: [], singleTrip: {} };

// reducer
export default function tripReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_TRIPS:
      return { ...state, allTrips: [...state.allTrips, action.trips] };
    default:
      return state;
  }
}
